"use client";
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ml: (...args: any[]) => void;
  }
}

export function MLEmbed({ formId }: { formId: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // On client-side navigation Next.js doesn't re-run the ML script, so the
    // .ml-embedded div doesn't get picked up automatically.  Calling
    // ml('account', ...) again tells MailerLite to re-scan the DOM.
    const trigger = () => {
      if (typeof window !== "undefined" && window.ml) {
        window.ml("account", "2411794");
      }
    };

    if (typeof window !== "undefined" && window.ml) {
      trigger();
    } else {
      // Script may still be loading — poll briefly
      const t = setInterval(() => {
        if (window.ml) { trigger(); clearInterval(t); }
      }, 100);
      const timeout = setTimeout(() => clearInterval(t), 5000);
      return () => { clearInterval(t); clearTimeout(timeout); };
    }
  }, []);

  return <div ref={ref} className="ml-embedded" data-form={formId} />;
}
