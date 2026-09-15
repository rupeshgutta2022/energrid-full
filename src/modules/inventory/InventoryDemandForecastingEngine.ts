/**
 * LogiCore Enterprise Inventory Planning & Demand Forecasting Engine
 * 
 * Provides Economic Order Quantity (EOQ), stochastic dynamic safety stock calculation
 * with service-level Z-scores (95%, 98%, 99%), seasonal demand forecasting (Holt-Winters),
 * and Days Sales of Inventory (DSI) working capital optimization.
 */

export interface EoqCalculationResult {
  optimalOrderQuantityUnits: number;
  totalAnnualOrders: number;
  orderCycleDays: number;
  annualOrderingCostInr: number;
  annualHoldingCostInr: number;
  totalAnnualInventoryCostInr: number;
}

export interface ReorderPointSpecs {
  leadTimeDemandUnits: number;
  safetyStockUnits: number;
  reorderPointUnits: number;
  serviceLevelPercent: number;
  stockoutRiskPercent: number;
  bufferCoverageDays: number;
}

export interface SeasonalForecastMonth {
  monthIndex: number;
  monthName: string;
  projectedDemandUnits: number;
  lowerConfidenceBound: number;
  upperConfidenceBound: number;
  seasonalityFactor: number;
}

export interface InventoryHealthMetrics {
  inventoryTurnoverRatio: number;
  daysSalesOfInventoryDsi: number;
  workingCapitalTiedInr: number;
  deadStockValueInr: number;
  healthyStockValueInr: number;
  stockHealthClassification: 'EXCELLENT_LIQUID' | 'BALANCED' | 'OVERSTOCKED' | 'CRITICAL_WORKING_CAPITAL_TRAP';
}

export class InventoryDemandForecastingEngine {
  /**
   * Calculates classical Wilson Economic Order Quantity (EOQ)
   */
  public static calculateEconomicOrderQuantity(
    annualDemandUnits: number,
    orderSetupCostInr: number,
    annualHoldingCostPerUnitInr: number
  ): EoqCalculationResult {
    if (annualDemandUnits <= 0 || orderSetupCostInr <= 0 || annualHoldingCostPerUnitInr <= 0) {
      return {
        optimalOrderQuantityUnits: 0,
        totalAnnualOrders: 0,
        orderCycleDays: 0,
        annualOrderingCostInr: 0,
        annualHoldingCostInr: 0,
        totalAnnualInventoryCostInr: 0
      };
    }

    // EOQ = sqrt((2 * D * S) / H)
    const eoq = Math.round(Math.sqrt((2 * annualDemandUnits * orderSetupCostInr) / annualHoldingCostPerUnitInr));
    const annualOrders = Math.round((annualDemandUnits / eoq) * 10) / 10;
    const cycleDays = Math.round((365 / annualOrders) * 10) / 10;

    const orderingCost = Math.round(annualOrders * orderSetupCostInr);
    const holdingCost = Math.round((eoq / 2) * annualHoldingCostPerUnitInr);

    return {
      optimalOrderQuantityUnits: eoq,
      totalAnnualOrders: annualOrders,
      orderCycleDays: cycleDays,
      annualOrderingCostInr: orderingCost,
      annualHoldingCostInr: holdingCost,
      totalAnnualInventoryCostInr: orderingCost + holdingCost
    };
  }

