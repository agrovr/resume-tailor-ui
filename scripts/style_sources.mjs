import { readFileSync } from "node:fs";

export function stylesFor(...routeStylesheets) {
  return ["globals.css", ...routeStylesheets]
    .map((stylesheet) => readFileSync(new URL(`../app/${stylesheet}`, import.meta.url), "utf8"))
    .join("\n");
}

export function withoutLandingScope(styles) {
  return styles
    .replaceAll(":where(.landing-page).page-shell", ".page-shell")
    .replaceAll(":where(.landing-page) ", "");
}

export const landingStylesForAssertions = withoutLandingScope(stylesFor("landing.css"));

export const allPublicStyles = stylesFor(
  "landing.css",
  "public-pages.css",
  "help/help.css",
  "status/status.css",
  "support/support.css",
  "updates/updates.css",
  "templates/templates.css",
);

export const allStudioStyles = stylesFor("app/studio.css");
