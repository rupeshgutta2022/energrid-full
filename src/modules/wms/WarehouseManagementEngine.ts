/**
 * LogiCore Enterprise Warehouse Management Engine (WMS)
 * 
 * Provides automated putaway bin slotting (ABC velocity analysis), wave picking batching,
 * cross-docking bypass optimization, and cycle count variance reconciliation.
 */

export type BinVelocityTier = 'FAST_MOVER_A' | 'MEDIUM_MOVER_B' | 'SLOW_MOVER_C';

export interface StorageBinLocation {
  binCode: string; // e.g. AISLE-04-BAY-12-LVL-2
  zone: 'RECEIVING_DOCK' | 'BULK_PALLET_RACKS' | 'MEZZANINE_BIN_SHELVES' | 'COLD_STORAGE' | 'HAZMAT_SECURE' | 'OUTBOUND_STAGING';
  aisleNumber: number;
  bayNumber: number;
  shelfLevel: number; // 1 = Ground (Heavy goods), 2-3 = Ergonomic golden zone, 4-5 = High reach
  positionNumber: number;
  maxWeightCapacityKg: number;
  maxVolumeCapacityM3: number;
  currentOccupiedWeightKg: number;
  currentOccupiedVolumeM3: number;
  isTemperatureControlled: boolean;
  temperatureCelsius?: number;
  isOccupied: boolean;
  assignedSku?: string;
}

export interface WavePickTask {
  waveId: string;
  pickerEmployeeId: string;
  assignedEquipment: 'FORKLIFT' | 'ORDER_PICKER' | 'MANUAL_CART';
  totalPickStops: number;
  stops: {
    sequenceNumber: number;
    binCode: string;
    sku: string;
    productName: string;
    quantityToPick: number;
    destinationToteId: string;
    isPicked: boolean;
  }[];
  estimatedTravelMeters: number;
  estimatedPickTimeMinutes: number;
}

export interface CrossDockDecision {
  isEligibleForCrossDock: boolean;
  crossDockQuantity: number;
  standardPutawayQuantity: number;
  matchedBackorderShipmentIds: string[];
  laborHoursSaved: number;
  dockDoorRouting: {
    inboundDock: string;
    outboundDock: string;
  };
}

export interface CycleCountVarianceReport {
  sku: string;
  binCode: string;
  systemBookQty: number;
  physicalCountQty: number;
  varianceQty: number;
  variancePercentage: number;
  unitCostInr: number;
  totalVarianceValueInr: number;
  investigationRequired: boolean;
  recommendedAdjustmentAction: 'APPROVE_ADJUSTMENT' | 'TRIGGER_BLIND_RECOUNT' | 'SECURITY_INVESTIGATION';
}

export class WarehouseManagementEngine {
  /**
   * Recommends optimal rack slotting based on item velocity, weight, and storage constraints
   */
  public static recommendBinSlotting(
    sku: string,
    weightPerUnitKg: number,
    velocity: BinVelocityTier,
    requiresColdChain: boolean,
    availableBins: StorageBinLocation[]
  ): {
    recommendedBin: StorageBinLocation | null;
    reasoning: string;
  } {
    // Filter compatible bins
    const compatibleBins = availableBins.filter((b) => {
      if (b.isOccupied) return false;
      if (requiresColdChain && !b.isTemperatureControlled) return false;
      if (!requiresColdChain && b.isTemperatureControlled) return false;
      return true;
    });

    if (compatibleBins.length === 0) {
      return {
        recommendedBin: null,
        reasoning: 'No vacant bin matching environmental temperature specifications available.'
      };
    }

    // Heavy items (> 25 kg) must go to Level 1 (Ground / Floor)
    if (weightPerUnitKg > 25) {
      const groundBin = compatibleBins.find((b) => b.shelfLevel === 1);
      if (groundBin) {
        return {
          recommendedBin: groundBin,
          reasoning: `Heavy payload (${weightPerUnitKg} kg) assigned to Ground Level 1 to prevent racking structural stress and ensure safety.`
        };
      }
    }

    // Fast moving items (Tier A) should be near front aisles (Aisle 1-3) and ergonomic Golden Zone (Levels 2-3)
    if (velocity === 'FAST_MOVER_A') {
      const goldenZoneBin = compatibleBins.find((b) => b.aisleNumber <= 3 && (b.shelfLevel === 2 || b.shelfLevel === 3));
      if (goldenZoneBin) {
        return {
          recommendedBin: goldenZoneBin,
          reasoning: 'Fast-mover (Tier A) slotted into Ergonomic Golden Zone (Levels 2-3, Front Aisles) to minimize picker travel and lift fatigue.'
        };
      }
    }

    // Medium moving items (Tier B)
    if (velocity === 'MEDIUM_MOVER_B') {
      const midBin = compatibleBins.find((b) => b.aisleNumber >= 3 && b.aisleNumber <= 6);
      if (midBin) {
        return {
          recommendedBin: midBin,
          reasoning: 'Medium-mover (Tier B) slotted into mid-depth aisles.'
        };
      }
    }

    // Slow moving (Tier C) to higher levels or back aisles
    const slowBin = compatibleBins.find((b) => b.shelfLevel >= 4 || b.aisleNumber > 6) || compatibleBins[0];
    return {
      recommendedBin: slowBin,
      reasoning: 'Item slotted into standard racking depth.'
    };
  }

