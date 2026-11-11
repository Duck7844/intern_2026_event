import type { Metadata } from "next";

import { WheelGame } from "@/components/play/wheel";

export const metadata: Metadata = {
  title: "Vòng quay may mắn",
  description: "Nhập tên người hoặc phần quà, bấm quay và chiếu lên màn lớn. Miễn phí, không cần tài khoản.",
};

export default function Page() {
  return (
    <div className="bg-dots">
      <WheelGame />
    </div>
  );
}
