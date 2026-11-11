import { DEMO_PLAY, DEMO_ROOM } from "@/components/games/game-detail-hero";
import { DemoButton } from "@/components/site/demo-button";
import type { GameDetail } from "@/data/game-details";

/** Thanh 2 nút dính đáy màn hình, chỉ hiện trên mobile. */
export function StickyBottomBar({ detail }: { detail: GameDetail }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-20 border-t-2 border-line bg-cream/95 backdrop-blur-[8px] md:hidden">
      <div className="wrap grid grid-cols-2 gap-3 py-3">
        <DemoButton size="sm" className="w-full" {...DEMO_PLAY}>
          {detail.modes[0].action === "play" ? "Chơi ngay" : detail.modes[0].title}
        </DemoButton>
        <DemoButton variant="ghost" size="sm" className="w-full" {...DEMO_ROOM}>
          {detail.modes[1].action === "room" ? "Tạo phòng" : detail.modes[1].title}
        </DemoButton>
      </div>
    </div>
  );
}
