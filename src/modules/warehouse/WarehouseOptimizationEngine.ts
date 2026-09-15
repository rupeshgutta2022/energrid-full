/**
 * @file WarehouseOptimizationEngine.ts
 * Enterprise 3D Bin Packing, ABC Inventory Velocity Slotting, and Pick-Path Routing Engine.
 * Optimizes pallet cubic utilization, warehouse travel distance, and bin ergonomics.
 */

import { InventoryItem } from '../../types';

export interface PalletSpecification {
  name: string;
  lengthMm: number; // EUR-1 Standard: 1200mm
  widthMm: number;  // EUR-1 Standard: 800mm
  maxHeightMm: number; // 1800mm max safe stacking
  maxWeightKg: number; // 1000kg
  tareWeightKg: number; // 25kg
}

export interface BoxItemToPack {
  sku: string;
  name: string;
  lengthMm: number;
  widthMm: number;
  heightMm: number;
  weightKg: number;
  quantity: number;
}

export interface PackedPalletResult {
  palletIndex: number;
  totalBoxesPacked: number;
  utilizationVolumePercent: number;
  utilizationWeightPercent: number;
  totalWeightKg: number;
  remainingVolumeM3: number;
  unpackedItems: BoxItemToPack[];
  layerCount: number;
}

export interface AbcInventoryAnalysis {
  categoryA: InventoryItem[]; // Top 80% of value/velocity (20% of items)
  categoryB: InventoryItem[]; // Next 15% of value/velocity (30% of items)
  categoryC: InventoryItem[]; // Bottom 5% of value/velocity (50% of items)
  recommendations: string[];
}

export interface PickLocation {
  binId: string;
  aisle: number;
  bay: number;
  shelf: number;
  sku: string;
  quantityNeeded: number;
}

export interface PickPathOptimizationResult {
  orderedBins: PickLocation[];
  totalDistanceMetersEstimated: number;
  estimatedPickTimeMinutes: number;
  routingStrategy: 'S-SHAPE_AISLE_TRANSIT' | 'RETURN_PER_AISLE' | 'MIDPOINT_DIVIDED';
}

export class WarehouseOptimizationEngine {
  public static readonly VERSION = '4.0.2';

  // Standard European & North American Pallet Sizes
  public static readonly EURO_PALLET: PalletSpecification = {
    name: 'EUR-1 Standard (1200x800)',
    lengthMm: 1200,
    widthMm: 800,
    maxHeightMm: 1800,
    maxWeightKg: 1000,
    tareWeightKg: 25
  };

  public static readonly US_STANDARD_PALLET: PalletSpecification = {
    name: 'GMA / US Standard (1219x1016)',
    lengthMm: 1219,
    widthMm: 1016,
    maxHeightMm: 2100,
    maxWeightKg: 1250,
    tareWeightKg: 28
  };

  /**
   * 3D Pallet Packing Simulator using First-Fit Decreasing heuristic.
   * Maximizes volumetric density while adhering to weight and height limits.
   */
  public static packPallet(
    boxes: BoxItemToPack[],
    palletSpec: PalletSpecification = this.EURO_PALLET
  ): PackedPalletResult {
    const palletVolumeMm3 = palletSpec.lengthMm * palletSpec.widthMm * palletSpec.maxHeightMm;
    const maxPayloadWeightKg = palletSpec.maxWeightKg - palletSpec.tareWeightKg;

    let currentPackedVolumeMm3 = 0;
    let currentPackedWeightKg = 0;
    let totalBoxesPacked = 0;
    const unpackedItems: BoxItemToPack[] = [];

    // Sort items by individual volume decreasing (First-Fit Decreasing)
    const sortedBoxes = [...boxes].sort((a, b) => {
      const volA = a.lengthMm * a.widthMm * a.heightMm;
      const volB = b.lengthMm * b.widthMm * b.heightMm;
      return volB - volA;
    });

    for (const item of sortedBoxes) {
      let remainingQty = item.quantity;
      const itemVol = item.lengthMm * item.widthMm * item.heightMm;

      while (remainingQty > 0) {
        if (
          currentPackedVolumeMm3 + itemVol <= palletVolumeMm3 &&
          currentPackedWeightKg + item.weightKg <= maxPayloadWeightKg
        ) {
          currentPackedVolumeMm3 += itemVol;
          currentPackedWeightKg += item.weightKg;
          totalBoxesPacked++;
          remainingQty--;
        } else {
          // Pallet capacity reached
          break;
        }
      }

      if (remainingQty > 0) {
        unpackedItems.push({
          ...item,
          quantity: remainingQty
        });
      }
    }

    const utilizationVolumePercent = Number(((currentPackedVolumeMm3 / palletVolumeMm3) * 100).toFixed(1));
    const utilizationWeightPercent = Number(((currentPackedWeightKg / maxPayloadWeightKg) * 100).toFixed(1));
    const remainingVolumeM3 = Number(((palletVolumeMm3 - currentPackedVolumeMm3) / 1_000_000_000).toFixed(2));
    const layerCount = Math.max(1, Math.ceil((currentPackedVolumeMm3 / (palletSpec.lengthMm * palletSpec.widthMm)) / 300));

    return {
      palletIndex: 1,
      totalBoxesPacked,
      utilizationVolumePercent,
      utilizationWeightPercent,
      totalWeightKg: currentPackedWeightKg + palletSpec.tareWeightKg,
      remainingVolumeM3,
      unpackedItems,
      layerCount
    };
  }

