/**
 * Danh mục game hiển thị ở trang chủ và dùng làm nguồn cho trang chi tiết (phase 3).
 * Text viết lại bằng lời của dự án, không copy nguyên văn site tham chiếu.
 */

export type CategoryId = "all" | "conference" | "teambuilding" | "friends" | "icebreaker" | "reward";

export type Category = { id: CategoryId; label: string };

export const categories: Category[] = [
  { id: "all", label: "Tất cả" },
  { id: "conference", label: "Hội nghị & YEP" },
  { id: "teambuilding", label: "Team building" },
  { id: "friends", label: "Nhóm bạn" },
  { id: "icebreaker", label: "Phá băng" },
  { id: "reward", label: "Trao thưởng" },
];

/** Tông màu pastel dùng cho ô minh hoạ và nút của card. */
export type Tone = "peach" | "mint" | "yellow" | "peri" | "pink" | "lilac" | "sky";

export type Game = {
  slug: string;
  /** Trang đích khi bấm vào card / nút Chơi ngay */
  href: string;
  title: string;
  description: string;
  /** Nhãn dịp hiện trên badge của card, ví dụ "Hội nghị · Year-end" */
  badge: string;
  categories: Exclude<CategoryId, "all">[];
  players: string;
  duration: string;
  tone: Tone;
  /** Ảnh minh hoạ (web-img) */
  image: string;
  /** Tên icon (fallback / dùng ở collage), xem lib/assets.ts */
  icon: string;
  /** detail: có trang /tro-choi/[slug]; play: trang chơi trực tiếp */
  kind: "detail" | "play";
};

