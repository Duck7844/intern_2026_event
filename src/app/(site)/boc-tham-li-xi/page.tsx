import type { Metadata } from "next";

import { LuckyEnvelopesGame } from "@/components/play/lucky-envelopes";

export const metadata: Metadata = {
  title: "Bốc thăm lì xì",
  description: "Mỗi người chạm chọn một bao lì xì đỏ, mở ra là biết lộc. Tự nhập giải và số lượng.",
};

export default function Page() {
  return (
    <div className="bg-dots">
      <LuckyEnvelopesGame />
    </div>
  );
}
