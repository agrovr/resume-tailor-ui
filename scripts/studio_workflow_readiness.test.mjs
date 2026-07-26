import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const studioPage = readFileSync("app/app/page.tsx", "utf8");
const tailorAction = readFileSync("app/lib/tailorAction.ts", "utf8");
const workflowErrors = readFileSync("app/lib/workflowErrors.ts", "utf8");

test("studio gates tailoring on live backend readiness instead of URL presence", () => {
  assert.match(studioPage, /useState<WorkflowAvailability>/);
  assert.match(studioPage, /fetch\(`\$\{baseUrl\}\/ready`/);
  assert.match(studioPage, /cache:\s*"no-store"/);
  assert.match(studioPage, /window\.setTimeout\(\(\) => controller\.abort\(\), 6000\)/);
  assert.match(studioPage, /normalizeWorkflowReadiness/);
  assert.match(studioPage, /const checkWorkflowReadiness = useCallback/);
  assert.match(studioPage, /workflowReadinessGenerationRef\.current === generation/);
  assert.match(studioPage, /window\.addEventListener\("online", handleOnline\)/);
  assert.match(studioPage, /workflowAvailability,\s*\n\s*\}\)/);
  assert.match(studioPage, /workflowAvailability === "ready"/);
  assert.match(studioPage, /label:\s*"Retry workflow check"[\s\S]*?recheckWorkflow:\s*true/);
  assert.match(studioPage, /onClick=\{runNextAction\.recheckWorkflow \? \(\) => void checkWorkflowReadiness\(\) : undefined\}/);
  assert.match(studioPage, /nextError\.code === "ai_not_configured"[\s\S]*?setWorkflowAvailability\("unavailable"\)/);
  assert.doesNotMatch(studioPage, /backendReady:\s*Boolean\(baseUrl\)/);
});

test("tailor action distinguishes checking and unavailable workflow states", () => {
  assert.match(tailorAction, /workflowAvailability:\s*WorkflowAvailability/);
  assert.match(tailorAction, /input\.workflowAvailability === "checking"/);
  assert.match(tailorAction, /label:\s*"Checking workflow\.\.\."/);
  assert.match(tailorAction, /input\.workflowAvailability === "unavailable"/);
  assert.match(tailorAction, /label:\s*"Workflow unavailable"/);
});

test("AI configuration failures use fixed customer-safe recovery copy", () => {
  assert.match(workflowErrors, /case\s+"ai_not_configured"/);
  assert.match(workflowErrors, /case\s+"ai_generation_failed"/);
  assert.match(workflowErrors, /You can still review saved work and existing exports/);
  assert.doesNotMatch(workflowErrors, /GEMINI_API_KEY|GOOGLE_CLOUD_PROJECT/);
});
