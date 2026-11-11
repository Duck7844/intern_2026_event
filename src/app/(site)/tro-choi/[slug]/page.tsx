import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";

import { GameDetailHero } from "@/components/games/game-detail-hero";
import {
  CustomContentCta,
  GameFaq,
  HowToPlayAndFit,
  ModeCards,
  RelatedGames,
  UseCases,
} from "@/components/games/game-detail-sections";
import { StickyBottomBar } from "@/components/games/sticky-bottom-bar";
import { detailSlugs, getGamePage } from "@/data/game-details";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return detailSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const page = getGamePage(slug);
  if (!page) return {};
  return { title: page.game.title, description: page.game.description };
}

/**
 * Cache Components: page không await params trực tiếp mà đẩy xuống component con
 * bọc trong <Suspense>, để App Shell của route vẫn instant khi điều hướng.
 */
export default function GameDetailPage({ params }: { params: Promise<Params> }) {
  return (
    <div className="bg-dots">
      <Suspense fallback={<GameDetailSkeleton />}>
        <GameDetailContent params={params} />
      </Suspense>
    </div>
  );
}

async function GameDetailContent({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const page = getGamePage(slug);
  if (!page) notFound();

  const { game, detail, related } = page;

  return (
    <>
      <GameDetailHero game={game} detail={detail} />
      <ModeCards detail={detail} />
      <HowToPlayAndFit game={game} detail={detail} />
      <UseCases game={game} detail={detail} />
      <GameFaq game={game} />
      <CustomContentCta />
      <RelatedGames games={related} />
      <StickyBottomBar detail={detail} />
    </>
  );
}

function GameDetailSkeleton() {
  return (
    <div className="wrap grid gap-10 py-10 md:py-14 lg:grid-cols-[1.2fr_1fr] lg:gap-14" aria-hidden="true">
      <div className="flex flex-col gap-5">
        <div className="h-4 w-28 rounded-full bg-line" />
        <div className="h-7 w-32 rounded-full bg-line" />
        <div className="h-12 w-3/4 rounded-2xl bg-line" />
        <div className="h-24 w-full rounded-2xl bg-line/70" />
        <div className="flex gap-3">
          <div className="h-14 w-44 rounded-full bg-line" />
          <div className="h-14 w-44 rounded-full bg-line/70" />
        </div>
      </div>
      <div className="aspect-[4/3] w-full rounded-[28px] bg-line/70" />
    </div>
  );
}
