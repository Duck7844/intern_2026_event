import type { Tone } from "@/data/games";

export type BoardGame = {
  slug: string;
  href: string;
  title: string;
  description: string;
  /** Dòng meta ngắn trên card trang chủ */
  meta: string;
  players: string;
  duration: string;
  tone: Tone;
  icon: string;
  /** Có chế độ đấu máy */
  ai: boolean;
  /** Nhãn chế độ nhiều người: "2 người" hoặc "Cả nhóm" */
  multiLabel: string;
};

export const boardGames: BoardGame[] = [
  {
    slug: "co-vua",
    href: "/ban-co/co-vua",
    title: "Cờ vua",
    description: "Đấu máy 3 mức hoặc chơi 2 người chung máy. Có gợi ý nước đi.",
    meta: "Đấu máy · 2 người",
    players: "1–2 người",
    duration: "10–30 phút",
    tone: "lilac",
    icon: "chess",
    ai: true,
    multiLabel: "2 người",
  },
  {
    slug: "co-tuong",
    href: "/ban-co/co-tuong",
    title: "Cờ tướng",
    description: "Bàn cờ tướng chuẩn, đấu máy hoặc 2 người. Đủ luật cản mã, cản tượng, lộ mặt tướng.",
    meta: "Đấu máy · 2 người",
    players: "1–2 người",
    duration: "10–30 phút",
    tone: "peach",
    icon: "xiangqi",
    ai: true,
    multiLabel: "2 người",
  },
  {
    slug: "o-an-quan",
    href: "/ban-co/o-an-quan",
    title: "Ô ăn quan",
    description: "Trò dân gian rải sỏi quen thuộc: chọn ô, chọn hướng, ăn liên hoàn.",
    meta: "Đấu máy · 2 người",
    players: "1–2 người",
    duration: "5–15 phút",
    tone: "mint",
    icon: "oanquan",
    ai: true,
    multiLabel: "2 người",
  },
  {
    slug: "co-ca-ro",
    href: "/ban-co/co-ca-ro",
    title: "Cờ ca rô",
    description: "X và O, ai xếp đủ 5 ô trước thì thắng. Tuỳ chọn luật chặn hai đầu.",
    meta: "Đấu máy · 2 người",
    players: "1–2 người",
    duration: "3–10 phút",
    tone: "peri",
    icon: "caro",
    ai: true,
    multiLabel: "2 người",
  },
  {
    slug: "co-vay",
    href: "/ban-co/co-vay",
    title: "Cờ vây",
    description: "Bàn 9×9 cho người mới, 13×13 khi đã quen. Bao vây để chiếm đất.",
    meta: "Đấu máy · 2 người",
    players: "1–2 người",
    duration: "10–25 phút",
    tone: "yellow",
    icon: "go",
    ai: true,
    multiLabel: "2 người",
  },
  {
    slug: "co-lat",
    href: "/ban-co/co-lat",
    title: "Cờ lật",
    description: "Kẹp quân đối thủ để lật thành màu của mình. Học 1 phút, chơi cả đời.",
    meta: "Đấu máy · 2 người",
    players: "1–2 người",
    duration: "5–10 phút",
    tone: "sky",
    icon: "othello",
    ai: true,
    multiLabel: "2 người",
  },
  {
    slug: "co-ty-phu",
    href: "/ban-co/co-ty-phu",
    title: "Cờ tỷ phú Việt",
    description: "Tung xúc xắc, mua đất các thành phố Việt Nam, xây nhà, thu tiền thuê. 2–4 người.",
    meta: "2–4 người",
    players: "1–4 người",
    duration: "15–30 phút",
    tone: "pink",
    icon: "monopoly",
    ai: true,
    multiLabel: "Cả nhóm",
  },
];

export function getBoardGame(slug: string) {
  return boardGames.find((g) => g.slug === slug);
}
