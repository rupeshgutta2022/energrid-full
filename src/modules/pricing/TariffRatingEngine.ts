/**
 * @file TariffRatingEngine.ts
 * Enterprise Freight Pricing, Rating, Surcharge, and Tariff Matrix Engine.
 * Implements standard logistics freight rating mechanisms conforming to FMC, IATA, and domestic carrier rating standards.
 */

export type FreightTransportMode = 'Road FTL' | 'Road LTL' | 'Air Express' | 'Air Standard' | 'Ocean FCL' | 'Ocean LCL' | 'Rail Intermodal';

export type CorridorZone = 'Zone 1 - Local' | 'Zone 2 - Regional' | 'Zone 3 - Intra-State' | 'Zone 4 - Cross-Border' | 'Zone 5 - National Trunk' | 'Zone 6 - Remote / Mountainous' | 'Zone 7 - International Ocean' | 'Zone 8 - International Air';

export type HazardousMaterialClass =
  | 'None'
  | 'Class 1: Explosives'
  | 'Class 2: Compressed Gases'
  | 'Class 3: Flammable Liquids'
  | 'Class 4: Flammable Solids'
  | 'Class 5: Oxidizers & Organic Peroxides'
  | 'Class 6: Toxic & Infectious Substances'
  | 'Class 7: Radioactive Materials'
  | 'Class 8: Corrosives'
  | 'Class 9: Miscellaneous Hazardous Cargo';

export interface CargoDimensions {
  lengthCm: number;
  widthCm: number;
  heightCm: number;
  weightActualKg: number;
  piecesCount: number;
}

export interface AccessorialRequirements {
  liftgatePickup?: boolean;
  liftgateDelivery?: boolean;
  insidePickup?: boolean;
  insideDelivery?: boolean;
  residentialDelivery?: boolean;
  appointmentRequired?: boolean;
  hazardousGoods?: HazardousMaterialClass;
  temperatureControlled?: boolean;
  tempRangeC?: { min: number; max: number };
  highValueInsurance?: boolean;
  declaredValueUsd?: number;
  customsBondedTransit?: boolean;
  weekendHolidayService?: boolean;
  palletExchange?: boolean;
  fuelSurchargeIndexOverride?: number;
}

export interface RatingInput {
  originPostalCode: string;
  destinationPostalCode: string;
  originZone: CorridorZone;
  destinationZone: CorridorZone;
  distanceKm: number;
  mode: FreightTransportMode;
  cargo: CargoDimensions;
  accessorials: AccessorialRequirements;
  customerContractId?: string;
  contractDiscountPercent?: number;
}

export interface RatingLineItem {
  code: string;
  name: string;
  category: 'Base Freight' | 'Fuel Surcharge' | 'Accessorial' | 'Regulatory & Security' | 'Insurance' | 'Taxes';
  rateBasis: string;
  unitRate: number;
  quantity: number;
  totalAmount: number;
  currency: 'USD' | 'INR' | 'EUR';
}

export interface RatingBreakdown {
  chargeableWeightKg: number;
  volumetricWeightKg: number;
  actualWeightKg: number;
  volumetricDivisorUsed: number;
  densityFactorKgPerM3: number;
  freightClassEstimated: number; // NMFC standard 50 - 500
  baseFreightAmount: number;
  fuelSurchargeAmount: number;
  fuelSurchargePercent: number;
  accessorialsTotal: number;
  insuranceAmount: number;
  subtotalBeforeTax: number;
  taxAmount: number; // Standard 18% GST or applicable freight VAT
  taxRatePercent: number;
  discountAmount: number;
  netPayableTotal: number;
  currency: 'USD' | 'INR' | 'EUR';
  lineItems: RatingLineItem[];
  estimatedTransitHours: number;
  calculationTimestamp: string;
  ratingVersion: string;
}

export class TariffRatingEngine {
  public static readonly VERSION = '2026.4.1';
  public static readonly STANDARD_TAX_RATE = 18.0; // 18% GST standard on freight forwarding

  // Dimensional Divisors
  public static readonly AIR_IATA_DIVISOR = 6000; // 1 m³ = 167 kg (cm³/6000)
  public static readonly ROAD_LTL_DIVISOR = 5000; // 1 m³ = 200 kg (cm³/5000)
  public static readonly ROAD_FTL_DIVISOR = 4000; // 1 m³ = 250 kg
  public static readonly OCEAN_CBM_DIVISOR = 1000; // 1 CBM = 1000 kg weight-to-measure

