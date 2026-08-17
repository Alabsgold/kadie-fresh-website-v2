"use client";

import { useState } from "react";

export function FaqAccordion({
  faqs,
}: {
  faqs: ReadonlyArray<{ q: string; a: string }>;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="flex flex-col gap-3">
      {faqs.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={faq.q} className="glass-card overflow-hidden">
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full cursor-pointer items-center justify-between gap-4 px-5.5 py-4.5 text-left"
            >
              <span className="font-display text-[16.5px] font-bold tracking-[-0.01em] text-forest-900">
                {faq.q}
              </span>
              <span
                className="flex h-7.5 w-7.5 shrink-0 items-center justify-center rounded-full bg-green-50 text-lg leading-none font-bold text-green-600 transition-transform duration-240 ease-[cubic-bezier(.2,.8,.2,1)]"
                style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
              >
                +
              </span>
            </button>
            <div
              className="grid transition-[grid-template-rows] duration-280 ease-[cubic-bezier(.2,.8,.2,1)]"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p className="px-5.5 pb-5 text-[14.5px] leading-relaxed text-pretty text-gray-600">
                  {faq.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
