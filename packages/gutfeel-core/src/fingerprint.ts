export interface FingerprintResult {
  foodName: string;
  status: "safe" | "likely-safe" | "unknown" | "likely-trigger" | "confirmed-trigger";
  confidence: number;
  testCount: number;
}

export interface SymptomEntry {
  severity: number;
  foods: string[];
  symptoms: string[];
  created_at: string;
}

/**
 * AI Fingerprint Engine
 * Analyzes symptom-food correlations to find personal triggers
 * Rule-based system that improves with more data
 */
export function analyzeFingerprint(
  symptoms: SymptomEntry[],
  foods: { name: string; category: string }[]
): FingerprintResult[] {
  if (symptoms.length < 3) {
    return foods.map(f => ({
      foodName: f.name,
      status: "unknown" as const,
      confidence: 0,
      testCount: 0,
    }));
  }

  const foodStats: Record<string, { totalSeverity: number; count: number; highSeverityCount: number }> = {};

  // Build stats for each food
  for (const entry of symptoms) {
    for (const food of entry.foods) {
      if (!foodStats[food]) {
        foodStats[food] = { totalSeverity: 0, count: 0, highSeverityCount: 0 };
      }
      foodStats[food].totalSeverity += entry.severity;
      foodStats[food].count++;
      if (entry.severity >= 3) {
        foodStats[food].highSeverityCount++;
      }
    }
  }

  // Analyze correlations
  const results: FingerprintResult[] = [];
  
  for (const food of foods) {
    const stats = foodStats[food.name];
    
    if (!stats || stats.count < 2) {
      results.push({
        foodName: food.name,
        status: "unknown",
        confidence: 0,
        testCount: stats?.count || 0,
      });
      continue;
    }

    const avgSeverity = stats.totalSeverity / stats.count;
    const highSeverityRate = stats.highSeverityCount / stats.count;
    const confidence = Math.min(95, Math.round((stats.count / 10) * 100));

    let status: FingerprintResult["status"];
    
    if (avgSeverity <= 1.5 && highSeverityRate < 0.2) {
      status = stats.count >= 5 ? "safe" : "likely-safe";
    } else if (avgSeverity >= 2.5 || highSeverityRate >= 0.5) {
      status = stats.count >= 4 ? "confirmed-trigger" : "likely-trigger";
    } else {
      status = "unknown";
    }

    results.push({
      foodName: food.name,
      status,
      confidence,
      testCount: stats.count,
    });
  }

  return results.sort((a, b) => {
    const priority = { "confirmed-trigger": 0, "likely-trigger": 1, "unknown": 2, "likely-safe": 3, "safe": 4 };
    return priority[a.status] - priority[b.status];
  });
}

/**
 * Get personalized insight message based on fingerprint progress
 */
export function getFingerprintInsight(results: FingerprintResult[], streak: number): string {
  const confirmedTriggers = results.filter(r => r.status === "confirmed-trigger");
  const safeFoods = results.filter(r => r.status === "safe");
  
  if (streak < 3) {
    return "Log daily to start discovering your triggers. Most users see patterns after 7 days.";
  }
  if (confirmedTriggers.length === 0 && safeFoods.length === 0) {
    return `${streak} day streak! Keep logging — we need more data to find your patterns.`;
  }
  if (confirmedTriggers.length > 0) {
    return `Great progress! We found ${confirmedTriggers.length} likely trigger${confirmedTriggers.length > 1 ? "s" : ""}. You can now avoid them with confidence.`;
  }
  return `${safeFoods.length} foods confirmed safe for you. Keep testing more foods!`;
}
