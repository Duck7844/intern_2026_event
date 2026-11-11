import Image from "next/image";
import Link from "next/link";
import { Clock, Users } from "lucide-react";

import { Chip } from "@/components/ui/chip";
import type { Game } from "@/data/games";
import { isSvg } from "@/lib/assets";
import { toneBg, toneButton } from "@/lib/tones";
import { cn } from "@/lib/utils";

type GameCardProps = {
  game: Game;
  className?: string;
};

/**
 * Card game ở trang chủ và block "Chơi tiếp game khác" ở trang chi tiết.
 * Toàn bộ card là một link, nút "Chơi ngay" chỉ là phần nhấn mạnh.
 * Ảnh webp phủ kín ô (object-cover); ảnh SVG có nền trong suốt thì đặt trên nền pastel (object-contain).
 */
export function GameCard({ game, className }: GameCardProps) {
  const svg = isSvg(game.image);
  return (
    <Link
      href={game.href}
      className={cn(
        "group flex h-full flex-col rounded-card border-2 border-line bg-white p-3 no-underline transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-soft focus-visible:ring-4 focus-visible:ring-focus outline-none",
        className,
      )}
    >
      <div
        className={cn(
          "relative aspect-[4/3] overflow-hidden rounded-2xl border-2 border-line",
          toneBg[game.tone],
        )}
      >
        <Image
          src={game.image}
          alt=""
          fill
          unoptimized={svg}
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className={cn(
            "transition-transform duration-300 group-hover:scale-[1.03]",
            svg ? "object-contain p-4" : "object-cover",
          )}
        />
        <Chip
          as="span"
          size="sm"
          tone="neutral"
          className="absolute top-3 left-3 border-white/70 bg-white/90 text-ink-2 backdrop-blur-sm"
        >
          {game.badge}
        </Chip>
      </div>

      <div className="flex flex-1 flex-col gap-2 px-1 pt-4 pb-1">
        <h3 className="text-[17px] leading-snug font-extrabold">{game.title}</h3>
        <p className="line-clamp-3 text-sm leading-relaxed text-ink-3">{game.description}</p>
        <p className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 pt-2 text-[13px] font-bold text-ink-2">
          <span className="inline-flex items-center gap-1">
            <Users className="size-4 text-ink-4" aria-hidden="true" />
            {game.players}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="size-4 text-ink-4" aria-hidden="true" />
            {game.duration}
          </span>
        </p>
      </div>

      <span
        className={cn(
          "mt-3 inline-flex h-11 w-full items-center justify-center rounded-full border-2 border-ink text-sm font-extrabold text-ink shadow-hard transition-colors group-active:translate-y-[2px] group-active:shadow-none",
          toneButton[game.tone],
        )}
      >
        Chơi ngay
      </span>
    </Link>
  );
}
