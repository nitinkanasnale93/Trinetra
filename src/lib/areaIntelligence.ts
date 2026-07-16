import {
  crimeRecords,
  CrimeRecord,
} from "@/data/crimeRecords";

export type AreaIntelligence = {
  district: string;
  totalIncidents: number;
  dominantCrime: string;
  dominantCrimeCount: number;
  highRiskIncidents: number;
  peakCrimeTime: string;
  peakActivityWindow: string;
  topArea: string;
  riskLevel: "Low" | "Medium" | "High";
  confidence: number;
  similarCases: number;
  recommendedPatrol: string[];
  recommendedForensicSupport: boolean;
  intelligenceSummary: string;
  crimeStory: string;
  prediction: string;
  signals: string[];
};

function calculateRiskLevel(
  total: number,
  highRisk: number,
): "Low" | "Medium" | "High" {
  if (highRisk >= 5 || total >= 20) {
    return "High";
  }

  if (highRisk >= 2 || total >= 10) {
    return "Medium";
  }

  return "Low";
}

function calculateConfidence(
  records: CrimeRecord[],
) {
  return Math.min(
    95,
    70 + records.length * 2,
  );
}

function buildPatrolRecommendation(
  area: string,
  peakActivityWindow: string,
) {
  return [
    `Increase patrol frequency around ${area}.`,
    `Deploy additional patrol units during ${peakActivityWindow}.`,
    "Review nearby CCTV footage.",
  ];
}

function buildPrediction(
  risk: "Low" | "Medium" | "High",
  crime: string,
) {
  if (risk === "High") {
    return `${crime} is likely to continue over the next 24 hours if preventive patrols are not increased.`;
  }

  if (risk === "Medium") {
    return `Moderate probability of recurring ${crime.toLowerCase()} incidents.`;
  }

  return "Current trends indicate stable crime activity.";
}

function getMostFrequent(
  values: string[],
) {
  if (values.length === 0) {
    return {
      value: "No data",
      count: 0,
    };
  }

  const counts = values.reduce<
    Record<string, number>
  >((accumulator, value) => {
    accumulator[value] =
      (accumulator[value] || 0) + 1;

    return accumulator;
  }, {});

  const [value, count] = Object.entries(
    counts,
  ).sort(
    (a, b) => b[1] - a[1],
  )[0];

  return {
    value,
    count,
  };
}

function getTimePeriod(
  time: string,
) {
  const hour = Number(
    time.split(":")[0],
  );

  if (hour >= 0 && hour < 6) {
    return "Late Night";
  }

  if (hour >= 6 && hour < 12) {
    return "Morning";
  }

  if (hour >= 12 && hour < 18) {
    return "Afternoon";
  }

  return "Night";
}

function formatHour(
  hour: number,
) {
  const normalizedHour =
    ((hour % 24) + 24) % 24;

  if (normalizedHour === 0) {
    return "12 AM";
  }

  if (normalizedHour === 12) {
    return "12 PM";
  }

  if (normalizedHour < 12) {
    return `${normalizedHour} AM`;
  }

  return `${normalizedHour - 12} PM`;
}

function getPeakActivityWindow(
  records: CrimeRecord[],
) {
  if (records.length === 0) {
    return "No data";
  }

  const hourlyCounts: number[] =
    Array(24).fill(0);

  records.forEach((record) => {
    const hour = Number(
      record.time.split(":")[0],
    );

    if (
      Number.isInteger(hour) &&
      hour >= 0 &&
      hour < 24
    ) {
      hourlyCounts[hour]++;
    }
  });

  let peakStartHour = 0;
  let peakCount = -1;

  for (
    let hour = 0;
    hour < 24;
    hour++
  ) {
    const windowCount =
      hourlyCounts[hour] +
      hourlyCounts[(hour + 1) % 24] +
      hourlyCounts[(hour + 2) % 24];

    if (windowCount > peakCount) {
      peakCount = windowCount;
      peakStartHour = hour;
    }
  }

  const peakEndHour =
    (peakStartHour + 3) % 24;

  return `${formatHour(
    peakStartHour,
  )} – ${formatHour(
    peakEndHour,
  )}`;
}

