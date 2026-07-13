export type IncidentRisk = "Critical" | "Elevated" | "Moderate" | "Low";

export type Incident = {
  id: string;
  type: string;
  location: string;
  district: string;
  date: string;
  time: string;
  risk: IncidentRisk;
  status: string;
};