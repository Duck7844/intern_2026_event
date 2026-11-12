import Image from "next/image";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import type { BoardGame } from "@/data/board-games";
import { iconSrc } from "@/lib/assets";
import { toneBg } from "@/lib/tones";
import { cn } from "@/lib/utils";

/** Card lớn ở trang /ban-co: tranh minh hoạ, mô tả, chip meta, 2 nút chọn chế độ. */
export function BoardListCard({ game }: { game: BoardGame }) {
  return (
    <article className="flex h-full flex-col rounded-card border-2 border-line bg-white p-3">
      <div className="relative aspect-square overflow-hidden rounded-2xl border-2 border-line">
        <Image src={game.thumb} alt="" fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
      </div>
      <div className="flex flex-1 flex-col gap-2 px-1 pt-4">
        <h3 className="text-[20px] leading-tight font-extrabold">
          <Link href={game.href} className="no-underline hover:underline">
            {game.title}
          </Link>
        </h3>
        <p className="text-sm leading-relaxed text-ink-3">{game.description}</p>
        <div className="mt-auto flex flex-wrap gap-2 pt-2">
          <span className={cn("rounded-full px-3 py-1 text-xs font-extrabold text-ink", toneBg[game.tone])}>{game.players}</span>
          <span className="rounded-full bg-cream px-3 py-1 text-xs font-extrabold text-ink-2">{game.duration}</span>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2 px-1 pb-1">
        <Link href={`${game.href}?mode=ai`} className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "w-full px-2")}>
          <Image src={iconSrc("robot")} alt="" width={18} height={18} className="size-4" />
          Đấu máy
        </Link>
        <Link href={`${game.href}?mode=duo`} className={cn(buttonVariants({ size: "sm" }), "w-full px-2")}>
          <Image src={iconSrc("users")} alt="" width={18} height={18} className="size-4" />
          {game.multiLabel}
        </Link>
      </div>
    </article>
  );
}
