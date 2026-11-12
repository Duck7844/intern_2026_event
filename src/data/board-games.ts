import type { Tone } from "@/data/games";

export type BoardKind = "chess" | "xiangqi" | "oanquan" | "caro" | "go" | "othello" | "tycoon";

export type Rule = { title: string; description: string };

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
  /** Ảnh bàn cờ (SVG) cho card nhỏ ở trang chủ */
  image: string;
  /** Tranh minh hoạ cho card lớn ở /ban-co */
  thumb: string;
  /** Ảnh nền sân khấu ở trang chơi */
  bg: string;
  /** Icon ô vuông cạnh tiêu đề trang chơi */
  icon: string;
  kind: BoardKind;
  /** Có chế độ đấu máy */
  ai: boolean;
  /** Nhãn chế độ nhiều người: "2 người" hoặc "Cả nhóm" */
  multiLabel: string;
  /** Tên 2 bên: [bên đi trước, bên đi sau] */
  sides: [string, string];
  /** Nhãn lựa chọn "Bạn đi": [trước, sau] */
  firstMove: [string, string];
  rules: [Rule, Rule, Rule];
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
    image: "/design/web-img/board-chess.svg",
    thumb: "/design/web-img/thumbs/chess-400.webp",
    bg: "/design/web-img/co/chess-bg.webp",
    icon: "crown",
    kind: "chess",
    ai: true,
    multiLabel: "2 người",
    sides: ["Trắng", "Đen"],
    firstMove: ["Trước · Trắng", "Sau · Đen"],
    rules: [
      { title: "Chọn cách chơi", description: "Đấu máy (chọn mức khó) hoặc 2 người chung máy." },
      { title: "Chạm quân, chạm ô", description: "Chấm tròn hiện các nước đi hợp lệ; bấm nhầm thì chạm quân khác." },
      { title: "Chiếu hết để thắng", description: "Có đi lại (khi đấu máy), xin thua, xem lại các nước đã đi." },
    ],
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
    image: "/design/web-img/board-xiangqi.svg",
    thumb: "/design/web-img/thumbs/xiangqi-400.webp",
    bg: "/design/web-img/co/xiangqi-bg.webp",
    icon: "shield",
    kind: "xiangqi",
    ai: true,
    multiLabel: "2 người",
    sides: ["Đỏ", "Đen"],
    firstMove: ["Trước · Đỏ", "Sau · Đen"],
    rules: [
      { title: "Chọn phe", description: "Chọn phe Đỏ hoặc Đen khi đấu máy, Đỏ luôn đi trước." },
      { title: "Chạm quân, chạm điểm", description: "Các nước hợp lệ hiện chấm tròn, nước vừa đi được tô vàng." },
      { title: "Chiếu bí để thắng", description: "Lặp lại 3 lần hoặc 60 nước không ăn quân thì hoà." },
    ],
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
    image: "/design/web-img/board-oanquan.svg",
    thumb: "/design/web-img/thumbs/mandarin-squares-400.webp",
    bg: "/design/web-img/co/oanquan-bg.webp",
    icon: "rock",
    kind: "oanquan",
    ai: true,
    multiLabel: "2 người",
    sides: ["Người 1 · hàng dưới", "Người 2 · hàng trên"],
    firstMove: ["Đi trước", "Đi sau"],
    rules: [
      { title: "Chọn ô của mình", description: "Hàng dưới là của bạn, ô quan ở hai đầu không được bốc." },
      { title: "Chọn hướng rải", description: "Rải trái hoặc rải phải, mỗi ô một viên." },
      { title: "Ăn liên hoàn", description: "Ô trống rồi đến ô có quân thì ăn; quan tính 10 điểm, dân 1 điểm." },
    ],
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
    image: "/design/web-img/board-caro.svg",
    thumb: "/design/web-img/thumbs/gomoku-400.webp",
    bg: "/design/web-img/co/caro-bg.webp",
    icon: "target",
    kind: "caro",
    ai: true,
    multiLabel: "2 người",
    sides: ["X", "O"],
    firstMove: ["Trước · X", "Sau · O"],
    rules: [
      { title: "Chọn ô trống", description: "Bàn 15×15, chạm ô để đặt quân, X đi trước." },
      { title: "Xếp 5 quân liền", description: "Ngang, dọc hoặc chéo đủ 5 là thắng." },
      { title: "Luật chặn hai đầu", description: "Bật tuỳ chọn thì hàng 5 bị chặn cả hai đầu không tính thắng." },
    ],
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
    image: "/design/web-img/board-go.svg",
    thumb: "/design/web-img/thumbs/go-400.webp",
    bg: "/design/web-img/co/go-bg.webp",
    icon: "globe",
    kind: "go",
    ai: true,
    multiLabel: "2 người",
    sides: ["Đen", "Trắng"],
    firstMove: ["Trước · Đen", "Sau · Trắng"],
    rules: [
      { title: "Đặt quân lên giao điểm", description: "Đen đi trước, mỗi lượt một quân, không di chuyển quân đã đặt." },
      { title: "Bao vây để bắt", description: "Nhóm quân hết khí (ô trống kề bên) thì bị nhấc khỏi bàn." },
      { title: "Chiếm đất nhiều hơn", description: "Cả hai bỏ lượt liên tiếp thì đếm đất, bên nhiều hơn thắng." },
    ],
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
    image: "/design/web-img/board-othello.svg",
    thumb: "/design/web-img/thumbs/othello-400.webp",
    bg: "/design/web-img/co/othello-bg.webp",
    icon: "puzzle",
    kind: "othello",
    ai: true,
    multiLabel: "2 người",
    sides: ["Đen", "Trắng"],
    firstMove: ["Trước · Đen", "Sau · Trắng"],
    rules: [
      { title: "Đặt quân kẹp đối thủ", description: "Nước đi hợp lệ phải kẹp ít nhất một quân đối phương." },
      { title: "Lật quân", description: "Mọi quân bị kẹp theo hàng ngang, dọc, chéo đổi sang màu của bạn." },
      { title: "Đầy bàn thì đếm", description: "Hết nước đi hoặc đầy 64 ô, bên nhiều quân hơn thắng." },
    ],
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
    image: "/design/web-img/board-typhu.svg",
    thumb: "/design/web-img/thumbs/tycoon-400.webp",
    bg: "/design/web-img/co/typhu-bg.webp",
    icon: "money",
    kind: "tycoon",
    ai: true,
    multiLabel: "Cả nhóm",
    sides: ["Đỏ", "Xanh"],
    firstMove: ["Bạn đi trước", "Máy đi trước"],
    rules: [
      { title: "Chọn 2–4 người", description: "Đấu với 1–3 máy, hoặc cả nhóm chơi chung một máy." },
      { title: "Tung xúc xắc, mua đất", description: "Dừng ở ô chưa chủ thì được mua; ô có chủ thì trả tiền thuê." },
      { title: "Xây nhà, làm giàu", description: "Đủ cặp màu thì xây nhà; người giàu nhất sau 30 vòng thắng." },
    ],
  },
];

