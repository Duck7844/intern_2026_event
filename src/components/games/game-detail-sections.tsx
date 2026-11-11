import { Monitor, Users } from "lucide-react";

import { GameCard } from "@/components/games/game-card";
import { DEMO_PLAY, DEMO_ROOM } from "@/components/games/game-detail-hero";
import { DemoButton } from "@/components/site/demo-button";
import { FaqAccordion } from "@/components/site/faq-accordion";
import { TipBox } from "@/components/site/tip-box";
import { buttonVariants } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import type { FaqItem } from "@/data/faq";
import type { GameDetail } from "@/data/game-details";
import type { Game } from "@/data/games";
import { site } from "@/data/site";
import { toneSolid } from "@/lib/tones";
import { cn } from "@/lib/utils";

function SectionTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return <h2 className={cn("mb-5 text-[24px] leading-tight md:text-[30px]", className)}>{children}</h2>;
}

/** 2 card chế độ chơi. */
export function ModeCards({ detail }: { detail: GameDetail }) {
  return (
    <section className="wrap py-6">
      <div className="grid gap-4 md:grid-cols-2">
        {detail.modes.map((mode, i) => {
          const Icon = mode.action === "play" ? Monitor : Users;
          const demo = mode.action === "play" ? DEMO_PLAY : DEMO_ROOM;
          return (
            <article
              key={mode.title}
              className={cn(
                "flex flex-col gap-3 rounded-card border-2 bg-white p-5 md:p-6",
                i === 0 ? "border-ink shadow-hard" : "border-line",
              )}
            >
              <span
                className={cn(
                  "inline-flex size-11 items-center justify-center rounded-xl border-2 border-line",
                  i === 0 ? "bg-yellow/60" : "bg-cream",
                )}
              >
                <Icon className="size-5 text-ink" aria-hidden="true" />
              </span>
              <h3 className="text-lg leading-snug font-extrabold">{mode.title}</h3>
              <p className="text-sm leading-relaxed text-ink-3">{mode.description}</p>
              <DemoButton variant={i === 0 ? "primary" : "ghost"} size="sm" className="mt-auto self-start" {...demo}>
                {mode.title}
              </DemoButton>
            </article>
          );
        })}
      </div>
    </section>
  );
}

