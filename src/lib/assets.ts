/**
 * Nguồn ảnh của dự án.
 * - /design/**   : ảnh lấy từ site tham chiếu (xem public/design/README.md)
 * - /icons/*.png : Fluent Emoji 3D (MIT), dùng khi site tham chiếu không có icon tương đương
 */

const WEB_ICONS = new Set([
  "ava-cat", "ava-fox", "ava-frog", "ava-panda", "ava-tiger", "ballot", "bus", "card", "chart", "chat",
  "clipboard", "crown", "cuffs", "detective", "dice", "face-fire", "face-happy", "face-sweat", "finish",
  "frame", "gamepad", "gift", "globe", "handshake", "key", "lock", "mic", "money", "money-fly",
  "numbers", "palette", "party", "phone-qr", "puzzle", "repeat", "robot", "rock", "search", "shield",
  "sliders", "snow", "sparkles", "target", "ticket", "timer", "train", "trophy", "undo", "users",
  "wave-hand", "wheel",
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
  xinxamBg: "/design/web-img/xinxam/bg.webp",
  xinxamTube: "/design/web-img/xinxam/ong.webp",
} as const;

/** SVG không qua image optimizer của Next (cần `unoptimized`). */
export function isSvg(src: string) {
  return src.toLowerCase().endsWith(".svg");
}
