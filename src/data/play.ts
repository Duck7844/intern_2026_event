/**
 * Dữ liệu cho 4 trang chơi (phase 4). Toàn bộ là nội dung demo tự soạn.
 */

export type PlayTab = { href: string; label: string; icon: string };

export const playTabs: PlayTab[] = [
  { href: "/vong-quay", label: "Vòng quay", icon: "wheel" },
  { href: "/boc-tham", label: "Bốc thăm", icon: "ticket" },
  { href: "/boc-tham-li-xi", label: "Lì xì", icon: "gift" },
  { href: "/xin-xam-dau-nam", label: "Xin xăm", icon: "sparkles" },
];

export const playRoutes = playTabs.map((t) => t.href);

/* ---------------- Vòng quay ---------------- */
export const defaultWheelNames = ["Minh", "Linh", "Huy", "Mai", "Nam", "Vy", "Tuấn", "Thảo"];

/** Màu múi lặp theo thứ tự: đỏ, vàng, kem, cam */
export const wheelSegments = [
  { fill: "#e8453c", text: "#ffffff" },
  { fill: "#ffd58a", text: "#3b3560" },
  { fill: "#fff1d6", text: "#3b3560" },
  { fill: "#f0b85a", text: "#3b3560" },
];

/* ---------------- Bốc thăm ---------------- */
export type LotterySpeed = "fast" | "standard" | "slow";
export type LotterySettings = { min: number; max: number; speed: LotterySpeed };

export const defaultLottery: LotterySettings = { min: 1, max: 200, speed: "standard" };

export const lotterySpeeds: Record<LotterySpeed, { label: string; ms: number }> = {
  fast: { label: "Nhanh 5s", ms: 5000 },
  standard: { label: "Tiêu chuẩn 15s", ms: 15000 },
  slow: { label: "Chậm 25s", ms: 25000 },
};

/* ---------------- Lì xì ---------------- */
export type Prize = { name: string; qty: number };

export const ENVELOPE_COUNT = 16;
export const CONSOLATION = "Chúc bạn một năm mới nhiều may mắn!";

export const defaultPrizes: Prize[] = [
  { name: "Lì xì 500.000đ", qty: 1 },
  { name: "Lì xì 200.000đ", qty: 2 },
  { name: "Lì xì 100.000đ", qty: 3 },
  { name: "Lì xì 50.000đ", qty: 4 },
];

/* ---------------- Xin xăm ---------------- */
export type FortuneStick = {
  number: number;
  grade: "Thượng" | "Trung" | "Hạ";
  title: string;
  poem: [string, string, string, string];
  meaning: string;
  wish: string;
};

