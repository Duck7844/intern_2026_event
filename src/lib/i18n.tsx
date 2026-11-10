"use client";

import * as React from "react";

/**
 * i18n tối giản cho phase hiện tại: chỉ đổi label UI (nav, footer, nút chung).
 * Nội dung dài của từng trang vẫn tiếng Việt. Khi cần EN thật -> chuyển sang next-intl,
 * giữ nguyên tên khoá để migrate dễ.
 */
const vi = {
  "brand.tagline": "Chơi là vui, vui là kết nối",
  "brand.home": "Trang chủ",

  "nav.games": "Trò chơi",
  "nav.wheel": "Vòng quay & Bốc thăm",
  "nav.events": "Cho sự kiện",
  "nav.pricing": "Ưu đãi",
  "nav.support": "Hỗ trợ",
  "nav.login": "Đăng nhập",
  "nav.loginTitle": "Đăng nhập để quản lý sự kiện",
  "nav.joinRoom": "Nhập mã phòng",
  "nav.playNow": "Chơi ngay",
  "nav.openMenu": "Mở menu",
  "nav.closeMenu": "Đóng menu",
  "nav.mainLabel": "Điều hướng chính",

  "footer.games": "Trò chơi",
  "footer.allGames": "Tất cả game",
  "footer.wheel": "Vòng quay may mắn",
  "footer.lottery": "Bốc thăm",
  "footer.joinRoom": "Nhập mã phòng",
  "footer.boardGames": "Góc giải trí: cờ & dân gian",
  "footer.events": "Sự kiện",
  "footer.createRoom": "Tạo phòng cho sự kiện",
  "footer.myRooms": "Phòng của tôi",
  "footer.pricing": "Bảng giá & ưu đãi",
  "footer.screen": "Màn trình chiếu",
  "footer.consult": "Nhận tư vấn",
  "footer.support": "Hỗ trợ",
  "footer.faq": "Hướng dẫn & FAQ",
  "footer.contact": "Liên hệ",
  "footer.terms": "Điều khoản",
  "footer.privacy": "Chính sách quyền riêng tư",
  "footer.cookies": "Cài đặt cookie",
  "footer.note": "Không cần cài app · không cần tài khoản để chơi",
  "footer.description":
    "Chơi là vui, vui là kết nối. Mini game cho nhóm bạn, team công ty và ngày hội doanh nghiệp.",

  "common.language": "Ngôn ngữ",
  "common.comingSoon": "Tính năng đang được phát triển",
} as const;

export type TKey = keyof typeof vi;

const en: Record<TKey, string> = {
  "brand.tagline": "Play together, connect together",
  "brand.home": "Home",

  "nav.games": "Games",
  "nav.wheel": "Wheel & Lottery",
  "nav.events": "For events",
  "nav.pricing": "Pricing",
  "nav.support": "Support",
  "nav.login": "Log in",
  "nav.loginTitle": "Log in to manage your events",
  "nav.joinRoom": "Enter room code",
  "nav.playNow": "Play now",
  "nav.openMenu": "Open menu",
  "nav.closeMenu": "Close menu",
  "nav.mainLabel": "Main navigation",

  "footer.games": "Games",
  "footer.allGames": "All games",
  "footer.wheel": "Lucky wheel",
  "footer.lottery": "Lottery draw",
  "footer.joinRoom": "Enter room code",
  "footer.boardGames": "Board & folk games",
  "footer.events": "Events",
  "footer.createRoom": "Create an event room",
  "footer.myRooms": "My rooms",
  "footer.pricing": "Pricing & offers",
  "footer.screen": "Presenter screen",
  "footer.consult": "Get advice",
  "footer.support": "Support",
  "footer.faq": "Guides & FAQ",
  "footer.contact": "Contact",
  "footer.terms": "Terms",
  "footer.privacy": "Privacy policy",
  "footer.cookies": "Cookie settings",
  "footer.note": "No app install · no account needed to play",
  "footer.description":
    "Play together, connect together. Mini games for friends, company teams and corporate events.",

  "common.language": "Language",
  "common.comingSoon": "This feature is under development",
};

export type Lang = "vi" | "en";
const dictionaries: Record<Lang, Record<TKey, string>> = { vi, en };
const STORAGE_KEY = "skv.lang";

type LangContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: TKey) => string;
};

const LangContext = React.createContext<LangContextValue | null>(null);

/* ---- Store ngoài React: localStorage + listeners, đọc qua useSyncExternalStore ---- */
const listeners = new Set<() => void>();

function readLang(): Lang {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved === "en" ? "en" : "vi";
  } catch {
    return "vi";
  }
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  window.addEventListener("storage", onChange);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onChange);
  };
}

function writeLang(next: Lang) {
  try {
    window.localStorage.setItem(STORAGE_KEY, next);
  } catch {
    /* private mode / storage bị chặn: vẫn báo listeners để UI đổi trong phiên */
  }
  listeners.forEach((fn) => fn());
}

export function LangProvider({ children }: { children: React.ReactNode }) {
  // Server và lần hydrate đầu luôn là "vi" (getServerSnapshot), sau đó đồng bộ với localStorage.
  const lang = React.useSyncExternalStore(subscribe, readLang, () => "vi" as Lang);

  React.useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = React.useCallback((next: Lang) => writeLang(next), []);

  const value = React.useMemo<LangContextValue>(
    () => ({
      lang,
      setLang,
      t: (key) => dictionaries[lang][key] ?? vi[key],
    }),
    [lang, setLang],
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = React.useContext(LangContext);
  if (!ctx) throw new Error("useLang phải dùng bên trong <LangProvider>");
  return ctx;
}
