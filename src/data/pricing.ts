import type { Tone } from "@/data/games";

export type Plan = {
  id: string;
  name: string;
  /** Giá hiển thị, đã format */
  price: string;
  /** Dòng phụ dưới giá, ví dụ "/ sự kiện" */
  priceNote?: string;
  audience: string;
  features: string[];
  cta: string;
  /** Gói được gợi ý nổi bật */
  recommended?: boolean;
  tone: Tone;
};

export const plans: Plan[] = [
  {
    id: "free",
    name: "Miễn phí",
    price: "0đ",
    audience: "20 người · Chơi thử, nhóm nhỏ",
    features: ["Phòng tới 20 người", "1 game mỗi phòng", "Nội dung mẫu có sẵn"],
    cta: "Chơi thử",
    tone: "mint",
  },
  {
    id: "starter",
    name: "Starter",
    price: "199.000đ",
    priceNote: "/ sự kiện",
    audience: "200 người · 1 game, tự vận hành",
    features: ["Phòng tới 200 người", "1 game mỗi phòng", "Tự soạn nội dung"],
    cta: "Chọn gói",
    tone: "peri",
  },
  {
    id: "event",
    name: "Event",
    price: "490.000đ",
    priceNote: "/ sự kiện",
    audience: "500 người · 3 game, logo, xuất CSV",
    features: ["Phòng tới 500 người", "3 game mỗi phòng", "Logo & màu thương hiệu", "Xuất kết quả CSV"],
    cta: "Chọn gói Event",
    recommended: true,
    tone: "yellow",
  },
  {
    id: "event-pro",
    name: "Event Pro",
    price: "990.000đ",
    priceNote: "/ sự kiện",
    audience: "1.000 người · Thu lead, voucher",
    features: ["Phòng tới 1.000 người", "6 game mỗi phòng", "Thu lead người chơi", "Mã voucher, quầy trao quà"],
    cta: "Chọn gói",
    tone: "peach",
  },
  {
    id: "premium",
    name: "Premium",
    price: "2.490.000đ",
    priceNote: "/ sự kiện",
    audience: "2.000 người · Nhiều phòng, hỗ trợ ưu tiên",
    features: ["Phòng tới 2.000 người", "Không giới hạn game", "Nhiều phòng song song", "Hỗ trợ ưu tiên ngày sự kiện"],
    cta: "Chọn gói",
    tone: "lilac",
  },
];

export type Promo = {
  id: string;
  tag: string;
  period: string;
  title: string;
  description: string;
  tone: Tone;
  icon: string;
  /** Mã giảm giá nếu có */
  code?: string;
  /** Chương trình nổi bật, hiện card lớn */
  featured?: boolean;
};

/** Chương trình ưu đãi (nội dung demo) */
export const promos: Promo[] = [
  {
    id: "yep-early",
    tag: "Đặt sớm",
    period: "06/11 – 30/11",
    title: "Đặt sớm mùa Year End Party",
    description: "Giảm 10% gói lẻ đủ điều kiện với mã YEP2026: Event 490.000đ còn 441.000đ.",
    tone: "peri",
    icon: "timer",
    code: "YEP2026",
    featured: true,
  },
  {
    id: "tet",
    tag: "Tết",
    period: "Tháng 1 – Tháng 2",
    title: "Combo game Tết",
    description: "Lì xì, xin xăm, bốc thăm đầu năm cùng quay số trúng thưởng từ 790.000đ.",
    tone: "peach",
    icon: "red-envelope",
  },
  {
    id: "gift",
    tag: "Quà tặng",
    period: "Cả năm",
    title: "Mua combo check-in được tặng game",
    description: "Khách dùng combo check-in + quay số được tặng 1 lượt gói Event mỗi tháng.",
    tone: "mint",
    icon: "gift",
  },
  {
    id: "partner",
    tag: "Đối tác",
    period: "Cả năm",
    title: "Ưu đãi đối tác tổ chức sự kiện",
    description: "Giảm 15% mỗi đơn, hoặc trả trước 6.900.000đ cho 20 sự kiện gói Event.",
    tone: "pink",
    icon: "handshake",
  },
];

export const featuredPromoDetails = {
  audience: "Doanh nghiệp, phòng HR và agency đã chốt lịch Year End Party.",
  steps: [
    "Chọn gói Starter, Event, Event Pro hoặc Premium.",
    "Mã YEP2026 được điền sẵn ở bước Thanh toán.",
    "Thanh toán trước 23:59 ngày 30/11/2026, tổ chức sự kiện đến hết 28/02/2027.",
  ],
  conditions: [
    "Áp dụng cho gói lẻ, chỉ giảm trên giá gói, không giảm phần mua thêm người.",
    "Không áp dụng cho combo (combo đã là giá ưu đãi).",
    "Không cộng dồn với quà tặng hoặc khấu trừ khi nâng cấp.",
    "Mỗi tài khoản dùng 1 lần.",
  ],
};

export const pricingNotes = [
  "Giá theo sự kiện, chưa gồm VAT 8%.",
  "Mua thêm người tham dự: 100.000đ / 100 người.",
  "Thanh toán chuyển khoản (VietQR) hoặc thẻ quốc tế, kích hoạt ngay sau khi nhận tiền.",
];
