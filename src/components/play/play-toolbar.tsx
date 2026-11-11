"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { toast } from "sonner";

import { Button, buttonVariants } from "@/components/ui/button";
import { playTabs } from "@/data/play";
import { iconSrc } from "@/lib/assets";
import { cn } from "@/lib/utils";

type PlayToolbarProps = {
  /** id của sân khấu để bật fullscreen */
  stageId: string;
  onEdit: () => void;
};

/** Thanh công cụ dưới header của 4 trang chơi: tab trái, 3 nút phải. */
export function PlayToolbar({ stageId, onEdit }: PlayToolbarProps) {
  const pathname = usePathname();

  async function present() {
    const el = document.getElementById(stageId);
    if (!el?.requestFullscreen) {
      toast("Trình duyệt không hỗ trợ toàn màn hình.");
      return;
    }
    try {
      await el.requestFullscreen();
    } catch {
      toast("Không bật được toàn màn hình.");
    }
  }

  return (
    <div className="border-b-2 border-line bg-white">
      <div className="wrap flex flex-wrap items-center gap-3 py-3 md:justify-between">
        <nav aria-label="Chọn trò chơi" className="flex flex-wrap gap-2">
          {playTabs.map((tab) => {
            const active = pathname === tab.href;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "inline-flex h-11 items-center gap-2 rounded-full px-4 text-sm font-extrabold no-underline transition-colors",
                  active ? "bg-ink text-white" : "bg-cream text-ink-2 hover:bg-line",
                )}
              >
                <Image src={iconSrc(tab.icon)} alt="" width={20} height={20} className="size-5" />
                {tab.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex flex-wrap gap-2 md:justify-end">
          <Button variant="ghost" size="sm" onClick={onEdit}>
            <Image src={iconSrc("sliders")} alt="" width={20} height={20} className="size-5" />
            Sửa nhanh
          </Button>
          <Button variant="ghost" size="sm" onClick={present}>
            <Image src={iconSrc("frame")} alt="" width={20} height={20} className="size-5" />
            Trình chiếu
          </Button>
          <Link href="/#tu-van" className={buttonVariants({ size: "sm" })}>
            <Image src={iconSrc("party")} alt="" width={20} height={20} className="size-5" />
            Tư vấn cho sự kiện
          </Link>
        </div>
      </div>
    </div>
  );
}