export function getBoardGame(slug: string) {
  return boardGames.find((g) => g.slug === slug);
}

export const boardSlugs = boardGames.map((g) => g.slug);

/** Ô của bàn Cờ tỷ phú Việt theo vòng (24 ô), bắt đầu từ góc dưới phải ngược chiều kim đồng hồ. */
export const tycoonCells: { name: string; price?: number; tone?: Tone; icon?: string }[] = [
  { name: "Khởi hành", icon: "finish" },
  { name: "Hạ Long", price: 100, tone: "sky" },
  { name: "Thuế", icon: "money-fly" },
  { name: "Sa Pa", price: 110, tone: "sky" },
  { name: "Cơ hội", icon: "card" },
  { name: "Ninh Bình", price: 120, tone: "mint" },
  { name: "Nhà giam", icon: "lock" },
  { name: "Hải Phòng", price: 120, tone: "mint" },
  { name: "Ga Hà Nội", price: 200, icon: "train" },
  { name: "Huế", price: 140, tone: "pink" },
  { name: "Lễ hội", icon: "party" },
  { name: "Hội An", price: 160, tone: "pink" },
  { name: "Bến xe", icon: "bus" },
  { name: "Đà Nẵng", price: 180, tone: "yellow" },
  { name: "Nha Trang", price: 200, tone: "yellow" },
  { name: "Cơ hội", icon: "card" },
  { name: "Đà Lạt", price: 220, tone: "peach" },
  { name: "Vũng Tàu", price: 240, tone: "peach" },
  { name: "Vào tù", icon: "cuffs" },
  { name: "Cần Thơ", price: 260, tone: "lilac" },
  { name: "Phú Quốc", price: 280, tone: "lilac" },
  { name: "Ga Sài Gòn", price: 200, icon: "train" },
  { name: "Sài Gòn", price: 300, tone: "peri" },
  { name: "Hà Nội", price: 320, tone: "peri" },
];
