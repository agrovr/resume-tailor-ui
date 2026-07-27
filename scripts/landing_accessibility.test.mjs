import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const landingPage = readFileSync("app/page.tsx", "utf8");
const landingStyles = readFileSync("app/landing.css", "utf8");

test("landing small text uses the readable secondary text token", () => {
  assert.match(
    landingStyles,
    /\.dash-mock-url\s*\{(?=[^}]*color:\s*var\(--ink-2\))[^}]*\}/s,
  );
  assert.match(
    landingStyles,
    /\.template-info \.template-tag\s*\{(?=[^}]*color:\s*var\(--ink-2\))[^}]*\}/s,
  );
});

test("landing decorative resume previews stay out of the accessibility tree", () => {
  assert.match(landingPage, /className="template-thumb" aria-hidden="true"/);
  assert.match(landingPage, /className="cta-visual" aria-hidden="true"/);
});

test("landing footer avoids decorative line-field overlays", () => {
  assert.doesNotMatch(landingStyles, /\.footer::after/);
});
