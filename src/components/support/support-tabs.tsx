"use client";

import Image from "next/image";
import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";

import { FaqAccordion } from "@/components/site/faq-accordion";
import { Stepper } from "@/components/site/stepper";
import { TipBox } from "@/components/site/tip-box";
import { hostSteps, hostTip, playerSteps, playerTip, supportFaq } from "@/data/faq";

const tabs = [
  { value: "host", label: "Người tổ chức" },
  { value: "player", label: "Người chơi" },
  { value: "faq", label: "Chỉ xem FAQ" },
];

/**
 * 3 tab trang Hỗ trợ dạng segmented control (ô trắng viền, tab active nền vàng).
 * Tab Người tổ chức / Người chơi có stepper + mẹo + FAQ, tab "Chỉ xem FAQ" chỉ còn FAQ.
 */
export function SupportTabs() {
  return (
    <TabsPrimitive.Root defaultValue="host" className="flex flex-col gap-8">
      <TabsPrimitive.List
        aria-label="Chọn đối tượng hướng dẫn"
        className="inline-flex w-full max-w-xl gap-1 rounded-2xl border-2 border-line bg-white p-1"
      >
        {tabs.map((tab) => (
          <TabsPrimitive.Tab
            key={tab.value}
            value={tab.value}
            className="inline-flex h-10 flex-1 cursor-pointer items-center justify-center rounded-xl px-3 text-sm font-extrabold whitespace-nowrap text-ink-2 transition-colors outline-none hover:text-ink focus-visible:ring-4 focus-visible:ring-focus data-active:bg-yellow data-active:text-ink data-active:shadow-hard-sm"
          >
            {tab.label}
          </TabsPrimitive.Tab>
        ))}
      </TabsPrimitive.List>

      <TabsPrimitive.Panel value="host" className="flex flex-col gap-6 outline-none">
        <Stepper steps={hostSteps} />
        <TipBox>{hostTip}</TipBox>
        <FaqSection />
      </TabsPrimitive.Panel>

      <TabsPrimitive.Panel value="player" className="flex flex-col gap-6 outline-none">
        <Stepper steps={playerSteps} />
        <TipBox>{playerTip}</TipBox>
        <FaqSection />
      </TabsPrimitive.Panel>

      <TabsPrimitive.Panel value="faq" className="outline-none">
        <FaqSection />
      </TabsPrimitive.Panel>
    </TabsPrimitive.Root>
  );
}

function FaqSection() {
  return (
    <div className="mt-4 flex flex-col gap-5">
      <div className="flex items-center gap-4">
        <span className="inline-flex size-14 shrink-0 items-center justify-center rounded-2xl border-2 border-line bg-peri/40">
          <Image src="/icons/chat.png" alt="" width={36} height={36} className="size-9" />
        </span>
        <h2 className="text-[26px] leading-tight md:text-[32px]">Câu hỏi thường gặp</h2>
      </div>
      <FaqAccordion items={supportFaq} />
    </div>
  );
}
