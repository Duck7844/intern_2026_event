import Image from "next/image";

import type { Step } from "@/data/faq";
import { toneBg } from "@/lib/tones";
import { cn } from "@/lib/utils";

type StepperProps = {
  steps: Step[];
  className?: string;
  /** Số cột trên desktop, mặc định bằng số bước */
  columns?: 3 | 4;
};

/** Các bước: ô minh hoạ pastel + số thứ tự vàng + tiêu đề. Ngang trên desktop, dọc trên mobile. */
export function Stepper({ steps, className, columns }: StepperProps) {
  const cols = columns ?? (steps.length >= 4 ? 4 : 3);
  return (
    <ol
      className={cn(
        "grid gap-4",
        cols === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-3",
        className,
      )}
    >
      {steps.map((step, i) => (
        <li
          key={step.title}
          className="flex flex-col gap-4 rounded-card border-2 border-line bg-white p-3 pb-5"
        >
          <div
            className={cn(
              "flex aspect-[16/10] items-center justify-center rounded-2xl",
              toneBg[step.tone],
            )}
          >
            <Image
              src={`/icons/${step.icon}.png`}
              alt=""
              width={80}
              height={80}
              className="size-16 drop-shadow-[0_6px_10px_rgba(59,53,96,0.18)] md:size-20"
            />
          </div>
          <div className="flex items-start gap-3 px-1">
            <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl border-2 border-ink bg-yellow font-display text-base font-extrabold text-ink shadow-hard-sm">
              {i + 1}
            </span>
            <div>
              <h3 className="pt-1.5 text-base leading-snug font-extrabold">{step.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-3">{step.description}</p>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
