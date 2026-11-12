import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";

import { BoardPlay } from "@/components/board/board-play";
import { boardSlugs, getBoardGame } from "@/data/board-games";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return boardSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const game = getBoardGame(slug);
  if (!game) return {};
  return { title: game.title, description: game.description };
}

/** Cache Components: await params trong component con bọc Suspense; BoardPlay đọc ?mode= bằng useSearchParams. */
export default function BoardPage({ params }: { params: Promise<Params> }) {
  return (
    <div className="bg-dots">
      <Suspense fallback={<div className="wrap py-10"><div className="h-[520px] rounded-[24px] bg-line/60" /></div>}>
        <BoardContent params={params} />
      </Suspense>
    </div>
  );
}

async function BoardContent({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const game = getBoardGame(slug);
  if (!game) notFound();
  return <BoardPlay game={game} />;
}
