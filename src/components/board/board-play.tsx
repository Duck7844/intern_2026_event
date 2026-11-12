"use client";

import * as React from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { RotateCcw } from "lucide-react";

import { BoardPreview } from "@/components/board/boards";
import { BoardToolbar } from "@/components/board/board-toolbar";
import { DemoButton } from "@/components/site/demo-button";
import { Button } from "@/components/ui/button";
import type { BoardGame } from "@/data/board-games";
import { iconSrc } from "@/lib/assets";
import { toneBg, toneSolid } from "@/lib/tones";
import { cn } from "@/lib/utils";

type Mode = "ai" | "duo";
type Difficulty = "easy" | "medium" | "hard";
type First = "first" | "second" | "random";

const difficulties: { value: Difficulty; label: string; icon: string }[] = [
  { value: "easy", label: "Dễ", icon: "face-happy" },
  { value: "medium", label: "Vừa", icon: "face-sweat" },
  { value: "hard", label: "Khó", icon: "face-fire" },
];
const difficultyLabel: Record<Difficulty, string> = { easy: "Dễ", medium: "Vừa", hard: "Khó" };

/** Trang chơi cờ: xem trước bàn, chọn cách chơi; logic đi quân ngoài phạm vi (nút Bắt đầu hiện toast). */
export function BoardPlay({ game }: { game: BoardGame }) {
  const params = useSearchParams();
  const initialMode: Mode = params.get("mode") === "duo" ? "duo" : "ai";
  const [mode, setMode] = React.useState<Mode>(initialMode);
  const [difficulty, setDifficulty] = React.useState<Difficulty>("easy");
  const [first, setFirst] = React.useState<First>("first");
  const [players, setPlayers] = React.useState(2);
  const [rounds, setRounds] = React.useState(30);
  const [flipped, setFlipped] = React.useState(false);

  const tycoon = game.kind === "tycoon";
  const youFirst = first !== "second";
  const youSide = youFirst ? game.sides[0] : game.sides[1];
  const oppSide = youFirst ? game.sides[1] : game.sides[0];
  const oppLabel = mode === "ai" ? `Máy (${difficultyLabel[difficulty]})` : "Người 2";
  const subtitle = mode === "ai" ? `Đấu với máy · mức ${difficultyLabel[difficulty]}` : `${game.multiLabel} chung máy`;

  return (
    <>
      <BoardToolbar />

      <div className="wrap pt-4 pb-14 md:pb-20">
        {/* Tiêu đề */}
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div className="flex items-center gap-4">
            <span className={cn("inline-flex size-14 items-center justify-center rounded-2xl border-2 border-line", toneBg[game.tone])}>
              <Image src={iconSrc(game.icon)} alt="" width={36} height={36} className="size-9" />
            </span>
            <div>
              <h1 className="text-[32px] leading-none md:text-[40px]">{game.title}</h1>
              <p className="mt-1.5 text-sm font-bold text-ink-3">{subtitle}</p>
            </div>
          </div>
          <a href="#luat" className="text-sm font-extrabold text-ink-2 underline underline-offset-4 hover:text-ink">
            Giới thiệu &amp; luật chơi →
          </a>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:items-start">
          {/* Sân khấu */}
          <div>
            <div className="relative overflow-hidden rounded-[24px] border-2 border-ink p-4 shadow-[0_6px_0_0_var(--color-ink)] md:p-6">
              <Image src={game.bg} alt="" fill priority sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover" />
              <div className="relative z-10 flex flex-col gap-3">
                <PlayerBar label={`${oppLabel} · ${flipped ? youSide : oppSide}`} tycoon={tycoon} />
                <div className="mx-auto w-full max-w-[560px]">
                  <BoardPreview kind={game.kind} flipped={flipped} />
                </div>
                {tycoon ? (
                  <div className="grid grid-cols-2 gap-3">
                    <TycoonPlayerCard name="Bạn" color="bg-peach" side="Đỏ" />
                    <TycoonPlayerCard name={`Máy 1 (${difficultyLabel[difficulty]})`} color="bg-peri" side="Xanh" />
                  </div>
                ) : (
                  <PlayerBar label={`Bạn · ${flipped ? oppSide : youSide}`} />
                )}
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm font-extrabold text-ink-2">Xem trước bàn cờ · chọn cách chơi rồi bấm Bắt đầu</p>
              {!tycoon && (
                <Button variant="ghost" size="sm" onClick={() => setFlipped((v) => !v)}>
                  <RotateCcw /> Xoay bàn
                </Button>
              )}
            </div>
          </div>

          {/* Cài đặt */}
          <div className="flex flex-col gap-5">
            <section className="rounded-[24px] border-2 border-line bg-white p-5 md:p-6">
              <h2 className="text-[22px] leading-tight">Chơi thế nào?</h2>
              <div className="mt-4 flex flex-col gap-3">
                <ModeCard
                  active={mode === "ai"}
                  icon="robot"
                  iconTone="lilac"
                  title="Đấu với máy"
                  description="Chọn mức Dễ, Vừa, Khó · được đi lại"
                  onClick={() => setMode("ai")}
                />
                <ModeCard
                  active={mode === "duo"}
                  icon="users"
                  iconTone="mint"
                  title={tycoon ? "Chơi chung một máy" : "2 người chung máy"}
                  description={tycoon ? "2–4 người thay phiên trên cùng màn hình" : "Ngồi cạnh nhau, thay phiên chạm"}
                  onClick={() => setMode("duo")}
                />
              </div>

              {tycoon && (
                <Field label="Số người chơi (bạn + máy)">
                  <Segmented
                    options={[2, 3, 4].map((n) => ({ value: n, label: String(n) }))}
                    value={players}
                    onChange={setPlayers}
                  />
                </Field>
              )}

              {mode === "ai" && (
                <Field label="Mức khó của máy">
                  <Segmented
                    options={difficulties.map((d) => ({ value: d.value, label: d.label, icon: d.icon }))}
                    value={difficulty}
                    onChange={setDifficulty}
                  />
                </Field>
              )}

              {tycoon ? (
                <Field label="Số vòng">
                  <Segmented
                    options={[20, 30, 40].map((n) => ({ value: n, label: String(n) }))}
                    value={rounds}
                    onChange={setRounds}
                  />
                </Field>
              ) : (
                <Field label="Bạn đi">
                  <Segmented
                    options={[
                      { value: "first" as First, label: game.firstMove[0] },
                      { value: "second" as First, label: game.firstMove[1] },
                      { value: "random" as First, label: "Ngẫu nhiên" },
                    ]}
                    value={first}
                    onChange={setFirst}
                  />
                </Field>
              )}

              <DemoButton
                size="lg"
                className="mt-5 w-full"
                message="Logic chơi cờ sẽ có ở giai đoạn sau."
                description={`${game.title} · ${subtitle}${tycoon ? ` · ${players} người · ${rounds} vòng` : ""}`}
              >
                <Image src={iconSrc("gamepad")} alt="" width={22} height={22} className="size-5" />
                Bắt đầu chơi
              </DemoButton>
              <p className="mt-3 text-center text-xs font-bold text-ink-3">
                Không cần tài khoản · không cần cài app
              </p>
            </section>

            <section id="luat" className="scroll-mt-24 rounded-[24px] border-2 border-line bg-white p-5 md:p-6">
              <h2 className="text-[22px] leading-tight">Luật nhanh</h2>
              <ol className="mt-4 flex flex-col gap-4">
                {game.rules.map((rule, i) => (
                  <li key={rule.title} className="flex items-start gap-3">
                    <span className={cn("inline-flex size-8 shrink-0 items-center justify-center rounded-full border-2 border-ink/15 text-sm font-extrabold text-ink", toneSolid[game.tone])}>
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="text-base leading-snug font-extrabold">{rule.title}</h3>
                      <p className="mt-0.5 text-sm leading-relaxed text-ink-3">{rule.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
              {tycoon && (
                <DemoButton variant="ghost" size="sm" className="mt-5 w-full" message="Luật chi tiết sẽ bổ sung sau.">
                  Luật chi tiết &amp; mẹo đầu tư
                </DemoButton>
              )}
            </section>

            <p className="text-xs leading-relaxed text-ink-3">
              Góc giải trí cộng đồng · miễn phí, không quảng cáo, không cần tài khoản.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

function PlayerBar({ label, tycoon }: { label: string; tycoon?: boolean }) {
  if (tycoon) return null;
  return (
    <div className="rounded-2xl bg-cream/90 px-4 py-2.5 text-sm font-extrabold text-ink backdrop-blur-sm">{label}</div>
  );
}

function TycoonPlayerCard({ name, color, side }: { name: string; color: string; side: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-cream/90 px-4 py-3 backdrop-blur-sm">
      <span className={cn("size-9 shrink-0 rounded-full border-2 border-white shadow", color)} />
      <div className="min-w-0">
        <p className="truncate text-xs font-bold text-ink-3">
          {name} · {side}
        </p>
        <p className="font-display text-xl leading-tight font-extrabold text-ink">1.200</p>
        <p className="text-[11px] font-bold text-ink-3">0 ô đất · 0 nhà</p>
      </div>
    </div>
  );
}

function ModeCard({
  active,
  icon,
  iconTone,
  title,
  description,
  onClick,
}: {
  active: boolean;
  icon: string;
  iconTone: "lilac" | "mint";
  title: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "flex w-full cursor-pointer items-center gap-3 rounded-2xl border-2 bg-white p-3 text-left transition-colors outline-none focus-visible:ring-4 focus-visible:ring-focus",
        active ? "border-ink shadow-hard-sm" : "border-line hover:border-ink-4",
      )}
    >
      <span className={cn("inline-flex size-11 shrink-0 items-center justify-center rounded-xl", toneBg[iconTone])}>
        <Image src={iconSrc(icon)} alt="" width={28} height={28} className="size-7" />
      </span>
      <span>
        <span className="block text-base font-extrabold text-ink">{title}</span>
        <span className="block text-xs font-bold text-ink-3">{description}</span>
      </span>
    </button>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mt-5">
      <p className="mb-2 text-xs font-extrabold tracking-[0.08em] text-ink-2 uppercase">{label}</p>
      {children}
    </div>
  );
}

function Segmented<T extends string | number>({
  options,
  value,
  onChange,
}: {
  options: { value: T; label: string; icon?: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div role="group" className="grid gap-1 rounded-2xl border-2 border-line bg-white p-1" style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}>
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={String(o.value)}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(o.value)}
            className={cn(
              "inline-flex h-10 cursor-pointer items-center justify-center gap-1.5 rounded-xl px-2 text-sm font-extrabold whitespace-nowrap transition-colors outline-none focus-visible:ring-4 focus-visible:ring-focus",
              active ? "bg-yellow text-ink shadow-hard-sm" : "text-ink-2 hover:text-ink",
            )}
          >
            {o.icon && <Image src={iconSrc(o.icon)} alt="" width={18} height={18} className="size-4" />}
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
