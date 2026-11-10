import type { Metadata } from "next";
import { Baloo_2, Nunito } from "next/font/google";
import { Toaster } from "sonner";

import { site } from "@/data/site";
import { LangProvider } from "@/lib/i18n";

import "./globals.css";

const baloo = Baloo_2({
  subsets: ["latin", "vietnamese"],
  variable: "--font-baloo",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin", "vietnamese"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} – ${site.tagline}`,
    template: `%s – ${site.name}`,
  },
  description: site.description,
};

/**
 * Root layout chỉ lo html/body, font, provider. Header/Footer nằm ở route group:
 * - (site): layout đầy đủ cho đa số trang
 * - (bare): layout tối giản (ví dụ /choi)
 */
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="vi"
      className={`${baloo.variable} ${nunito.variable} h-full`}
      suppressHydrationWarning
    >
      {/* suppressHydrationWarning: extension trình duyệt (vd. Custom Cursor) có thể chèn style/data-* vào body trước khi hydrate */}
      <body className="flex min-h-full flex-col" suppressHydrationWarning>
        <LangProvider>
          {children}
          <Toaster position="top-center" richColors />
        </LangProvider>
      </body>
    </html>
  );
}
