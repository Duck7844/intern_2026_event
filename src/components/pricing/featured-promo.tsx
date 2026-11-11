"use client";

import Image from "next/image";
import Link from "next/link";
import { Copy } from "lucide-react";
import { toast } from "sonner";

import { Button, buttonVariants } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { featuredPromoDetails, type Promo } from "@/data/pricing";
import { toneBg } from "@/lib/tones";
import { cn } from "@/lib/utils";
import { iconSrc } from "@/lib/assets";

type FeaturedPromoProps = { promo: Promo };

/**
 * Card lớn cho chương trình nổi bật: tag, tiêu đề, mô tả, ô mã giảm giá có nút Chép,
 * CTA; bên phải ô minh hoạ. Dưới là cách nhận và điều kiện áp dụng.
 */
export function FeaturedPromo({ promo }: FeaturedPromoProps) {
  async function copyCode() {
    if (!promo.code) return;
    try {
      await navigator.clipboard.writeText(promo.code);
      toast.success(`Đã chép mã ${promo.code}`);
    } catch {
      toast(`Mã giảm giá: ${promo.code}`);
    }
  }

  return (
    <section
      aria-labelledby="featured-promo"
      className="overflow-hidden rounded-[28px] border-2 border-ink bg-white shadow-[0_6px_0_0_var(--color-ink)]"
    >
      <div className="grid lg:grid-cols-[1.1fr_1fr]">
        <div className="flex flex-col items-start gap-4 p-6 md:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <Chip as="span" size="sm" tone={promo.tone}>
              Đang diễn ra · {promo.period}
            </Chip>
          </div>
          <h2 id="featured-promo" className="text-[26px] leading-tight md:text-[32px]">
            {promo.title}
          </h2>
          <p className="text-base leading-relaxed text-ink-3">{promo.description}</p>

          {promo.code && (
            <div className="inline-flex items-center gap-2 rounded-2xl border-2 border-dashed border-ink-4 bg-cream py-1.5 pr-1.5 pl-4">
              <span className="font-mono text-base font-bold tracking-[0.15em] text-ink">{promo.code}</span>
              <Button type="button" variant="subtle" size="sm" className="h-9 px-3" onClick={copyCode}>
                <Copy /> Chép
              </Button>
            </div>
          )}

          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <Button type="button" size="md" onClick={() => toast("Áp mã ở bước thanh toán (giai đoạn sau).")}>
              Áp dụng và chọn gói Event
            </Button>
            <Link href="#promo-conditions" className={cn(buttonVariants({ variant: "outline", size: "md" }))}>
              Xem điều kiện
            </Link>
          </div>
        </div>

        <div
          aria-hidden="true"
          className={cn("flex min-h-56 items-center justify-center border-t-2 border-ink lg:border-t-0 lg:border-l-2", toneBg[promo.tone])}
        >
          <Image
            src={iconSrc(promo.icon)}
            alt=""
            width={160}
            height={160}
            className="size-32 drop-shadow-[0_12px_18px_rgba(59,53,96,0.22)] md:size-40"
          />
        </div>
      </div>

      <div id="promo-conditions" className="grid gap-6 border-t-2 border-line bg-cream p-6 md:grid-cols-2 md:p-8">
        <div>
          <h3 className="text-base font-extrabold">Dành cho</h3>
          <p className="mt-1 text-sm text-ink-3">{featuredPromoDetails.audience}</p>
          <h3 className="mt-4 text-base font-extrabold">Cách nhận ưu đãi</h3>
          <ol className="mt-2 flex flex-col gap-2">
            {featuredPromoDetails.steps.map((s, i) => (
              <li key={s} className="flex items-start gap-3 text-sm text-ink-2">
                <span className="inline-flex size-6 shrink-0 items-center justify-center rounded-full border-2 border-ink bg-yellow text-xs font-extrabold">
                  {i + 1}
                </span>
                <span className="pt-0.5">{s}</span>
              </li>
            ))}
          </ol>
        </div>
        <div>
          <h3 className="text-base font-extrabold">Điều kiện áp dụng</h3>
          <ul className="mt-2 flex flex-col gap-1.5 text-sm text-ink-3">
            {featuredPromoDetails.conditions.map((c) => (
              <li key={c}>· {c}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
