import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { BoardListCard } from "@/components/board/board-list-card";
import { boardGames } from "@/data/board-games";

export const metadata: Metadata = {
  title: "Cờ & trò dân gian",
  description: "7 trò quen thuộc: đấu với máy 3 mức hoặc 2 người chung máy. Miễn phí, không cần tài khoản.",
};

export default function BoardGamesPage() {
  return (
    <div className="bg-dots">
      <div className="wrap py-10 md:py-14">
        <Link
          href="/#giai-tri"
          className="inline-flex items-center gap-1.5 text-sm font-extrabold text-ink-2 no-underline hover:text-ink"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Trang chủ
        </Link>
        <p className="eyebrow mt-4">Góc giải trí cộng đồng</p>
        <h1 className="mt-2 text-[34px] leading-[1.05] md:text-[52px]">Cờ &amp; trò dân gian, chơi cho vui</h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink-3 md:text-lg">
          7 trò quen thuộc, mỗi trò một bàn riêng. Đấu với máy 3 mức hoặc 2 người chung một máy.
          Miễn phí, không quảng cáo, không cần tài khoản.
        </p>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {boardGames.map((g) => (
            <li key={g.slug}>
              <BoardListCard game={g} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
