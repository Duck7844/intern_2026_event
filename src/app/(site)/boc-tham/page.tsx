import type { Metadata } from "next";

import { LotteryGame } from "@/components/play/lottery";

export const metadata: Metadata = {
  title: "Bốc thăm trúng thưởng",
  description: "Bốc số theo vé, số ghế hoặc bốc tên ngẫu nhiên, công bố người trúng trên màn lớn.",
};

export default function Page() {
  return (
    <div className="bg-dots">
      <LotteryGame />
    </div>
  );
}
