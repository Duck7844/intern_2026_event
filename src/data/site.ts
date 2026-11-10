/**
 * Thông tin chung của site. Đổi tên thương hiệu / liên hệ ở đây, mọi nơi khác đọc từ file này.
 */
export const site = {
  name: "Sự Kiện Vui",
  /** Chữ cái hiện trong ô logo vuông vàng */
  logoLetter: "V",
  tagline: "Mini game team building, Year End Party",
  description:
    "Đố vui, đuổi hình bắt chữ, vòng quay may mắn… Mở phòng, cả trăm người quét QR là cùng chơi trên điện thoại. Không cần cài app.",
  year: new Date().getFullYear(),
  contact: {
    email: "hello@example.com",
    zalo: "https://zalo.me/",
    whatsapp: "https://wa.me/",
  },
} as const;