/** "Cách chơi" (danh sách bước gọn) bên trái, "Hợp với" (chip + gợi ý) bên phải. */
export function HowToPlayAndFit({ game, detail }: { game: Game; detail: GameDetail }) {
  return (
    <section className="wrap grid gap-10 py-8 md:py-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
      <div>
        <SectionTitle>Cách chơi</SectionTitle>
        <ol className="flex flex-col gap-4">
          {detail.steps.map((step, i) => (
            <li key={step.title} className="flex items-start gap-4">
              <span
                className={cn(
                  "inline-flex size-10 shrink-0 items-center justify-center rounded-xl border-2 border-ink font-display text-base font-extrabold text-ink shadow-hard-sm",
                  toneSolid[game.tone],
                )}
              >
                {i + 1}
              </span>
              <div className="pt-1">
                <h3 className="text-base leading-snug font-extrabold">{step.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-3">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div>
        <SectionTitle>Hợp với</SectionTitle>
        <div className="mb-5 flex flex-wrap gap-2">
          {detail.suitableFor.map((s) => (
            <Chip key={s} as="span" tone={game.tone}>
              {s}
            </Chip>
          ))}
        </div>
        <TipBox>Gợi ý: {detail.tip}</TipBox>
      </div>
    </section>
  );
}

/** Dùng trong sự kiện: một card lớn chứa lưới tình huống. */
export function UseCases({ game, detail }: { game: Game; detail: GameDetail }) {
  return (
    <section className="wrap py-8 md:py-10">
      <SectionTitle>Dùng trong sự kiện</SectionTitle>
      <ul className="grid gap-x-8 gap-y-6 rounded-[24px] border-2 border-line bg-white p-6 sm:grid-cols-2 lg:grid-cols-3 md:p-8">
        {detail.useCases.map((u) => (
          <li key={u.title} className="flex items-start gap-3">
            <span
              aria-hidden="true"
              className={cn("mt-1.5 size-3.5 shrink-0 rounded-full border-2 border-ink/20", toneSolid[game.tone])}
            />
            <div>
              <h3 className="text-base leading-snug font-extrabold">{u.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-ink-3">{u.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** FAQ chung cho mọi game, điền tên game vào câu hỏi. */
export function gameFaq(game: Game): FaqItem[] {
  return [
    {
      id: "start",
      question: `Làm sao để bắt đầu chơi ${game.title}?`,
      answer:
        "Bấm Chơi ngay để thử ngay trên máy của bạn, không cần tài khoản. Muốn chơi cùng nhiều người thì đăng nhập, tạo phòng và chia sẻ QR hoặc mã PIN.",
    },
    {
      id: "app",
      question: "Người chơi có cần cài ứng dụng không?",
      answer:
        "Không. Người chơi chỉ cần điện thoại có trình duyệt, quét QR hoặc nhập mã phòng là vào được.",
    },
    {
      id: "screen",
      question: `Có chiếu ${game.title} lên màn hình lớn được không?`,
      answer:
        "Được. Mỗi phòng có một link màn trình chiếu riêng để mở trên TV, máy chiếu hoặc LED. Host điều khiển bằng điện thoại hoặc laptop.",
    },
    {
      id: "free",
      question: `${game.title} có miễn phí không?`,
      answer:
        "Chơi thử và phòng tới 20 người hoàn toàn miễn phí. Sự kiện đông hơn hoặc cần logo riêng thì chọn gói theo sự kiện ở trang Ưu đãi.",
    },
    {
      id: "custom",
      question: "Có dùng nội dung riêng của công ty được không?",
      answer:
        "Có. Bạn tự nhập nội dung khi tạo phòng. Khách mua gói được hỗ trợ soạn nội dung theo công ty miễn phí.",
    },
  ];
}

export function GameFaq({ game }: { game: Game }) {
  return (
    <section className="wrap py-8 md:py-10">
      <div className="mx-auto max-w-3xl">
        <SectionTitle>Câu hỏi thường gặp</SectionTitle>
        <FaqAccordion items={gameFaq(game)} defaultOpenId="__none__" />
      </div>
    </section>
  );
}

/** Block nội dung riêng cho doanh nghiệp + Zalo/WhatsApp. */
export function CustomContentCta() {
  return (
    <section className="wrap py-8 md:py-10">
      <div className="grid gap-6 rounded-[28px] border-2 border-yellow-deep/60 bg-yellow/30 p-6 md:grid-cols-[1.5fr_1fr] md:items-center md:p-10">
        <div className="flex flex-col gap-3">
          <h2 className="text-[24px] leading-tight md:text-[28px]">Nội dung riêng cho doanh nghiệp bạn</h2>
          <p className="text-sm leading-relaxed text-ink-3 md:text-base">
            Khách mua gói được hỗ trợ tạo nội dung miễn phí: câu hỏi về công ty, hình ảnh sản
            phẩm, danh sách quà… tuỳ từng game. Liên hệ để được tư vấn gói và nội dung hợp với
            sự kiện của bạn.
          </p>
          <p className="text-xs font-bold text-ink-3">
            Hình ảnh, logo đưa vào game cần thuộc quyền sử dụng của doanh nghiệp.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
          <a
            href={site.contact.zalo}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ variant: "zalo", size: "md" })}
          >
            Zalo
          </a>
          <a
            href={site.contact.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ variant: "whatsapp", size: "md" })}
          >
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

/** Chơi tiếp game khác: 4 card. */
export function RelatedGames({ games }: { games: Game[] }) {
  return (
    <section className="wrap py-8 pb-28 md:py-10 md:pb-20">
      <SectionTitle>Chơi tiếp game khác</SectionTitle>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {games.map((g) => (
          <li key={g.slug}>
            <GameCard game={g} />
          </li>
        ))}
      </ul>
    </section>
  );
}