export const games: Game[] = [
  {
    slug: "do-vui-trac-nghiem",
    image: "/design/web-img/quiz.webp",
    href: "/tro-choi/do-vui-trac-nghiem",
    title: "Đố vui trắc nghiệm",
    description:
      "Câu hỏi hiện trên màn chiếu, cả hội trường chọn đáp án bằng điện thoại và đua điểm trên bảng xếp hạng.",
    badge: "Hội nghị · Year-end",
    categories: ["conference", "teambuilding"],
    players: "2–300",
    duration: "5–15 phút",
    tone: "peach",
    icon: "quiz",
    kind: "detail",
  },
  {
    slug: "duoi-hinh-bat-chu",
    image: "/design/web-img/duoi-hinh.webp",
    href: "/tro-choi/duoi-hinh-bat-chu",
    title: "Đuổi hình bắt chữ",
    description:
      "Đoán cụm từ từ hình ghép trên màn lớn, gõ đáp án trên điện thoại. Có thể tạo câu đố riêng về thương hiệu.",
    badge: "Team building",
    categories: ["teambuilding", "friends"],
    players: "2–300",
    duration: "5–10 phút",
    tone: "mint",
    icon: "picture-word",
    kind: "detail",
  },
  {
    slug: "doan-gia",
    image: "/design/web-img/doan-gia.webp",
    href: "/tro-choi/doan-gia",
    title: "Đoán giá đúng",
    description:
      "Chiếu ảnh sản phẩm thật, người chơi đoán giá trên điện thoại. Cách nhẹ nhàng để khách nhớ sản phẩm.",
    badge: "Hội nghị · Gala",
    categories: ["conference"],
    players: "2–300",
    duration: "3–8 phút",
    tone: "yellow",
    icon: "price",
    kind: "detail",
  },
  {
    slug: "binh-chon",
    image: "/design/web-img/binh-chon.webp",
    href: "/tro-choi/binh-chon",
    title: "Bình chọn trực tiếp",
    description:
      "Hỏi ý kiến cả hội trường, mọi người bấm chọn trên điện thoại, biểu đồ cập nhật ngay trên màn chiếu.",
    badge: "Tương tác hội trường",
    categories: ["conference"],
    players: "2–300",
    duration: "1–3 phút",
    tone: "peri",
    icon: "vote",
    kind: "detail",
  },
  {
    slug: "word-cloud",
    image: "/design/web-img/word-cloud.webp",
    href: "/tro-choi/word-cloud",
    title: "Word Cloud",
    description:
      "Mỗi người gửi vài từ từ điện thoại, từ được nhiều người chọn sẽ to dần trên màn chiếu.",
    badge: "Phá băng",
    categories: ["icebreaker", "conference"],
    players: "3–300",
    duration: "2–5 phút",
    tone: "pink",
    icon: "word-cloud",
    kind: "detail",
  },
  {
    slug: "ai-la-gian-diep",
    image: "/design/web-img/gian-diep.webp",
    href: "/tro-choi/ai-la-gian-diep",
    title: "Ai là gián điệp",
    description:
      "Chuyền một điện thoại, mô tả từ khoá rồi bỏ phiếu tìm gián điệp. Hợp nhóm 4 đến 12 người.",
    badge: "Team building",
    categories: ["teambuilding", "friends", "icebreaker"],
    players: "4–12",
    duration: "10–20 phút",
    tone: "lilac",
    icon: "spy",
    kind: "detail",
  },
  {
    slug: "bingo-su-kien",
    image: "/design/web-img/bingo.webp",
    href: "/tro-choi/bingo-su-kien",
    title: "Bingo sự kiện",
    description:
      "Mỗi người một bảng “Tìm người…”, đi gặp đồng nghiệp và khách mời để đánh dấu ô. Hợp networking.",
    badge: "Year-end · Gala",
    categories: ["conference", "icebreaker"],
    players: "5–300",
    duration: "5–15 phút",
    tone: "yellow",
    icon: "bingo",
    kind: "detail",
  },
  {
    slug: "hai-su-that-mot-loi-noi-doi",
    image: "/design/web-img/hai-su-that.webp",
    href: "/tro-choi/hai-su-that-mot-loi-noi-doi",
    title: "Hai sự thật, một lời nói dối",
    description:
      "Mỗi người kể 3 điều về mình, cả phòng đoán câu nào là nói dối. Cách nhanh để hiểu nhau hơn.",
    badge: "Phá băng",
    categories: ["icebreaker", "friends"],
    players: "3–30",
    duration: "5–15 phút",
    tone: "peach",
    icon: "two-truths",
    kind: "detail",
  },
  {
    slug: "ve-va-doan",
    image: "/design/web-img/ve-doan.webp",
    href: "/tro-choi/ve-va-doan",
    title: "Vẽ và đoán",
    description:
      "Một người vẽ trên điện thoại, nét vẽ hiện lên màn chiếu, cả nhóm thi đoán. Vui cho team nhỏ.",
    badge: "Team building",
    categories: ["teambuilding", "friends"],
    players: "3–12",
    duration: "5–15 phút",
    tone: "sky",
    icon: "draw",
    kind: "detail",
  },
  {
    slug: "vong-quay",
    image: "/design/web-img/vong-quay.webp",
    href: "/vong-quay",
    title: "Vòng quay may mắn",
    description:
      "Nhập tên người hoặc phần quà, bấm quay và chiếu lên màn lớn. Miễn phí, không cần tài khoản.",
    badge: "Trao thưởng",
    categories: ["reward"],
    players: "Không giới hạn",
    duration: "1–10 phút",
    tone: "peach",
    icon: "wheel",
    kind: "play",
  },
  {
    slug: "boc-tham",
    image: "/design/web-img/boc-tham.webp",
    href: "/boc-tham",
    title: "Bốc thăm trúng thưởng",
    description:
      "Bốc số theo vé, số ghế hoặc bốc tên ngẫu nhiên, công bố người trúng trên màn lớn. Miễn phí.",
    badge: "Trao thưởng",
    categories: ["reward"],
    players: "Không giới hạn",
    duration: "1–10 phút",
    tone: "yellow",
    icon: "lottery",
    kind: "play",
  },
  {
    slug: "boc-tham-li-xi",
    image: "/design/web-img/lixi.svg",
    href: "/boc-tham-li-xi",
    title: "Bốc thăm lì xì",
    description:
      "Mỗi người chạm chọn một bao lì xì đỏ, mở ra là biết lộc. Tự nhập giải và số lượng, miễn phí.",
    badge: "Trao thưởng",
    categories: ["reward"],
    players: "Không giới hạn",
    duration: "1–10 phút",
    tone: "pink",
    icon: "red-envelope",
    kind: "play",
  },
  {
    slug: "xin-xam-dau-nam",
    image: "/design/web-img/xinxam/card.svg",
    href: "/xin-xam-dau-nam",
    title: "Xin xăm đầu năm",
    description:
      "Lắc ống xăm trên màn hình, mở quẻ đầu năm với thơ, lời giải và lời chúc của công ty.",
    badge: "Tết · Year-end",
    categories: ["conference", "reward"],
    players: "Không giới hạn",
    duration: "1–5 phút",
    tone: "lilac",
    icon: "fortune",
    kind: "play",
  },
  {
    slug: "tim-diem-khac-nhau",
    image: "/design/web-img/tim-diem-khac.svg",
    href: "/tro-choi/tim-diem-khac-nhau",
    title: "Tìm điểm khác nhau",
    description:
      "Thi tìm điểm khác nhau trên điện thoại, đua bảng xếp hạng. Có thể đặt tranh riêng theo thương hiệu.",
    badge: "Team building",
    categories: ["teambuilding", "friends"],
    players: "Không giới hạn",
    duration: "1–3 phút mỗi màn",
    tone: "mint",
    icon: "spot-diff",
    kind: "detail",
  },
];

export function getGame(slug: string) {
  return games.find((g) => g.slug === slug);
}
