"use client";
import { useEffect, useRef } from "react";

export function MLEmbed({ formId }: { formId: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Ensure a fresh .ml-embedded div exists
    container.innerHTML = `<div class="ml-embedded" data-form="${formId}"></div>`;

    // Strip out any previously loaded ML scripts and globals so ML
    // re-initialises completely rather than thinking it has already run.
    document.querySelectorAll('script[data-ml]').forEach((s) => s.remove());
    const w = window as Record<string, unknown>;
    delete w["ml"];
    delete w["MailerLiteObject"];

    // Re-inject ML with a cache-busting timestamp so the browser
    // fetches and executes it fresh every time this component mounts.
    const script = document.createElement("script");
    script.setAttribute("data-ml", "true");
    script.async = true;
    script.src = `https://assets.mailerlite.com/js/universal.js?_=${Date.now()}`;
    script.onload = () => {
      const ml = w["ml"] as ((...a: unknown[]) => void) | undefined;
      if (typeof ml === "function") {
        ml("account", "2411794");
      }
    };
    document.head.appendChild(script);

    return () => {
      script.remove();
      delete w["ml"];
      delete w["MailerLiteObject"];
      if (container) container.innerHTML = "";
    };
  }, [formId]);

  return <div ref={containerRef} />;
}
