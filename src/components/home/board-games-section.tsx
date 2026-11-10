import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { BoardGameCard } from "@/components/games/board-game-card";
import { SectionHeading } from "@/components/site/section-heading";
import { buttonVariants } from "@/components/ui/button";
import { boardGames } from "@/data/board-games";

/** Section #giai-tri: cờ & trò dân gian. */
export function BoardGamesSection() {
  return (
    <section id="giai-tri" className="wrap scroll-mt-20 py-14 md:py-20">
      <SectionHeading
        eyebrow="Góc giải trí cộng đồng"
        title="Cờ & trò dân gian, chơi cho vui"
        description="Miễn phí cho mọi người: đấu với máy, chơi 2 người chung máy hoặc gửi link cho bạn."
        aside={
          <Link href="/ban-co" className={buttonVariants({ variant: "ghost", size: "sm" })}>
            Xem tất cả <ArrowRight />
          </Link>
        }
      />
      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
        {boardGames.map((g) => (
          <li key={g.slug}>
            <BoardGameCard game={g} />
          </li>
        ))}
      </ul>
    </section>
  );
}