  // Base rate per tonne-km by transport mode (USD/INR reference)
  private static readonly MODE_BASE_RATE_PER_TONNE_KM: Record<FreightTransportMode, number> = {
    'Road FTL': 0.12, // per tonne-km in USD
    'Road LTL': 0.19,
    'Rail Intermodal': 0.08,
    'Air Standard': 1.85,
    'Air Express': 2.95,
    'Ocean FCL': 0.04,
    'Ocean LCL': 0.07
  };

  // Fuel Surcharge baseline table (Indexed against Brent Crude benchmark)
  private static readonly BASE_FUEL_SURCHARGE_PERCENT: Record<FreightTransportMode, number> = {
    'Road FTL': 16.5,
    'Road LTL': 18.2,
    'Rail Intermodal': 9.0,
    'Air Standard': 24.8,
    'Air Express': 28.5,
    'Ocean FCL': 12.0,
    'Ocean LCL': 14.5
  };

  // Fixed Accessorial Pricing Table (USD values, converted to local presentation)
  private static readonly ACCESSORIAL_FEES = {
    liftgatePickup: 45.0,
    liftgateDelivery: 55.0,
    insidePickup: 60.0,
    insideDelivery: 75.0,
    residentialDelivery: 40.0,
    appointmentRequired: 25.0,
    customsBondedTransit: 110.0,
    weekendHolidayService: 150.0,
    palletExchange: 15.0, // per pallet
    temperatureControlledReeferDaily: 85.0
  };

  // HAZMAT Surcharge multipliers
  private static readonly HAZMAT_SURCHARGES: Record<HazardousMaterialClass, number> = {
    'None': 0,
    'Class 1: Explosives': 350.0,
    'Class 2: Compressed Gases': 120.0,
    'Class 3: Flammable Liquids': 140.0,
    'Class 4: Flammable Solids': 130.0,
    'Class 5: Oxidizers & Organic Peroxides': 160.0,
    'Class 6: Toxic & Infectious Substances': 220.0,
    'Class 7: Radioactive Materials': 500.0,
    'Class 8: Corrosives': 145.0,
    'Class 9: Miscellaneous Hazardous Cargo': 95.0
  };

  /**
   * Calculates the volumetric (dimensional) weight based on cargo dimensions and transport mode.
   */
  public static calculateVolumetricWeight(cargo: CargoDimensions, mode: FreightTransportMode): {
    volumetricWeightKg: number;
    volumeCubicMeters: number;
    divisorUsed: number;
  } {
    const singleVolumeCc = cargo.lengthCm * cargo.widthCm * cargo.heightCm;
    const totalVolumeCc = singleVolumeCc * Math.max(1, cargo.piecesCount);
    const volumeCubicMeters = totalVolumeCc / 1_000_000;

    let divisor = TariffRatingEngine.ROAD_LTL_DIVISOR;
    if (mode.startsWith('Air')) {
      divisor = TariffRatingEngine.AIR_IATA_DIVISOR;
    } else if (mode === 'Road FTL') {
      divisor = TariffRatingEngine.ROAD_FTL_DIVISOR;
    } else if (mode.startsWith('Ocean')) {
      divisor = TariffRatingEngine.OCEAN_CBM_DIVISOR;
    }

    const volumetricWeightKg = Number((totalVolumeCc / divisor).toFixed(2));

    return {
      volumetricWeightKg,
      volumeCubicMeters,
      divisorUsed: divisor
    };
  }

