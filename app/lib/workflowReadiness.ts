export type WorkflowAvailability = "checking" | "ready" | "unavailable";

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value)
    ? value as Record<string, unknown>
    : null;
}

export function normalizeWorkflowReadiness(
  value: unknown,
): Exclude<WorkflowAvailability, "checking"> {
  return asRecord(value)?.status === "ok" ? "ready" : "unavailable";
}