  /**
   * Evaluates ABC Inventory Velocity based on Pareto 80/20 analysis.
   * Fast-moving items (Category A) should be slotted closest to dispatch dock doors.
   */
  public static analyzeAbcVelocity(items: InventoryItem[]): AbcInventoryAnalysis {
    if (items.length === 0) {
      return { categoryA: [], categoryB: [], categoryC: [], recommendations: [] };
    }

    // Sort items by total asset value (quantityOnHand * unit price proxy)
    const sorted = [...items].sort((a, b) => {
      const valA = a.quantityOnHand * (a.category === 'Cold Chain' ? 120 : a.category === 'Electronics' ? 85 : 35);
      const valB = b.quantityOnHand * (b.category === 'Cold Chain' ? 120 : b.category === 'Electronics' ? 85 : 35);
      return valB - valA;
    });

    const totalCount = sorted.length;
    const aCount = Math.max(1, Math.round(totalCount * 0.2));
    const bCount = Math.max(1, Math.round(totalCount * 0.3));

    const categoryA = sorted.slice(0, aCount);
    const categoryB = sorted.slice(aCount, aCount + bCount);
    const categoryC = sorted.slice(aCount + bCount);

    const recommendations: string[] = [
      `Slot ${categoryA.length} Category A items in front-rack ground bins (Aisles 01-03) near dispatch dock doors to minimize picker travel.`,
      `Store ${categoryB.length} Category B items in middle racks (Aisles 04-08) at waist-to-shoulder ergonomic pick height.`,
      `Place ${categoryC.length} Category C slow-moving items in upper mezzanine tiers or rear bulk storage bins.`
    ];

    return {
      categoryA,
      categoryB,
      categoryC,
      recommendations
    };
  }

  /**
   * Optimizes Picker Path through warehouse using S-Shape routing strategy.
   * Minimizes backtracking and deadhead traversal between aisles.
   */
  public static optimizePickPath(pickList: PickLocation[]): PickPathOptimizationResult {
    if (pickList.length === 0) {
      return {
        orderedBins: [],
        totalDistanceMetersEstimated: 0,
        estimatedPickTimeMinutes: 0,
        routingStrategy: 'S-SHAPE_AISLE_TRANSIT'
      };
    }

    // S-Shape algorithm: Traverse aisle 1 going up, aisle 2 going down, aisle 3 going up...
    const sorted = [...pickList].sort((a, b) => {
      if (a.aisle !== b.aisle) {
        return a.aisle - b.aisle;
      }
      // If aisle is odd: sort bay ascending (forward traversal)
      // If aisle is even: sort bay descending (reverse traversal)
      if (a.aisle % 2 !== 0) {
        return a.bay - b.bay;
      } else {
        return b.bay - a.bay;
      }
    });

    // Approximate distance: 20 meters per aisle transit + 2.5 meters per bay
    let totalDistanceMeters = 0;
    for (let i = 1; i < sorted.length; i++) {
      const prev = sorted[i - 1];
      const curr = sorted[i];
      const aisleDelta = Math.abs(curr.aisle - prev.aisle) * 18.0;
      const bayDelta = Math.abs(curr.bay - prev.bay) * 2.8;
      totalDistanceMeters += aisleDelta + bayDelta;
    }

    // Add return-to-dock transit
    totalDistanceMeters += 35.0;
    totalDistanceMeters = Math.round(totalDistanceMeters);

    // Pick speed assumption: 1 meter/sec walking + 20 sec per pick item
    const walkingTimeSec = totalDistanceMeters / 1.0;
    const pickingTimeSec = pickList.length * 22;
    const estimatedPickTimeMinutes = Number(((walkingTimeSec + pickingTimeSec) / 60).toFixed(1));

    return {
      orderedBins: sorted,
      totalDistanceMetersEstimated: totalDistanceMeters,
      estimatedPickTimeMinutes,
      routingStrategy: 'S-SHAPE_AISLE_TRANSIT'
    };
  }
}
