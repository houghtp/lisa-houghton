"use client";
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    ml?: (...args: unknown[]) => void;
  }
}

export function MLEmbed({ formId }: { formId: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const trigger = () => {
      if (typeof window !== "undefined" && typeof window.ml === "function") {
        window.ml("account", "2411794");
      }
    };

    if (typeof window !== "undefined" && typeof window.ml === "function") {
      trigger();
    } else {
      const t = setInterval(() => {
        if (typeof window.ml === "function") {
          trigger();
          clearInterval(t);
        }
      }, 100);
      const timeout = setTimeout(() => clearInterval(t), 5000);
      return () => { clearInterval(t); clearTimeout(timeout); };
    }
  }, []);

  return <div ref={ref} className="ml-embedded" data-form={formId} />;
}
