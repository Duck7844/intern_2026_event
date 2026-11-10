"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { toast } from "sonner";

import { Button, buttonVariants } from "@/components/ui/button";
import type { Plan } from "@/data/pricing";
import { toneBg } from "@/lib/tones";
import { cn } from "@/lib/utils";

type PricingCardProps = {
  plan: Plan;
  /** Card lớn ở block "Chọn nhanh" */
  size?: "md" | "lg";
  className?: string;
};

/**
 * Card gói cước. Gói miễn phí dẫn về danh sách game; các gói trả phí hiện toast
 * vì luồng thanh toán nằm ngoài phạm vi UI.
 */
export function PricingCard({ plan, size = "md", className }: PricingCardProps) {
  const isFree = plan.id === "free";

  return (
    <article
      className={cn(
        "relative flex h-full flex-col rounded-card border-2 bg-white",
        plan.recommended ? "border-ink shadow-[0_6px_0_0_var(--color-ink)]" : "border-line",
        size === "lg" ? "p-6 md:p-7" : "p-5",
        className,
      )}
    >
      {plan.recommended && (
        <span className="absolute -top-3.5 left-5 rounded-full border-2 border-ink bg-yellow px-3 py-0.5 text-xs font-extrabold text-ink">
          Nên chọn
        </span>
      )}

      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className={cn("font-extrabold", size === "lg" ? "text-xl" : "text-lg")}>{plan.name}</h3>
          <p className="mt-0.5 text-xs font-bold text-ink-3">{plan.audience}</p>
        </div>
        <span
          aria-hidden="true"
          className={cn("size-9 shrink-0 rounded-xl border-2 border-line", toneBg[plan.tone])}
        />
      </div>

      <p className="mt-4 flex items-baseline gap-1.5">
        <span className={cn("font-display font-extrabold", size === "lg" ? "text-[36px]" : "text-[28px]")}>
          {plan.price}
        </span>
        {plan.priceNote && <span className="text-sm font-bold text-ink-3">{plan.priceNote}</span>}
      </p>

      <ul className="mt-4 flex flex-1 flex-col gap-2">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm font-bold text-ink-2">
            <Check className="mt-0.5 size-4 shrink-0 text-ok" aria-hidden="true" />
            {f}
          </li>
        ))}
      </ul>

      {isFree ? (
        <Link
          href="/#game"
          className={cn(
            buttonVariants({ variant: "ghost", size: size === "lg" ? "md" : "sm" }),
            "mt-6 w-full",
          )}
        >
          {plan.cta}
        </Link>
      ) : (
        <Button
          variant={plan.recommended ? "primary" : "ghost"}
          size={size === "lg" ? "md" : "sm"}
          className="mt-6 w-full"
          onClick={() =>
            toast(`Gói ${plan.name}: luồng thanh toán sẽ có ở giai đoạn sau.`, {
              description: "Bản demo chỉ dựng giao diện bảng giá.",
            })
          }
        >
          {plan.cta}
        </Button>
      )}
    </article>
  );
}
