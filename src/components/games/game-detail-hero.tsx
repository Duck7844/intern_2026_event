import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Gauge, Users } from "lucide-react";

import { DemoButton } from "@/components/site/demo-button";
import { Chip } from "@/components/ui/chip";
import type { GameDetail } from "@/data/game-details";
import type { Game } from "@/data/games";
import { toneBg, toneButton } from "@/lib/tones";
import { cn } from "@/lib/utils";
import { isSvg } from "@/lib/assets";

type GameDetailHeroProps = { game: Game; detail: GameDetail };

export const DEMO_PLAY = { message: "Chế độ chơi thử sẽ có ở giai đoạn sau.", description: "Bản demo chỉ dựng giao diện." };
export const DEMO_ROOM = { message: "Tạo phòng cho sự kiện cần đăng nhập và backend.", description: "Sẽ nối ở giai đoạn sau." };

/** Phần đầu trang chi tiết: back link, badge, tiêu đề, mô tả, meta, 2 CTA; bên phải ô minh hoạ. */
export function GameDetailHero({ game, detail }: GameDetailHeroProps) {
  const heroImage = detail.image ?? game.image;
  return (
    <section className="wrap grid items-start gap-10 py-10 md:py-14 lg:grid-cols-[1.2fr_1fr] lg:gap-14">
      <div className="flex flex-col items-start gap-5">
        <Link
          href="/#game"
          className="inline-flex items-center gap-1.5 text-sm font-extrabold text-ink-2 no-underline hover:text-ink"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Tất cả trò chơi
        </Link>

        <Chip as="span" size="sm" tone={game.tone}>
          {detail.kind}
        </Chip>

        <h1 className="text-[36px] leading-[1.05] md:text-[52px]">{game.title}</h1>

        <p className="text-base leading-relaxed text-ink-3 md:text-lg">{detail.longDescription}</p>

        <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-extrabold text-ink-2">
          <li className="inline-flex items-center gap-1.5">
            <Users className="size-4 text-ink-4" aria-hidden="true" />
            {game.players} người
          </li>
          <li className="inline-flex items-center gap-1.5">
            <Clock className="size-4 text-ink-4" aria-hidden="true" />
            {game.duration}
          </li>
          <li className="inline-flex items-center gap-1.5">
            <Gauge className="size-4 text-ink-4" aria-hidden="true" />
            {detail.difficulty}
          </li>
        </ul>

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <DemoButton size="lg" className={cn("sm:min-w-44", toneButton[game.tone])} {...DEMO_PLAY}>
            {detail.modes[0].title}
          </DemoButton>
          <DemoButton variant="ghost" size="lg" className="sm:min-w-44" {...DEMO_ROOM}>
            {detail.modes[1].title}
          </DemoButton>
        </div>
        <p className="text-xs font-bold text-ink-3">
          Chơi thử miễn phí, không cần tài khoản · tạo phòng cho sự kiện cần đăng nhập
        </p>
      </div>

      <div
        className={cn(
          "relative aspect-square w-full overflow-hidden rounded-[28px] border-2 border-ink shadow-[0_6px_0_0_var(--color-ink)] lg:aspect-[4/3]",
          toneBg[game.tone],
        )}
      >
        <Image
          src={heroImage}
          alt=""
          fill
          priority
          unoptimized={isSvg(heroImage)}
          sizes="(min-width: 1024px) 40vw, 100vw"
          className={isSvg(heroImage) ? "object-contain p-8" : "object-cover"}
        />
      </div>
    </section>
  );
}
