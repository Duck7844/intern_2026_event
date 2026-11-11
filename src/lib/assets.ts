/**
 * Nguồn ảnh của dự án.
 * - /design/**   : ảnh lấy từ site tham chiếu (xem public/design/README.md)
 * - /icons/*.png : Fluent Emoji 3D (MIT), dùng khi site tham chiếu không có icon tương đương
 */

const WEB_ICONS = new Set([
  "ava-cat", "ava-fox", "ava-frog", "ava-panda", "ava-tiger", "ballot", "chart", "chat", "clipboard",
  "crown", "detective", "dice", "gamepad", "gift", "globe", "handshake", "key", "mic", "palette",
  "party", "phone-qr", "repeat", "robot", "search", "snow", "sparkles", "ticket", "timer", "trophy",
  "users", "wave-hand", "wheel",
]);

/** Tên icon Fluent -> tên icon tương đương trong bộ web-icons */
const ALIAS: Record<string, string> = {
  draw: "palette",
  lottery: "ticket",
  spy: "detective",
  "spot-diff": "search",
  "word-cloud": "chat",
};

/** Trả về đường dẫn icon: ưu tiên bộ web-icons của site tham chiếu, fallback Fluent. */
export function iconSrc(name: string): string {
  const n = ALIAS[name] ?? name;
  return WEB_ICONS.has(n) ? `/design/web-icons/${n}.webp` : `/icons/${name}.png`;
}

/** Ảnh minh hoạ lớn (web-img) */
export const IMG = {
  hero: "/design/web-img/hero.webp",
  promoHero: "/design/web-img/promo-v3/hero.svg",
  helpFaq: "/design/web-img/help/faq.svg",
  helpHost: (n: 1 | 2 | 3 | 4) => `/design/web-img/help/host-${n}.svg`,
  tugOfWar: "/design/web-img/chon-phe.webp",
  wheelTet: "/design/web-img/wheel/tet.webp",
} as const;

/** SVG không qua image optimizer của Next (cần `unoptimized`). */
export function isSvg(src: string) {
  return src.toLowerCase().endsWith(".svg");
}
