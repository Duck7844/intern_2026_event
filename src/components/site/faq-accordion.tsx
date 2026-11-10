"use client";

import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { Minus, Plus } from "lucide-react";

import type { FaqItem } from "@/data/faq";
import { cn } from "@/lib/utils";

type FaqAccordionProps = {
  items: FaqItem[];
  /** id câu mở sẵn, mặc định câu đầu */
  defaultOpenId?: string;
  className?: string;
};

/**
 * Accordion FAQ theo style site: mỗi câu là card viền 2px, dấu +/− bên phải, 1 câu mở sẵn.
 * Dùng Base UI trực tiếp để kiểm soát icon và animation.
 */
export function FaqAccordion({ items, defaultOpenId, className }: FaqAccordionProps) {
  const defaultValue = [defaultOpenId ?? items[0]?.id].filter(Boolean) as string[];

  return (
    <AccordionPrimitive.Root
      defaultValue={defaultValue}
      className={cn("flex w-full flex-col gap-3", className)}
    >
      {items.map((item) => (
        <AccordionPrimitive.Item
          key={item.id}
          value={item.id}
          className="group/faq rounded-2xl border-2 border-line bg-white transition-[border-color,box-shadow] data-open:border-ink data-open:shadow-hard-sm"
        >
          <AccordionPrimitive.Header className="flex">
            <AccordionPrimitive.Trigger className="group/trigger flex flex-1 cursor-pointer items-center justify-between gap-4 rounded-2xl px-5 py-4 text-left text-base font-extrabold text-ink outline-none focus-visible:ring-4 focus-visible:ring-focus">
              {item.question}
              <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full border-2 border-line text-ink-2 transition-colors group-data-open/faq:border-ink group-data-open/faq:bg-yellow">
                <Plus className="size-4 group-data-open/faq:hidden" aria-hidden="true" />
                <Minus className="hidden size-4 group-data-open/faq:block" aria-hidden="true" />
              </span>
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>
          <AccordionPrimitive.Panel className="h-(--accordion-panel-height) overflow-hidden transition-[height] duration-200 ease-out data-ending-style:h-0 data-starting-style:h-0">
            <p className="px-5 pb-5 text-sm leading-relaxed text-ink-3">{item.answer}</p>
          </AccordionPrimitive.Panel>
        </AccordionPrimitive.Item>
      ))}
    </AccordionPrimitive.Root>
  );
}
