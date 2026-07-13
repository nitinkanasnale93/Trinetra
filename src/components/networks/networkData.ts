export type NetworkEntity = {
  id: string;
  label: string;
  risk: "Critical" | "High" | "Medium" | "Low";
  confidence: number;
  cases: number;
  lastActivity: string;
  assets: string[];
  insight: string;
};

export const networkData: Record<string, NetworkEntity> = {
  "OFF-2941": {
    id: "OFF-2941",
    label: "Primary Subject",
    risk: "Critical",
    confidence: 96,
    cases: 14,
    lastActivity: "13 Jul 2026",
    assets: ["Vehicle", "Phone", "Bank", "Associate"],
    insight:
      "Primary subject connected to multiple investigations. Pattern analysis indicates repeated activity across linked incidents.",
  },

  "OFF-102": {
    id: "OFF-102",
    label: "Linked Offender",
    risk: "High",
    confidence: 88,
    cases: 8,
    lastActivity: "11 Jul 2026",
    assets: ["Phone", "Associate"],
    insight:
      "Linked offender maintains repeated communication with the primary subject.",
  },

  "VEH-82": {
    id: "VEH-82",
    label: "Vehicle",
    risk: "Medium",
    confidence: 76,
    cases: 5,
    lastActivity: "09 Jul 2026",
    assets: ["Registration", "GPS"],
    insight:
      "Vehicle detected near multiple crime locations within a short time window.",
  },

  "INC-291": {
    id: "INC-291",
    label: "Incident",
    risk: "Low",
    confidence: 82,
    cases: 2,
    lastActivity: "08 Jul 2026",
    assets: ["Evidence", "Witness"],
    insight:
      "Incident shares temporal characteristics with previous investigations.",
  },

  "INC-284": {
    id: "INC-284",
    label: "Incident",
    risk: "Medium",
    confidence: 84,
    cases: 4,
    lastActivity: "12 Jul 2026",
    assets: ["CCTV", "Evidence"],
    insight:
      "Incident forms part of an emerging hotspot cluster.",
  },
};