  /**
   * Evaluates National Motor Freight Classification (NMFC) estimated freight class (50 to 500)
   * based on pounds per cubic foot (PCF) density.
   */
  public static estimateFreightClass(actualWeightKg: number, volumeM3: number): number {
    if (volumeM3 <= 0 || actualWeightKg <= 0) return 100;
    
    // Convert kg/m3 to lbs/cu.ft
    const densityLbsPerCuFt = (actualWeightKg * 2.20462) / (volumeM3 * 35.3147);

    if (densityLbsPerCuFt >= 50) return 50;
    if (densityLbsPerCuFt >= 35) return 55;
    if (densityLbsPerCuFt >= 30) return 60;
    if (densityLbsPerCuFt >= 22.5) return 65;
    if (densityLbsPerCuFt >= 15) return 70;
    if (densityLbsPerCuFt >= 13.5) return 77.5;
    if (densityLbsPerCuFt >= 12) return 85;
    if (densityLbsPerCuFt >= 10.5) return 92.5;
    if (densityLbsPerCuFt >= 9) return 100;
    if (densityLbsPerCuFt >= 8) return 110;
    if (densityLbsPerCuFt >= 7) return 125;
    if (densityLbsPerCuFt >= 6) return 150;
    if (densityLbsPerCuFt >= 5) return 175;
    if (densityLbsPerCuFt >= 4) return 200;
    if (densityLbsPerCuFt >= 3) return 250;
    if (densityLbsPerCuFt >= 2) return 300;
    if (densityLbsPerCuFt >= 1) return 400;
    return 500;
  }

