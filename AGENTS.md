<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project notes (intern_fe_2_event)

- Mục tiêu: làm lại UI tham chiếu sukienvui.vn. Plan, danh sách màn hình, token nằm ở `docs/sukienvui-ui-analysis-plan.xlsx`.
- Stack: Next.js 16 App Router + React 19 + TypeScript + Tailwind v4 + shadcn (base-nova, Base UI). Không có backend, mọi trang render tĩnh.
- Design tokens khai báo trong `src/app/globals.css` dưới `@theme` (bg-cream, text-ink, border-line, shadow-hard...). Không hardcode màu trong component.
- Font: Baloo 2 (`font-display`) cho heading/logo, Nunito (`font-sans`) cho body, nạp qua `next/font/google` trong `src/app/layout.tsx`.
- Cấu trúc: `components/ui` (primitive: Button, Chip, Card + shadcn Sheet/Dialog/Accordion/Tabs), `components/site` (Header, Footer, MobileNav, Logo, SectionHeading), `data/` (nav, site, sau này games/pricing/faq), `lib/` (cn, i18n).
- i18n: `src/lib/i18n.tsx` là dictionary VI/EN tối giản cho label UI, dùng `useLang().t("nav.games")`. Thêm khoá mới vào cả `vi` và `en`.
- Button pill dùng `<Button>` cho button, `buttonVariants()` cho `<Link>`. Variant `ghost`/`outline` được shadcn Sheet/Dialog dùng, không đổi tên.
- Lint rule `react-hooks/set-state-in-effect` đang bật: không setState trong useEffect; dùng useSyncExternalStore hoặc "adjust state during render".
- Scripts: `npm run dev`, `npm run lint`, `npm run typecheck`, `npm run format`, `npm run build`.
- Icon minh hoạ: `public/icons/*.png` là Fluent Emoji 3D (MIT), xem `public/icons/LICENSE.md`. Tông màu card map trong `src/lib/tones.ts` (viết class đầy đủ, không nối chuỗi).
- Data nội dung: `src/data/games.ts` (14 game + categories), `src/data/board-games.ts` (7 cờ). Trang detail/play đọc từ đây, không hardcode trong page.
- Ảnh gốc của site tham chiếu (web của leader, đã được phép dùng cho task clone nội bộ) nằm ở `public/design/**`, giữ nguyên đường dẫn gốc. Dùng qua `src/lib/assets.ts`: `iconSrc(name)` (ưu tiên web-icons, fallback Fluent), `IMG.*`, `isSvg()` (SVG cần `unoptimized` trên next/image).
- Route động với Cache Components: page không `await params` trực tiếp; đẩy xuống component con bọc `<Suspense>` (xem `app/(site)/tro-choi/[slug]/page.tsx`).
