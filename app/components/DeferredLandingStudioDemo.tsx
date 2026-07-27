"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type ReactNode } from "react";

const LandingStudioDemo = dynamic(
  () => import("./LandingStudioDemo").then((module) => module.LandingStudioDemo),
  {
    loading: () => <StudioDemoPlaceholder />,
    ssr: false,
  },
);

function StudioDemoPlaceholder() {
  return (
    <div className="dash-demo-placeholder">
      <div className="dash-mock-head">
        <div className="dash-traffic" aria-hidden="true"><span /><span /><span /></div>
        <div className="dash-mock-url">Interactive studio sample</div>
      </div>
      <div className="dash-demo-placeholder-body" role="status">
        <div className="dash-demo-placeholder-copy">
          <strong>Preparing the interactive workspace…</strong>
          <span>The sample controls load as this section approaches.</span>
        </div>
      </div>
    </div>
  );
}

export function DeferredLandingStudioDemo({
  studioHref,
  resumePreview,
}: {
  studioHref: string;
  resumePreview: ReactNode;
}) {
  const [shouldLoad, setShouldLoad] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const revealDemo = () => setShouldLoad(true);
    const revealForStudioHash = () => {
      if (window.location.hash === "#studio") {
        revealDemo();
        return true;
      }
      return false;
    };

    if (revealForStudioHash()) {
      return;
    }

    const root = rootRef.current;
    if (!root || !("IntersectionObserver" in window)) {
      revealDemo();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          revealDemo();
          observer.disconnect();
        }
      },
      { rootMargin: "600px 0px" },
    );

    const handleHashChange = () => {
      if (revealForStudioHash()) {
        observer.disconnect();
      }
    };

    observer.observe(root);
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return (
    <div
      className="dash-demo-deferred"
      ref={rootRef}
    >
      {shouldLoad ? (
        <LandingStudioDemo studioHref={studioHref} resumePreview={resumePreview} />
      ) : (
        <StudioDemoPlaceholder />
      )}
    </div>
  );
}