function detectRepeatedModusOperandi(
  records: CrimeRecord[],
) {
  const modusOperandiCounts =
    records.reduce<
      Record<string, number>
    >((accumulator, record) => {
      accumulator[
        record.modusOperandi
      ] =
        (accumulator[
          record.modusOperandi
        ] || 0) + 1;

      return accumulator;
    }, {});

  return Object.entries(
    modusOperandiCounts,
  )
    .filter(
      ([, count]) => count >= 2,
    )
    .map(
      ([modusOperandi, count]) => ({
        modusOperandi,
        count,
      }),
    );
}

export function getAreaIntelligence(
  district: string,
): AreaIntelligence {
  const districtRecords =
    crimeRecords.filter(
      (record) =>
        record.district === district,
    );

  if (
    districtRecords.length === 0
  ) {
    return {
      district,
      totalIncidents: 0,
      dominantCrime: "No data",
      dominantCrimeCount: 0,
      highRiskIncidents: 0,
      peakCrimeTime: "No data",
      peakActivityWindow: "No data",
      topArea: "No data",
      riskLevel: "Low",
      confidence: 0,
      similarCases: 0,
      recommendedPatrol: [],
      recommendedForensicSupport:
        false,
      intelligenceSummary:
        "No crime records are currently available for this district.",
      crimeStory:
        "No crime intelligence is available for the selected district.",
      prediction:
        "Insufficient historical data to generate predictions.",
      signals: [],
    };
  }

  const dominantCrime =
    getMostFrequent(
      districtRecords.map(
        (record) =>
          record.crimeType,
      ),
    );

  const peakCrimeTime =
    getMostFrequent(
      districtRecords.map(
        (record) =>
          getTimePeriod(record.time),
      ),
    );

  const peakActivityWindow =
    getPeakActivityWindow(
      districtRecords,
    );

  const topArea =
    getMostFrequent(
      districtRecords.map(
        (record) => record.area,
      ),
    );

  const highRiskIncidents =
    districtRecords.filter(
      (record) =>
        record.severity === "High" ||
        record.severity ===
          "Critical",
    ).length;

  const repeatedPatterns =
    detectRepeatedModusOperandi(
      districtRecords,
    );

  const signals: string[] = [];

  if (
    dominantCrime.count >= 2
  ) {
    signals.push(
      `${dominantCrime.value} is the dominant recorded crime category.`,
    );
  }

  if (
    highRiskIncidents >= 2
  ) {
    signals.push(
      `${highRiskIncidents} high-risk or critical incidents require attention.`,
    );
  }

  repeatedPatterns.forEach(
    (pattern) => {
      signals.push(
        `Possible repeating pattern detected: ${pattern.count} incidents share "${pattern.modusOperandi}".`,
      );
    },
  );

  const riskLevel =
    calculateRiskLevel(
      districtRecords.length,
      highRiskIncidents,
    );

  const confidence =
    calculateConfidence(
      districtRecords,
    );

  const recommendedPatrol =
    buildPatrolRecommendation(
      topArea.value,
      peakActivityWindow,
    );

  const prediction =
    buildPrediction(
      riskLevel,
      dominantCrime.value,
    );

  const intelligenceSummary =
    `${district} recorded ${districtRecords.length} incidents. ` +
    `${dominantCrime.value} is currently the dominant crime category with ${dominantCrime.count} recorded incidents. ` +
    `The highest incident concentration was detected between ${peakActivityWindow}. ` +
    `${topArea.value} has the highest concentration in the available records.`;

  const crimeStory =
    `Operational assessment for ${district}. ` +
    `${dominantCrime.value} remains the primary offence around ${topArea.value}. ` +
    `Peak activity is concentrated between ${peakActivityWindow}. ` +
    `Current operational risk is assessed as ${riskLevel}. ` +
    `TRINETRA recommends intensified patrols, surveillance and monitoring of repeat offenders.`;

  return {
    district,
    totalIncidents:
      districtRecords.length,
    dominantCrime:
      dominantCrime.value,
    dominantCrimeCount:
      dominantCrime.count,
    highRiskIncidents,
    peakCrimeTime:
      peakCrimeTime.value,
    peakActivityWindow,
    topArea:
      topArea.value,
    riskLevel,
    confidence,
    similarCases:
      repeatedPatterns.length,
    recommendedPatrol,
    recommendedForensicSupport:
      highRiskIncidents >= 3,
    intelligenceSummary,
    crimeStory,
    prediction,
    signals,
  };
}

export function getAvailableDistricts() {
  return Array.from(
    new Set(
      crimeRecords.map(
        (record) =>
          record.district,
      ),
    ),
  ).sort();
}