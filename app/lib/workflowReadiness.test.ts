import assert from "node:assert/strict";
import test from "node:test";

import { normalizeWorkflowReadiness } from "./workflowReadiness";

test("accepts only the backend ready contract", () => {
  assert.equal(normalizeWorkflowReadiness({ status: "ok" }), "ready");
  assert.equal(
    normalizeWorkflowReadiness({
      status: "ok",
      checks: { ai_provider: "gemini_api_key", gemini_api_key: true },
    }),
    "ready",
  );
});

test("fails closed for degraded or malformed readiness payloads", () => {
  assert.equal(normalizeWorkflowReadiness({ status: "degraded" }), "unavailable");
  assert.equal(normalizeWorkflowReadiness({ status: "ready" }), "unavailable");
  assert.equal(normalizeWorkflowReadiness({}), "unavailable");
  assert.equal(normalizeWorkflowReadiness(null), "unavailable");
  assert.equal(normalizeWorkflowReadiness("ok"), "unavailable");
});
