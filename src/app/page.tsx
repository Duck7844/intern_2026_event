import { BoardGamesSection } from "@/components/home/board-games-section";
import { Business } from "@/components/home/business";
import { ConsultForm } from "@/components/home/consult-form";
import { GameGrid } from "@/components/home/game-grid";
import { Hero } from "@/components/home/hero";

/**
 * Trang chủ (màn hình S01). Thứ tự section theo site tham chiếu:
 * Hero -> #game -> #su-kien (+ hệ sinh thái) -> #giai-tri -> #tu-van.
 */
export default function HomePage() {
  return (
    <div className="bg-dots">
      <Hero />
      <GameGrid />
      <Business />
      <BoardGamesSection />
      <ConsultForm />
    </div>
  );
}
