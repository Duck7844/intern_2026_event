"use client";

import * as React from "react";
import Image from "next/image";

import { GameCard } from "@/components/games/game-card";
import { Chip } from "@/components/ui/chip";
import { type CategoryId, categories, games } from "@/data/games";
import { iconSrc } from "@/lib/assets";

/**
 * Section #game: tiêu đề có icon xúc xắc, chip lọc theo dịp, lưới card game.
 * Lọc hoàn toàn client-side trên danh sách tĩnh.
 */
export function GameGrid() {
  const [active, setActive] = React.useState<CategoryId>("all");

  const visible = React.useMemo(
    () => (active === "all" ? games : games.filter((g) => g.categories.includes(active))),
    [active],
  );

  return (
    <section id="game" className="wrap scroll-mt-20 py-14 md:py-20">
      <div className="mb-6 flex items-start gap-4 md:mb-8">
        <span className="hidden size-14 shrink-0 items-center justify-center rounded-2xl border-2 border-line bg-mint/50 sm:inline-flex">
          <Image src={iconSrc("dice")} alt="" width={40} height={40} className="size-9" />
        </span>
        <div>
          <h2 className="text-[28px] leading-[1.1] md:text-[38px]">Hôm nay chơi gì?</h2>
          <p className="mt-1.5 text-base text-ink-3 md:text-lg">
            Chọn theo dịp: hội nghị, team building, phá băng, trao thưởng
          </p>
        </div>
      </div>

      <div
        role="group"
        aria-label="Lọc game theo dịp"
        className="-mx-4 mb-8 flex gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:flex-wrap md:px-0"
      >
        {categories.map((c) => (
          <Chip
            key={c.id}
            active={active === c.id}
            onClick={() => setActive(c.id)}
            className="shrink-0"
          >
            {c.label}
          </Chip>
        ))}
      </div>

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5" aria-live="polite">
        {visible.map((game) => (
          <li key={game.slug}>
            <GameCard game={game} />
          </li>
        ))}
      </ul>
    </section>
  );
}