  /**
   * Batches multiple customer orders into a single snake-path wave picking sequence
   */
  public static planWavePickingBatch(
    waveId: string,
    pickerId: string,
    orderPicks: {
      orderId: string;
      sku: string;
      productName: string;
      quantity: number;
      binCode: string;
      aisle: number;
      bay: number;
      level: number;
    }[]
  ): WavePickTask {
    // Sort by S-shape (Snake) routing: Aisle ascending, Bay ascending for odd aisles, Bay descending for even aisles
    const sortedPicks = [...orderPicks].sort((a, b) => {
      if (a.aisle !== b.aisle) {
        return a.aisle - b.aisle;
      }
      // Snake traverse
      if (a.aisle % 2 === 1) {
        return a.bay - b.bay;
      } else {
        return b.bay - a.bay;
      }
    });

    let currentBay = 0;
    let currentAisle = 1;
    let travelMeters = 0;

    const stops = sortedPicks.map((pick, idx) => {
      // Calculate bay-to-bay travel (approx 3m per bay, 10m aisle crossover)
      const aisleDelta = Math.abs(pick.aisle - currentAisle);
      const bayDelta = Math.abs(pick.bay - currentBay);
      travelMeters += aisleDelta * 10 + bayDelta * 3;
      currentAisle = pick.aisle;
      currentBay = pick.bay;

      return {
        sequenceNumber: idx + 1,
        binCode: pick.binCode,
        sku: pick.sku,
        productName: pick.productName,
        quantityToPick: pick.quantity,
        destinationToteId: `TOTE-${pick.orderId.slice(-4)}`,
        isPicked: false
      };
    });

    // Approximate pick time: 45 seconds per pick + travel speed 1m/s
    const totalPickSeconds = stops.length * 45 + travelMeters;
    const estimatedMinutes = Math.ceil(totalPickSeconds / 60);

    return {
      waveId,
      pickerEmployeeId: pickerId,
      assignedEquipment: stops.length > 20 ? 'ORDER_PICKER' : 'MANUAL_CART',
      totalPickStops: stops.length,
      stops,
      estimatedTravelMeters: travelMeters,
      estimatedPickTimeMinutes: estimatedMinutes
    };
  }

  /**
   * Evaluates inbound goods for cross-docking bypass to immediately satisfy backordered demand
   */
  public static evaluateCrossDockEligibility(
    sku: string,
    receivedQuantity: number,
    backorderedDemandQuantity: number,
    matchedShipments: string[]
  ): CrossDockDecision {
    if (backorderedDemandQuantity <= 0) {
      return {
        isEligibleForCrossDock: false,
        crossDockQuantity: 0,
        standardPutawayQuantity: receivedQuantity,
        matchedBackorderShipmentIds: [],
        laborHoursSaved: 0,
        dockDoorRouting: { inboundDock: 'DOCK-IN-01', outboundDock: 'N/A' }
      };
    }

    const crossDockQty = Math.min(receivedQuantity, backorderedDemandQuantity);
    const standardPutaway = Math.max(0, receivedQuantity - crossDockQty);
    // Cross dock saves ~1.5 labor hours per pallet (eliminates racking putaway & subsequent picking trip)
    const hoursSaved = Math.round((crossDockQty / 10) * 1.5 * 10) / 10;

    return {
      isEligibleForCrossDock: true,
      crossDockQuantity: crossDockQty,
      standardPutawayQuantity: standardPutaway,
      matchedBackorderShipmentIds: matchedShipments,
      laborHoursSaved: hoursSaved,
      dockDoorRouting: {
        inboundDock: 'DOCK-IN-03 (Unloading Bay)',
        outboundDock: 'DOCK-OUT-08 (Immediate Staging Consignment Bay)'
      }
    };
  }

  /**
   * Reconciles cycle count physical inventory against ERP/WMS book balances
   */
  public static reconcileCycleCountVariance(
    sku: string,
    binCode: string,
    systemBookQty: number,
    physicalCountQty: number,
    unitCostInr: number
  ): CycleCountVarianceReport {
    const varianceQty = physicalCountQty - systemBookQty;
    const variancePercentage = systemBookQty > 0 ? Math.round((Math.abs(varianceQty) / systemBookQty) * 1000) / 10 : 0;
    const varianceValue = Math.abs(varianceQty) * unitCostInr;

    let action: CycleCountVarianceReport['recommendedAdjustmentAction'] = 'APPROVE_ADJUSTMENT';
    let investigate = false;

    if (varianceValue > 25000 || variancePercentage > 10) {
      action = 'SECURITY_INVESTIGATION';
      investigate = true;
    } else if (varianceValue > 5000 || variancePercentage > 3) {
      action = 'TRIGGER_BLIND_RECOUNT';
      investigate = true;
    } else {
      action = 'APPROVE_ADJUSTMENT';
    }

    return {
      sku,
      binCode,
      systemBookQty,
      physicalCountQty,
      varianceQty,
      variancePercentage,
      unitCostInr,
      totalVarianceValueInr: varianceValue,
      investigationRequired: investigate,
      recommendedAdjustmentAction: action
    };
  }
}
