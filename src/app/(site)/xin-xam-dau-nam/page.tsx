import type { Metadata } from "next";

import { FortuneSticksGame } from "@/components/play/fortune-sticks";

export const metadata: Metadata = {
  title: "Xin xăm đầu năm",
  description: "Lắc ống xăm trên màn hình, mở quẻ đầu năm với thơ, lời giải và lời chúc.",
};

export default function Page() {
  return (
    <div className="bg-dots">
      <FortuneSticksGame />
    </div>
  );
}
