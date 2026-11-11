import Image from "next/image";
import Link from "next/link";

import type { BoardGame } from "@/data/board-games";
import { toneSolid } from "@/lib/tones";
import { cn } from "@/lib/utils";

type BoardGameCardProps = {
  game: BoardGame;
  className?: string;
};

/** Card nhỏ ở "Góc giải trí" trang chủ: ảnh bàn cờ + tên + meta. */
export function BoardGameCard({ game, className }: BoardGameCardProps) {
  return (
    <Link
      href={game.href}
      className={cn(
        "group flex flex-col gap-2.5 no-underline outline-none focus-visible:ring-4 focus-visible:ring-focus rounded-2xl",
        className,
      )}
    >
      <div
        className={cn(
          "relative aspect-square overflow-hidden rounded-2xl border-2 border-line transition-[transform,box-shadow] duration-200 group-hover:-translate-y-0.5 group-hover:shadow-soft",
          toneSolid[game.tone],
        )}
      >
        <Image
          src={game.image}
          alt=""
          fill
          unoptimized
          sizes="(min-width: 1024px) 14vw, (min-width: 640px) 33vw, 50vw"
          className="object-cover"
        />
      </div>
      <div className="px-0.5">
        <h3 className="text-[15px] leading-tight font-extrabold text-ink">{game.title}</h3>
        <p className="mt-0.5 text-xs font-bold text-ink-3">{game.meta}</p>
      </div>
    </Link>
  );
}
