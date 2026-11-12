"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { boardGames } from "@/data/board-games";
import { toneSolid } from "@/lib/tones";
import { cn } from "@/lib/utils";

/** Thanh tab 7 trò cờ + nút quay về Góc giải trí. Tab active tô màu theo tone của trò. */
export function BoardToolbar() {
  const pathname = usePathname();
  return (
    <div className="wrap -mx-4 flex items-center gap-2 overflow-x-auto px-4 pt-6 pb-2 md:mx-auto md:flex-wrap md:overflow-visible md:px-6">
      <Link
        href="/ban-co"
        className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full bg-ink px-4 text-sm font-extrabold text-white no-underline shadow-hard-sm hover:bg-ink-2"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Góc giải trí
      </Link>
      {boardGames.map((g) => {
        const active = pathname === g.href;
        return (
          <Link
            key={g.slug}
            href={g.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "inline-flex h-10 shrink-0 items-center rounded-full border-2 px-4 text-sm font-extrabold no-underline transition-colors",
              active ? cn("border-ink text-ink", toneSolid[g.tone]) : "border-line bg-white text-ink-2 hover:border-ink-4",
            )}
          >
            {g.title.replace(" Việt", "")}
          </Link>
        );
      })}
    </div>
  );
}
