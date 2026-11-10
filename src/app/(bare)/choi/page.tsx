import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";

import { JoinRoomForm } from "@/components/rooms/join-room-form";

export const metadata: Metadata = {
  title: "Vào phòng chơi",
  description: "Nhập mã PIN hoặc mã phòng đang hiện trên màn hình lớn để vào chơi.",
};

/** Màn hình vào phòng: tối giản, nội dung căn giữa, không card bao ngoài (theo site tham chiếu). */
export default function JoinRoomPage() {
  return (
    <div className="wrap flex flex-1 flex-col items-center justify-center py-12 md:py-20">
      <div className="w-full max-w-sm text-center">
        <h1 className="text-[30px] leading-tight md:text-[36px]">Vào phòng chơi</h1>
        <p className="mt-2 text-sm leading-relaxed text-ink-3">
          Nhập mã PIN 6 số hoặc mã phòng (ví dụ WYS77K) đang hiện trên màn hình lớn.
        </p>
        <div className="mt-6">
          {/* useSearchParams cần Suspense khi prerender tĩnh */}
          <Suspense fallback={<div className="h-16 rounded-2xl border-2 border-line-2 bg-white md:h-20" />}>
            <JoinRoomForm />
          </Suspense>
        </div>
        <p className="mt-8 text-sm text-ink-3">
          Chưa có mã? Người tổ chức có thể{" "}
          <Link href="/#game" className="font-extrabold text-link">
            chọn game và mở phòng
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
