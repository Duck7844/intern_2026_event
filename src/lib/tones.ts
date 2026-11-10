import type { Tone } from "@/data/games";

/**
 * Map tone -> class Tailwind. Tách riêng để các card, badge, nút dùng chung một bảng màu.
 * Viết class đầy đủ (không nối chuỗi) để Tailwind quét được.
 */
export const toneBg: Record<Tone, string> = {
  peach: "bg-peach/45",
  mint: "bg-mint/45",
  yellow: "bg-yellow/60",
  peri: "bg-peri/45",
  pink: "bg-pink/45",
  lilac: "bg-lilac/55",
  sky: "bg-info-bg",
};

export const toneSolid: Record<Tone, string> = {
  peach: "bg-peach",
  mint: "bg-mint",
  yellow: "bg-yellow",
  peri: "bg-peri",
  pink: "bg-pink",
  lilac: "bg-lilac",
  sky: "bg-[#9fd3f5]",
};

/** Nút "Chơi ngay" trên card: nền pastel đặc, viền ink, bóng cứng. */
export const toneButton: Record<Tone, string> = {
  peach: "bg-peach hover:bg-peach/80",
  mint: "bg-mint hover:bg-mint/80",
  yellow: "bg-yellow hover:bg-yellow-deep",
  peri: "bg-peri hover:bg-peri/80",
  pink: "bg-pink hover:bg-pink/80",
  lilac: "bg-lilac hover:bg-lilac/80",
  sky: "bg-[#9fd3f5] hover:bg-[#9fd3f5]/80",
};