export const fortuneSticks: FortuneStick[] = [
  {
    number: 1,
    grade: "Thượng",
    title: "Rồng gặp mây lành",
    poem: ["Rồng vàng gặp mây lành", "Đường xa hoá gần kề", "Việc khó thành việc dễ", "Mùa xuân đến bốn bề"],
    meaning: "Năm nay thuận lợi về công việc và các mối quan hệ. Điều đang chờ sẽ có kết quả sớm hơn dự tính.",
    wish: "Chúc bạn một năm bay cao như rồng gặp mây.",
  },
  {
    number: 2,
    grade: "Trung",
    title: "Thuyền chờ gió",
    poem: ["Thuyền neo bến đợi gió", "Lòng chớ vội bồn chồn", "Gió đến thuyền sẽ đi", "Biển rộng trời cũng rộng"],
    meaning: "Có dự định tốt nhưng chưa tới lúc. Kiên nhẫn chuẩn bị, cơ hội sẽ đến vào giữa năm.",
    wish: "Chúc bạn giữ vững tay chèo, thuận buồm xuôi gió.",
  },
  {
    number: 3,
    grade: "Thượng",
    title: "Hoa nở đúng mùa",
    poem: ["Hoa nở đúng tiết xuân", "Ong bướm tự tìm về", "Chẳng cần cầu chẳng đợi", "Phúc lộc đến tràn trề"],
    meaning: "Những cố gắng năm trước được ghi nhận. Tài lộc và tin vui đến tự nhiên, không cần gượng ép.",
    wish: "Chúc bạn năm mới phúc lộc đầy nhà.",
  },
  {
    number: 4,
    grade: "Hạ",
    title: "Mây che trăng sáng",
    poem: ["Mây mỏng che trăng sáng", "Chốc lát lại trong veo", "Việc nhỏ đừng để lớn", "Nhẫn một chút qua đèo"],
    meaning: "Đầu năm có chút trắc trở nhỏ, chủ yếu do hiểu lầm. Bình tĩnh nói chuyện rõ ràng là tan.",
    wish: "Chúc bạn mây tan trăng tỏ, mọi việc hanh thông.",
  },
  {
    number: 5,
    grade: "Trung",
    title: "Gieo hạt chờ ngày",
    poem: ["Hạt gieo xuống đất lành", "Mưa thuận gió cũng hoà", "Đừng mong cây chóng lớn", "Chăm bón rồi đơm hoa"],
    meaning: "Năm của học hỏi và tích luỹ. Thành quả chưa thấy ngay nhưng nền móng đang rất chắc.",
    wish: "Chúc bạn gieo điều tốt, gặt điều lành.",
  },
  {
    number: 6,
    grade: "Thượng",
    title: "Ngựa về đích sớm",
    poem: ["Ngựa phi đường vạn dặm", "Chân vững bước không lùi", "Về đích trước ngày hẹn", "Tiếng cười khắp nơi nơi"],
    meaning: "Dự án hoặc kế hoạch lớn sẽ hoàn thành sớm hơn mong đợi. Năm Ngọ, cứ mạnh dạn tiến lên.",
    wish: "Chúc bạn mã đáo thành công.",
  },
  {
    number: 7,
    grade: "Trung",
    title: "Cầu nối hai bờ",
    poem: ["Hai bờ sông cách trở", "Có cầu nối liền nhau", "Người quen hoá người thân", "Giúp nhau lúc cần cầu"],
    meaning: "Quý nhân xuất hiện từ người quen cũ. Hãy chủ động kết nối, đừng ngại mở lời.",
    wish: "Chúc bạn gặp được người đồng hành đúng lúc.",
  },
  {
    number: 8,
    grade: "Thượng",
    title: "Vàng trong cát",
    poem: ["Đãi cát tìm thấy vàng", "Công khó chẳng uổng đâu", "Lộc đến từ việc nhỏ", "Giữ tâm sáng dài lâu"],
    meaning: "Tài lộc đến từ những việc tưởng như nhỏ nhặt. Chăm chút chi tiết là chìa khoá năm nay.",
    wish: "Chúc bạn tiền vào như nước, lộc đến như mây.",
  },
  {
    number: 9,
    grade: "Hạ",
    title: "Đèn trước gió",
    poem: ["Ngọn đèn trước gió lớn", "Che tay giữ lửa còn", "Qua cơn gió lại sáng", "Đêm dài rồi cũng mòn"],
    meaning: "Cần giữ sức khoẻ và tinh thần trong quý đầu năm. Tránh quyết định lớn lúc đang mệt.",
    wish: "Chúc bạn sức khoẻ dồi dào, tâm an vạn sự an.",
  },
  {
    number: 10,
    grade: "Thượng",
    title: "Chim én báo xuân",
    poem: ["Én về báo tin xuân", "Nhà nhà đều rộn rã", "Tin vui đến cửa trước", "Niềm vui vào cửa sau"],
    meaning: "Tin vui dồn dập, có thể là thăng tiến, thêm thành viên hoặc chuyến đi xa. Năm của niềm vui.",
    wish: "Chúc bạn tin vui nối tiếp tin vui.",
  },
  {
    number: 11,
    grade: "Trung",
    title: "Nước chảy đá mòn",
    poem: ["Nước chảy mãi đá mòn", "Bền lòng ắt sẽ nên", "Đường tuy chưa thấy đích", "Mỗi ngày một gần thêm"],
    meaning: "Việc lớn cần thời gian. Đừng so sánh với người khác, giữ nhịp của mình là thắng.",
    wish: "Chúc bạn bền chí, thành công sẽ tới.",
  },
  {
    number: 12,
    grade: "Thượng",
    title: "Trăng rằm tròn đầy",
    poem: ["Trăng rằm tròn vành vạnh", "Soi sáng cả gia đình", "Người đi xa trở lại", "Sum họp đẹp như tranh"],
    meaning: "Gia đạo êm ấm, người thân xa trở về. Là năm để vun đắp tình cảm và sum vầy.",
    wish: "Chúc gia đình bạn đoàn viên, hạnh phúc trọn vẹn.",
  },
];
