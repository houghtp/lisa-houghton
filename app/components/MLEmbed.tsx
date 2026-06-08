"use client";
import { useEffect, useRef } from "react";

export function MLEmbed({ formId }: { formId: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Fresh target div
    container.innerHTML = `<div class="ml-embedded" data-form="${formId}"></div>`;

    // Wipe every ML global so the script thinks it has never run
    const w = window as unknown as Record<string, unknown>;
    (["ml", "MailerLiteObject", "mlb2", "ml_webforms"] as const).forEach(
      (k) => delete w[k]
    );

    // Remove any stale ML script tags
    document.querySelectorAll("script[data-ml-embed]").forEach((s) =>
      s.remove()
    );

    // Step 1 — set up the queue and enqueue the account call (synchronous,
    // must happen before the external script so ML reads the queue on load)
    const initScript = document.createElement("script");
    initScript.setAttribute("data-ml-embed", "true");
    initScript.textContent = `
      window.ml = window.ml || function() {
        (window.ml.q = window.ml.q || []).push(arguments);
      };
      window.ml('account', '2411794');
    `;
    document.head.appendChild(initScript);

    // Step 2 — load the ML library (reads the queue, renders the form)
    const extScript = document.createElement("script");
    extScript.setAttribute("data-ml-embed", "true");
    extScript.async = true;
    extScript.src = "https://assets.mailerlite.com/js/universal.js";
    document.head.appendChild(extScript);

    return () => {
      document.querySelectorAll("script[data-ml-embed]").forEach((s) =>
        s.remove()
      );
      (["ml", "MailerLiteObject", "mlb2", "ml_webforms"] as const).forEach(
        (k) => delete w[k]
      );
      if (container) container.innerHTML = "";
    };
  }, [formId]);

  return <div ref={containerRef} />;
}