  /**
   * Main calculation entrypoint: performs full tariff matrix rating with accessorial and fuel breakdown.
   */
  public static calculateTariff(input: RatingInput): RatingBreakdown {
    const lineItems: RatingLineItem[] = [];
    const now = new Date().toISOString();

    // 1. Calculate volumetric weight & density
    const volCalc = this.calculateVolumetricWeight(input.cargo, input.mode);
    const chargeableWeightKg = Math.max(input.cargo.weightActualKg, volCalc.volumetricWeightKg);
    const densityKgPerM3 = volCalc.volumeCubicMeters > 0 
      ? Number((input.cargo.weightActualKg / volCalc.volumeCubicMeters).toFixed(1))
      : 0;
    const freightClass = this.estimateFreightClass(input.cargo.weightActualKg, volCalc.volumeCubicMeters);

    // 2. Base Freight calculation
    // Base formula: (chargeable tonnes) * (distance in km) * (mode base rate) * (freight class multiplier)
    const tonnes = chargeableWeightKg / 1000;
    const modeBaseRate = this.MODE_BASE_RATE_PER_TONNE_KM[input.mode] || 0.15;
    const classMultiplier = Math.max(0.7, freightClass / 100);
    
    // Minimum freight floor
    const minFreightFloor = input.mode.startsWith('Air') ? 95.0 : input.mode.startsWith('Ocean') ? 150.0 : 45.0;
    let baseFreight = tonnes * Math.max(input.distanceKm, 25) * modeBaseRate * classMultiplier;
    baseFreight = Math.max(baseFreight, minFreightFloor);
    baseFreight = Number(baseFreight.toFixed(2));

    lineItems.push({
      code: 'BASE_FRT',
      name: `Base Freight (${input.mode} - Class ${freightClass})`,
      category: 'Base Freight',
      rateBasis: `${chargeableWeightKg} kg chargeable @ ${input.distanceKm} km`,
      unitRate: modeBaseRate,
      quantity: Number((tonnes * input.distanceKm).toFixed(2)),
      totalAmount: baseFreight,
      currency: 'USD'
    });

    // 3. Fuel Surcharge (FSC)
    const baseFscPercent = input.accessorials.fuelSurchargeIndexOverride !== undefined
      ? input.accessorials.fuelSurchargeIndexOverride
      : this.BASE_FUEL_SURCHARGE_PERCENT[input.mode] || 15.0;
    const fuelSurchargeAmount = Number(((baseFreight * baseFscPercent) / 100).toFixed(2));

    lineItems.push({
      code: 'FSC',
      name: `Fuel Surcharge Index (${baseFscPercent.toFixed(1)}%)`,
      category: 'Fuel Surcharge',
      rateBasis: `${baseFscPercent}% on base freight`,
      unitRate: baseFscPercent,
      quantity: 1,
      totalAmount: fuelSurchargeAmount,
      currency: 'USD'
    });

    // 4. Accessorial Charges
    let accessorialsTotal = 0;
    const acc = input.accessorials;

    if (acc.liftgatePickup) {
      const fee = this.ACCESSORIAL_FEES.liftgatePickup;
      accessorialsTotal += fee;
      lineItems.push({
        code: 'ACC_LIFT_ORIG',
        name: 'Hydraulic Liftgate Service - Origin Pickup',
        category: 'Accessorial',
        rateBasis: 'Flat fee per pickup',
        unitRate: fee,
        quantity: 1,
        totalAmount: fee,
        currency: 'USD'
      });
    }

    if (acc.liftgateDelivery) {
      const fee = this.ACCESSORIAL_FEES.liftgateDelivery;
      accessorialsTotal += fee;
      lineItems.push({
        code: 'ACC_LIFT_DEST',
        name: 'Hydraulic Liftgate Service - Destination Delivery',
        category: 'Accessorial',
        rateBasis: 'Flat fee per delivery',
        unitRate: fee,
        quantity: 1,
        totalAmount: fee,
        currency: 'USD'
      });
    }

    if (acc.insidePickup) {
      const fee = this.ACCESSORIAL_FEES.insidePickup;
      accessorialsTotal += fee;
      lineItems.push({
        code: 'ACC_INS_ORIG',
        name: 'Inside Building Pickup Service',
        category: 'Accessorial',
        rateBasis: 'Flat labor fee',
        unitRate: fee,
        quantity: 1,
        totalAmount: fee,
        currency: 'USD'
      });
    }

    if (acc.insideDelivery) {
      const fee = this.ACCESSORIAL_FEES.insideDelivery;
      accessorialsTotal += fee;
      lineItems.push({
        code: 'ACC_INS_DEST',
        name: 'Inside Building White-Glove Delivery',
        category: 'Accessorial',
        rateBasis: 'Flat labor fee',
        unitRate: fee,
        quantity: 1,
        totalAmount: fee,
        currency: 'USD'
      });
    }

    if (acc.residentialDelivery) {
      const fee = this.ACCESSORIAL_FEES.residentialDelivery;
      accessorialsTotal += fee;
      lineItems.push({
        code: 'ACC_RES_DEST',
        name: 'Residential / Limited Access Zone Surcharge',
        category: 'Accessorial',
        rateBasis: 'Per consignment',
        unitRate: fee,
        quantity: 1,
        totalAmount: fee,
        currency: 'USD'
      });
    }

    if (acc.appointmentRequired) {
      const fee = this.ACCESSORIAL_FEES.appointmentRequired;
      accessorialsTotal += fee;
      lineItems.push({
        code: 'ACC_APPT',
        name: 'Pre-Notified Appointment Delivery Window',
        category: 'Accessorial',
        rateBasis: 'Per consignment',
        unitRate: fee,
        quantity: 1,
        totalAmount: fee,
        currency: 'USD'
      });
    }

    if (acc.temperatureControlled) {
      const transitDays = Math.max(1, Math.ceil(input.distanceKm / 500));
      const fee = this.ACCESSORIAL_FEES.temperatureControlledReeferDaily * transitDays;
      accessorialsTotal += fee;
      lineItems.push({
        code: 'ACC_REEFER',
        name: `Active Cold-Chain Reefer Power (${acc.tempRangeC?.min ?? 2}°C to ${acc.tempRangeC?.max ?? 8}°C)`,
        category: 'Accessorial',
        rateBasis: `$85/day x ${transitDays} estimated transit days`,
        unitRate: 85,
        quantity: transitDays,
        totalAmount: fee,
        currency: 'USD'
      });
    }

    if (acc.hazardousGoods && acc.hazardousGoods !== 'None') {
      const fee = this.HAZMAT_SURCHARGES[acc.hazardousGoods] || 150.0;
      accessorialsTotal += fee;
      lineItems.push({
        code: 'ACC_HAZMAT',
        name: `Dangerous Goods Compliance (${acc.hazardousGoods})`,
        category: 'Regulatory & Security',
        rateBasis: 'UN Hazmat Certification & Handling Fee',
        unitRate: fee,
        quantity: 1,
        totalAmount: fee,
        currency: 'USD'
      });
    }

    if (acc.customsBondedTransit) {
      const fee = this.ACCESSORIAL_FEES.customsBondedTransit;
      accessorialsTotal += fee;
      lineItems.push({
        code: 'ACC_BONDED',
        name: 'Customs Bonded Carrier Escort & EDI Port Filing',
        category: 'Regulatory & Security',
        rateBasis: 'Per bonded bill of lading',
        unitRate: fee,
        quantity: 1,
        totalAmount: fee,
        currency: 'USD'
      });
    }

    // 5. High-Value Cargo Insurance
    let insuranceAmount = 0;
    if (acc.highValueInsurance && acc.declaredValueUsd && acc.declaredValueUsd > 0) {
      // 0.45% of declared cargo value or $25 minimum
      insuranceAmount = Math.max(25.0, Number((acc.declaredValueUsd * 0.0045).toFixed(2)));
      lineItems.push({
        code: 'INS_CARGO',
        name: `All-Risk Marine & Transit Cargo Insurance (Covering $${acc.declaredValueUsd.toLocaleString()})`,
        category: 'Insurance',
        rateBasis: '0.45% of declared invoice value',
        unitRate: 0.0045,
        quantity: acc.declaredValueUsd,
        totalAmount: insuranceAmount,
        currency: 'USD'
      });
    }

    // 6. Contract Discount
    const rawSubtotal = baseFreight + fuelSurchargeAmount + accessorialsTotal + insuranceAmount;
    let discountAmount = 0;
    if (input.contractDiscountPercent && input.contractDiscountPercent > 0) {
      discountAmount = Number(((rawSubtotal * input.contractDiscountPercent) / 100).toFixed(2));
      lineItems.push({
        code: 'DISC_CONTRACT',
        name: `Contract Tier Preferred Partner Discount (${input.contractDiscountPercent}%)`,
        category: 'Base Freight',
        rateBasis: `Applied to commercial subtotal`,
        unitRate: -input.contractDiscountPercent,
        quantity: 1,
        totalAmount: -discountAmount,
        currency: 'USD'
      });
    }

    const subtotalBeforeTax = Number((rawSubtotal - discountAmount).toFixed(2));

    // 7. Taxes (GST / VAT)
    const taxAmount = Number(((subtotalBeforeTax * this.STANDARD_TAX_RATE) / 100).toFixed(2));
    lineItems.push({
      code: 'TAX_GST',
      name: `Statutory Freight Goods & Services Tax (${this.STANDARD_TAX_RATE}%)`,
      category: 'Taxes',
      rateBasis: `${this.STANDARD_TAX_RATE}% on taxable freight services`,
      unitRate: this.STANDARD_TAX_RATE,
      quantity: 1,
      totalAmount: taxAmount,
      currency: 'USD'
    });

    const netPayableTotal = Number((subtotalBeforeTax + taxAmount).toFixed(2));

    // Estimated transit hours based on mode & distance
    let estimatedTransitHours = 24;
    if (input.mode === 'Air Express') {
      estimatedTransitHours = Math.max(6, Math.ceil(input.distanceKm / 400) + 4);
    } else if (input.mode === 'Air Standard') {
      estimatedTransitHours = Math.max(18, Math.ceil(input.distanceKm / 250) + 12);
    } else if (input.mode === 'Road FTL') {
      estimatedTransitHours = Math.max(4, Math.ceil(input.distanceKm / 55) + 3);
    } else if (input.mode === 'Road LTL') {
      estimatedTransitHours = Math.max(12, Math.ceil(input.distanceKm / 40) + 24);
    } else if (input.mode.startsWith('Ocean')) {
      estimatedTransitHours = Math.max(72, Math.ceil(input.distanceKm / 20) + 48);
    }

    return {
      chargeableWeightKg,
      volumetricWeightKg: volCalc.volumetricWeightKg,
      actualWeightKg: input.cargo.weightActualKg,
      volumetricDivisorUsed: volCalc.divisorUsed,
      densityFactorKgPerM3: densityKgPerM3,
      freightClassEstimated: freightClass,
      baseFreightAmount: baseFreight,
      fuelSurchargeAmount,
      fuelSurchargePercent: baseFscPercent,
      accessorialsTotal: Number(accessorialsTotal.toFixed(2)),
      insuranceAmount,
      subtotalBeforeTax,
      taxAmount,
      taxRatePercent: this.STANDARD_TAX_RATE,
      discountAmount,
      netPayableTotal,
      currency: 'USD',
      lineItems,
      estimatedTransitHours,
      calculationTimestamp: now,
      ratingVersion: this.VERSION
    };
  }
}
