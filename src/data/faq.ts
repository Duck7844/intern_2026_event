export type FaqItem = { id: string; question: string; answer: string };

import type { Tone } from "@/data/games";

export type Step = {
  title: string;
  description: string;
  /** Icon trong public/icons cho ô minh hoạ */
  icon: string;
  tone: Tone;
  /** Ảnh minh hoạ riêng, ưu tiên hơn icon */
  image?: string;
};

/** FAQ trang Hỗ trợ */
export const supportFaq: FaqItem[] = [
  {
    id: "free",
    question: "Nền tảng có miễn phí không?",
    answer:
      "Có. Gói Miễn phí cho phòng tới 20 người, chơi không giới hạn số lần. Sự kiện đông hơn hoặc cần logo riêng, xuất kết quả thì chọn gói trả phí theo sự kiện, xem chi tiết ở trang Ưu đãi.",
  },
  {
    id: "login",
    question: "Người chơi có cần đăng nhập hay cài app không?",
    answer:
      "Không. Chỉ cần điện thoại có trình duyệt và kết nối mạng, quét QR hoặc nhập mã PIN rồi gõ tên là vào chơi.",
  },
  {
    id: "games-per-room",
    question: "Một phòng chơi được bao nhiêu game?",
    answer:
      "Mỗi phòng có một mã dùng cho cả buổi và một kịch bản gồm các game theo thứ tự. Số game tối đa tuỳ gói. Khi host chuyển game, điện thoại người chơi tự chuyển theo, không cần quét lại.",
  },
  {
    id: "offline",
    question: "Mất mạng giữa chừng có mất điểm không?",
    answer:
      "Không. Điểm và câu trả lời được lưu trên máy chủ. Mở lại trang là vào tiếp đúng câu đang chơi.",
  },
  {
    id: "moderation",
    question: "Làm sao tránh người lạ vào phòng hay gõ từ không phù hợp?",
    answer:
      "Host có thể khoá phòng, mời người ra và bật chế độ duyệt trước khi chiếu cho Word Cloud. Bộ lọc tự chặn từ không phù hợp, kể cả viết không dấu.",
  },
  {
    id: "custom-content",
    question: "Tôi muốn bộ câu hỏi riêng về công ty?",
    answer:
      "Bạn tự thêm câu hỏi khi tạo phòng. Từ gói Event trở lên được gắn logo và màu thương hiệu. Cần đội ngũ soạn giúp thì liên hệ để được báo giá.",
  },
  {
    id: "combo",
    question: "Có dùng cùng app check-in, vòng quay may mắn được không?",
    answer:
      "Được. Mini game có thể ghép combo check-in, quay thưởng cho cùng một chương trình, dùng chung danh sách khách.",
  },
];

/** 4 bước cho người tổ chức */
export const hostSteps: Step[] = [
  {
    title: "Chọn game",
    image: "/design/web-img/help/host-1.svg",
    description: "Vào thư viện, chơi thử 60 giây để chắc game hợp với nhóm của bạn.",
    icon: "dice",
    tone: "peri",
  },
  {
    title: "Mở phòng",
    image: "/design/web-img/help/host-2.svg",
    description: "Đăng nhập, chọn nội dung mẫu, cài thời gian rồi bấm Mở phòng.",
    icon: "sparkles",
    tone: "mint",
  },
  {
    title: "Chiếu & ghép điện thoại",
    image: "/design/web-img/help/host-3.svg",
    description: "Mở cửa sổ trình chiếu lên TV, quét mã host để điều khiển bằng điện thoại.",
    icon: "phone-qr",
    tone: "yellow",
  },
  {
    title: "Điều khiển",
    image: "/design/web-img/help/host-4.svg",
    description: "Bắt đầu, công bố, xếp hạng, chuyển game. Hết buổi bấm Kết thúc phòng.",
    icon: "timer",
    tone: "pink",
  },
];

/** 3 bước cho người chơi */
export const playerSteps: Step[] = [
  {
    title: "Quét QR hoặc nhập mã",
    description: "Mở camera quét mã trên màn hình lớn, hoặc vào trang Nhập mã phòng và gõ mã PIN.",
    icon: "phone-qr",
    tone: "peri",
  },
  {
    title: "Nhập tên",
    description: "Gõ tên hiển thị, chọn avatar. Không cần tài khoản, không cần cài app.",
    icon: "ava-fox",
    tone: "mint",
  },
  {
    title: "Chơi và xem điểm",
    description: "Trả lời trên điện thoại, điểm và thứ hạng hiện ngay trên màn chiếu.",
    icon: "trophy",
    tone: "yellow",
  },
];

export const hostTip =
  "Mẹo: chiếu thử trước sự kiện 15 phút và kiểm tra wifi hội trường chịu được số người tham dự.";

export const playerTip =
  "Mẹo: bật âm lượng điện thoại và giữ màn hình sáng để không bỏ lỡ câu hỏi.";

/** FAQ trang Ưu đãi */
export const pricingFaq: FaqItem[] = [
  {
    id: "coupon",
    question: "Mã giảm giá và combo có dùng chung được không?",
    answer:
      "Không. Combo đã là giá ưu đãi nên không nhận thêm mã giảm giá, và mã giảm giá cũng không cộng với quà tặng hay khấu trừ khi nâng cấp.",
  },
  {
    id: "duration",
    question: "Gói theo sự kiện dùng được bao lâu?",
    answer: "Gói dùng cho 1 sự kiện trong 30 ngày kể từ khi thanh toán.",
  },
  {
    id: "upgrade",
    question: "Đang dùng gói nhỏ, nâng cấp giữa chừng được không?",
    answer:
      "Được. Bạn chỉ trả phần chênh lệch, phòng và nội dung đã soạn giữ nguyên.",
  },
  {
    id: "vat",
    question: "Có xuất hoá đơn VAT không?",
    answer:
      "Có. Bật “Xuất hoá đơn VAT công ty” ở bước thanh toán, nhập tên công ty, mã số thuế và email nhận hoá đơn.",
  },
  {
    id: "payment",
    question: "Thanh toán bằng cách nào?",
    answer: "Chuyển khoản qua mã VietQR hoặc thẻ quốc tế. Gói được kích hoạt ngay sau khi nhận tiền.",
  },
];
