import Image from "next/image";

import { Chip } from "@/components/ui/chip";
import type { Promo } from "@/data/pricing";
import { toneBg } from "@/lib/tones";
import { cn } from "@/lib/utils";
import { iconSrc } from "@/lib/assets";

type PromoCardProps = { promo: Promo; className?: string };

/** Card chương trình ưu đãi: ô minh hoạ trên, tag + thời gian + tiêu đề + mô tả dưới. */
export function PromoCard({ promo, className }: PromoCardProps) {
  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-card border-2 bg-white p-3",
        promo.featured ? "border-ink shadow-hard" : "border-line",
        className,
      )}
    >
      <div className={cn("flex aspect-[16/9] items-center justify-center rounded-2xl", toneBg[promo.tone])}>
        <Image
          src={iconSrc(promo.icon)}
          alt=""
          width={96}
          height={96}
          className="size-20 drop-shadow-[0_8px_12px_rgba(59,53,96,0.18)] md:size-24"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 px-1 pt-4 pb-1">
        <div className="flex items-center gap-2">
          <Chip as="span" size="sm" tone={promo.tone}>
            {promo.tag}
          </Chip>
          <span className="text-xs font-bold text-ink-3">{promo.period}</span>
        </div>
        <h3 className="text-[17px] leading-snug font-extrabold">{promo.title}</h3>
        <p className="text-sm leading-relaxed text-ink-3">{promo.description}</p>
      </div>
    </article>
  );
}
