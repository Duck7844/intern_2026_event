import type { TKey } from "@/lib/i18n";

export type NavItem = {
  /** Khoá dịch trong dictionary (src/lib/i18n.tsx) */
  label: TKey;
  href: string;
  /** Link ngoài: mở tab mới */
  external?: boolean;
};

/** Nav chính trên header (desktop + drawer mobile). */
export const headerNav: NavItem[] = [
  { label: "nav.games", href: "/#game" },
  { label: "nav.wheel", href: "/vong-quay" },
  { label: "nav.events", href: "/#su-kien" },
  { label: "nav.pricing", href: "/uu-dai" },
  { label: "nav.support", href: "/ho-tro" },
];

export type FooterColumn = { title: TKey; items: NavItem[] };

/** 3 cột link ở footer, cột thương hiệu render riêng. */
export const footerColumns: FooterColumn[] = [
  {
    title: "footer.games",
    items: [
      { label: "footer.allGames", href: "/#game" },
      { label: "footer.wheel", href: "/vong-quay" },
      { label: "footer.lottery", href: "/boc-tham" },
      { label: "footer.joinRoom", href: "/choi" },
      { label: "footer.boardGames", href: "/#giai-tri" },
    ],
  },
  {
    title: "footer.events",
    items: [
      { label: "footer.createRoom", href: "/tao-phong-su-kien" },
      { label: "footer.myRooms", href: "/phong-cua-toi" },
      { label: "footer.pricing", href: "/uu-dai" },
      { label: "footer.screen", href: "/man-chieu" },
      { label: "footer.consult", href: "/lien-he" },
    ],
  },
  {
    title: "footer.support",
    items: [
      { label: "footer.faq", href: "/ho-tro" },
      { label: "footer.contact", href: "/lien-he" },
      { label: "footer.terms", href: "/ho-tro#dieu-khoan" },
      { label: "footer.privacy", href: "/chinh-sach-quyen-rieng-tu" },
    ],
  },
];
