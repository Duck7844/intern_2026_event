"use client";

import * as React from "react";
import Image from "next/image";
import confetti from "canvas-confetti";

import { HistoryBar, type HistoryEntry, newEntry } from "@/components/play/history-bar";
import { PlayStage } from "@/components/play/play-stage";
import { PlayToolbar } from "@/components/play/play-toolbar";
import { QuickEditDialog, ResultDialog, inputClass, labelClass } from "@/components/play/quick-edit-dialog";
import { Button } from "@/components/ui/button";
import { type FortuneStick, fortuneSticks } from "@/data/play";
import { IMG, iconSrc } from "@/lib/assets";
import { useLocalStorage } from "@/lib/use-local-storage";
import { cn } from "@/lib/utils";

const STAGE_ID = "fortune-stage";
const EMPTY_HISTORY: HistoryEntry[] = [];
const MIN_HOLD_MS = 350;
const YEAR_LABEL = "Bính Ngọ 2026";

export function FortuneSticksGame() {
  const [history, setHistory] = useLocalStorage<HistoryEntry[]>("skv.play.fortune.history", EMPTY_HISTORY);
  const [wish, setWish] = useLocalStorage<string>("skv.play.fortune.wish", "");

  const [name, setName] = React.useState("");
  const [holding, setHolding] = React.useState(false);
  const [power, setPower] = React.useState(0);
  const [stick, setStick] = React.useState<FortuneStick | null>(null);
  const [resultOpen, setResultOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  const [draftWish, setDraftWish] = React.useState("");
  const holdStart = React.useRef(0);
  const powerTimer = React.useRef<number | null>(null);

  function startHold() {
    if (holding || resultOpen) return;
    holdStart.current = Date.now();
    setHolding(true);
    setPower(0);
    powerTimer.current = window.setInterval(() => setPower((p) => Math.min(p + 1, 10)), 180);
  }

  function endHold() {
    if (!holding) return;
    if (powerTimer.current) clearInterval(powerTimer.current);
    setHolding(false);
    const held = Date.now() - holdStart.current;
    setPower(0);
    if (held < MIN_HOLD_MS) return;
    const pick = fortuneSticks[Math.floor(Math.random() * fortuneSticks.length)];
    setStick(pick);
    setResultOpen(true);
    setHistory((h) => [...h, newEntry(`Quẻ ${pick.number} · ${pick.title}${name ? ` · ${name}` : ""}`)]);
    confetti({ particleCount: 90, spread: 60, origin: { y: 0.55 }, colors: ["#ffd58a", "#e8453c", "#ffffff"] });
  }

  React.useEffect(() => () => {
    if (powerTimer.current) clearInterval(powerTimer.current);
  }, []);

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.code === "Space" && !e.repeat) {
      e.preventDefault();
      startHold();
    }
  }
  function onKeyUp(e: React.KeyboardEvent) {
    if (e.code === "Space") {
      e.preventDefault();
      endHold();
    }
  }

  const shakeDuration = `${Math.max(0.09, 0.32 - power * 0.024)}s`;

  return (
    <>
      <PlayToolbar
        stageId={STAGE_ID}
        onEdit={() => {
          setDraftWish(wish);
          setEditOpen(true);
        }}
      />

      <div className="wrap py-6">
        <PlayStage
          id={STAGE_ID}
          eyebrow="Xin lộc đầu năm"
          title={`Xin xăm đầu năm ${YEAR_LABEL}`}
          subtitle="Thành tâm khấn nguyện, rồi lắc ống xăm cho đến khi một que rơi ra"
          background={IMG.xinxamBg}
          overlayClassName="bg-[linear-gradient(180deg,rgba(0,0,0,0.35),rgba(0,0,0,0.15)_40%,rgba(0,0,0,0.45))]"
        >
          <label className="mt-4 w-full max-w-xs">
            <span className="sr-only">Tên người xin quẻ</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tên người xin quẻ (không bắt buộc)"
              className={cn(inputClass, "border-white/30 bg-white/90 text-center")}
            />
          </label>

          <div className="relative mt-4 flex flex-1 items-end justify-center">
            <div
              className={cn("relative h-56 w-40 md:h-72 md:w-52", holding && "animate-shake motion-reduce:animate-none")}
              style={{ "--shake-duration": shakeDuration } as React.CSSProperties}
            >
              <Image
                src={IMG.xinxamTube}
                alt="Ống xăm"
                fill
                sizes="(min-width: 768px) 208px, 160px"
                className="object-contain drop-shadow-[0_16px_24px_rgba(0,0,0,0.45)]"
              />
            </div>
          </div>

          <Button
            size="lg"
            onPointerDown={startHold}
            onPointerUp={endHold}
            onPointerLeave={endHold}
            onPointerCancel={endHold}
            onKeyDown={onKeyDown}
            onKeyUp={onKeyUp}
            onContextMenu={(e) => e.preventDefault()}
            className={cn(
              "mt-6 min-w-56 touch-none border-yellow-deep bg-yellow text-ink shadow-[0_5px_0_0_var(--color-yellow-deep)] select-none hover:bg-yellow",
              holding && "translate-y-[2px] shadow-none",
            )}
          >
            <Image src={iconSrc("sparkles")} alt="" width={22} height={22} className="size-5" />
            {holding ? "Đang lắc…" : "Lắc ống xăm"}
          </Button>
          <p className="mt-3 text-center text-xs font-bold text-white/85">
            Nhấn giữ nút (hoặc giữ phím Space), thả tay để quẻ rơi
          </p>
        </PlayStage>

        <HistoryBar
          title="Quẻ đã xin"
          entries={history}
          onClear={() => setHistory([])}
          note="Muốn cả công ty cùng xin quẻ trong sự kiện?"
        />
      </div>

      <ResultDialog
        open={resultOpen}
        onOpenChange={setResultOpen}
        title={stick ? `Quẻ số ${stick.number} · ${stick.grade}` : ""}
        actions={
          <Button size="sm" onClick={() => setResultOpen(false)}>
            Xin quẻ khác
          </Button>
        }
      >
        {stick && (
          <div className="flex flex-col gap-4">
            {name && <p className="text-sm font-bold text-ink-3">Quẻ của {name}</p>}
            <p className="font-display text-2xl font-extrabold text-bar">{stick.title}</p>
            <blockquote className="rounded-2xl border-2 border-dashed border-yellow-deep bg-note-bg px-4 py-3 font-display text-base leading-relaxed text-note italic">
              {stick.poem.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </blockquote>
            <div className="text-left text-sm leading-relaxed text-ink-2">
              <p>
                <span className="font-extrabold text-ink">Lời giải: </span>
                {stick.meaning}
              </p>
              <p className="mt-2">
                <span className="font-extrabold text-ink">Lời chúc: </span>
                {stick.wish}
              </p>
              {wish && (
                <p className="mt-2 rounded-xl bg-cream px-3 py-2 font-bold text-ink">{wish}</p>
              )}
            </div>
          </div>
        )}
      </ResultDialog>

      <QuickEditDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        title="Sửa nhanh xin xăm"
        description="Lời chúc của công ty sẽ hiện ở cuối mỗi quẻ."
        onSave={() => {
          setWish(draftWish.trim());
          setEditOpen(false);
        }}
      >
        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>Lời chúc của công ty</span>
          <textarea
            value={draftWish}
            onChange={(e) => setDraftWish(e.target.value)}
            rows={3}
            placeholder="Ví dụ: Công ty ABC chúc bạn năm mới an khang thịnh vượng!"
            className="w-full rounded-[14px] border-2 border-line-2 p-3 text-sm font-bold text-ink focus:border-ink-4 focus:outline-none focus-visible:ring-4 focus-visible:ring-focus"
          />
        </label>
      </QuickEditDialog>
    </>
  );
}