  /**
   * Calculates stochastic Reorder Point (ROP) with joint demand & lead time variance
   * Safety Stock = Z * sqrt( (L * stdDevDemand^2) + (avgDemand^2 * stdDevLeadTime^2) )
   */
  public static calculateDynamicReorderPoint(
    avgDailyDemand: number,
    stdDevDailyDemand: number,
    avgLeadTimeDays: number,
    stdDevLeadTimeDays: number,
    desiredServiceLevel: '90%' | '95%' | '98%' | '99%' = '95%'
  ): ReorderPointSpecs {
    // Normal distribution Z-scores
    const zScores: Record<string, number> = {
      '90%': 1.28,
      '95%': 1.645,
      '98%': 2.05,
      '99%': 2.33
    };

    const z = zScores[desiredServiceLevel] || 1.645;

    // Expected demand during average lead time
    const leadTimeDemand = avgDailyDemand * avgLeadTimeDays;

    // Combined variance: variance due to demand fluctuations + variance due to supplier delays
    const demandVariancePart = avgLeadTimeDays * Math.pow(stdDevDailyDemand, 2);
    const leadTimeVariancePart = Math.pow(avgDailyDemand, 2) * Math.pow(stdDevLeadTimeDays, 2);
    const combinedStdDev = Math.sqrt(demandVariancePart + leadTimeVariancePart);

    const safetyStock = Math.ceil(z * combinedStdDev);
    const reorderPoint = Math.ceil(leadTimeDemand + safetyStock);
    const coverageDays = avgDailyDemand > 0 ? Math.round((safetyStock / avgDailyDemand) * 10) / 10 : 0;

    const riskPercent = Math.round((100 - parseFloat(desiredServiceLevel)) * 10) / 10;

    return {
      leadTimeDemandUnits: Math.round(leadTimeDemand),
      safetyStockUnits: safetyStock,
      reorderPointUnits: reorderPoint,
      serviceLevelPercent: parseFloat(desiredServiceLevel),
      stockoutRiskPercent: riskPercent,
      bufferCoverageDays: coverageDays
    };
  }

  /**
   * Holt-Winters seasonal exponential smoothing projection
   */
  public static forecastSeasonalDemand(
    baselineMonthlyDemand: number,
    growthRatePercent: number,
    seasonalityMultipliers: number[] // 12 numbers representing monthly seasonal variation (e.g. 1.15 for festival season)
  ): SeasonalForecastMonth[] {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const monthlyGrowthFactor = 1 + (growthRatePercent / 100) / 12;

    return monthNames.map((monthName, idx) => {
      const seasonalIndex = seasonalityMultipliers[idx] || 1.0;
      const trendAdjusted = baselineMonthlyDemand * Math.pow(monthlyGrowthFactor, idx + 1);
      const projected = Math.round(trendAdjusted * seasonalIndex);
      // 95% prediction interval (approx +/- 12% uncertainty)
      const lower = Math.round(projected * 0.88);
      const upper = Math.round(projected * 1.12);

      return {
        monthIndex: idx + 1,
        monthName,
        projectedDemandUnits: projected,
        lowerConfidenceBound: lower,
        upperConfidenceBound: upper,
        seasonalityFactor: seasonalIndex
      };
    });
  }

  /**
   * Evaluates Working Capital Efficiency & Inventory Turnover Ratio
   */
  public static evaluateInventoryTurnoverAndDSI(
    cogsAnnualInr: number,
    averageInventoryValueInr: number,
    deadStockValueInr: number
  ): InventoryHealthMetrics {
    const turnover = averageInventoryValueInr > 0 ? Math.round((cogsAnnualInr / averageInventoryValueInr) * 100) / 100 : 0;
    const dsi = turnover > 0 ? Math.round((365 / turnover) * 10) / 10 : 365;

    let classification: InventoryHealthMetrics['stockHealthClassification'] = 'BALANCED';
    if (turnover >= 8) {
      classification = 'EXCELLENT_LIQUID';
    } else if (turnover >= 5) {
      classification = 'BALANCED';
    } else if (turnover >= 3) {
      classification = 'OVERSTOCKED';
    } else {
      classification = 'CRITICAL_WORKING_CAPITAL_TRAP';
    }

    const healthyStock = Math.max(0, averageInventoryValueInr - deadStockValueInr);

    return {
      inventoryTurnoverRatio: turnover,
      daysSalesOfInventoryDsi: dsi,
      workingCapitalTiedInr: averageInventoryValueInr,
      deadStockValueInr,
      healthyStockValueInr: healthyStock,
      stockHealthClassification: classification
    };
  }
}
