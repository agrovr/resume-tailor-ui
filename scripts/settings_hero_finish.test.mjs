import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const stylesheets = {
  "app/globals.css": readFileSync("app/globals.css", "utf8"),
  "app/settings/settings.css": readFileSync("app/settings/settings.css", "utf8"),
  "app/app/studio.css": readFileSync("app/app/studio.css", "utf8"),
};

function whereFinishSelectors(source) {
  return [...source.matchAll(/:where\(([\s\S]*?)\)\s*(::after)?\s*\{/g)].map((match) => ({
    pseudo: match[2] ?? "",
    selectors: match[1],
  }));
}

test("settings hero status wrapper is never decorated as a pill", () => {
  for (const [path, source] of Object.entries(stylesheets)) {
    const contaminatedRules = whereFinishSelectors(source).filter(({ selectors }) =>
      selectors.includes(".settings-hero-status"),
    );

    assert.deepEqual(contaminatedRules, [], `${path} must keep the Settings status wrapper out of pill finish rules`);
  }
});

test("settings plan pill keeps its finish while the wrapper keeps its layout", () => {
  const settingsStyles = stylesheets["app/settings/settings.css"];
  const planPillHighlights = whereFinishSelectors(settingsStyles).filter(
    ({ pseudo, selectors }) => pseudo === "::after" && selectors.includes(".settings-status-pill"),
  );

  assert.ok(planPillHighlights.length > 0, "the actual Settings plan pill should retain its highlight");
  assert.match(
    settingsStyles,
    /\.settings-hero-status\s*\{(?=[^}]*display:\s*grid)(?=[^}]*justify-items:\s*end)(?=[^}]*gap:\s*12px)[^}]*\}/s,
  );
});
