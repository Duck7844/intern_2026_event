"use client";

import * as React from "react";
import Image from "next/image";
import confetti from "canvas-confetti";
import { toast } from "sonner";

import { HistoryBar, type HistoryEntry, newEntry } from "@/components/play/history-bar";
import { PlayStage } from "@/components/play/play-stage";
import { PlayToolbar } from "@/components/play/play-toolbar";
import { QuickEditDialog, ResultDialog, inputClass, labelClass } from "@/components/play/quick-edit-dialog";
import { Button } from "@/components/ui/button";
import { type LotterySettings, type LotterySpeed, defaultLottery, lotterySpeeds } from "@/data/play";
import { iconSrc } from "@/lib/assets";
import { useLocalStorage } from "@/lib/use-local-storage";
import { cn } from "@/lib/utils";

const STAGE_ID = "lottery-stage";
const EMPTY_HISTORY: HistoryEntry[] = [];
const BALL_COLORS = ["#e8453c", "#ffd58a", "#4c8dff", "#8edcc5", "#ffffff", "#ffad8f"];

/** Lồng cầu vẽ SVG: khung lưới + bóng màu. Khi quay thì lưới xoay. */
function Cage({ spinning, seed }: { spinning: boolean; seed: number }) {
  const balls = React.useMemo(() => {
    const arr: { x: number; y: number; c: string }[] = [];
    for (let i = 0; i < 9; i++) {
      const a = (seed * 7 + i * 41) % 360;
      const r = 14 + ((seed * 3 + i * 17) % 22);
      arr.push({
        x: 60 + r * Math.cos((a * Math.PI) / 180) * 0.9,
        y: 74 + Math.abs(r * Math.sin((a * Math.PI) / 180)) * 0.5,
        c: BALL_COLORS[(seed + i) % BALL_COLORS.length],
      });
    }
    return arr;
  }, [seed]);

  return (
    <svg viewBox="0 0 120 150" className="h-auto w-full" aria-hidden="true">
      {/* đế */}
      <rect x="40" y="118" width="40" height="8" rx="2" fill="#d9a441" />
      <rect x="54" y="104" width="12" height="16" fill="#d9a441" />
      <rect x="20" y="126" width="80" height="10" rx="3" fill="#e8603c" />
      {/* bóng */}
      {balls.map((b, i) => (
        <circle key={i} cx={b.x} cy={b.y} r="7" fill={b.c} stroke="rgba(0,0,0,0.15)" />
      ))}
      {/* lưới xoay */}
      <g
        className={cn(spinning && "animate-spin")}
        style={{ transformOrigin: "60px 60px", animationDuration: "1.1s" }}
      >
        <circle cx="60" cy="60" r="50" fill="none" stroke="#f5d77a" strokeWidth="3" />
        <ellipse cx="60" cy="60" rx="50" ry="18" fill="none" stroke="#f5d77a" strokeWidth="2" />
        <ellipse cx="60" cy="60" rx="18" ry="50" fill="none" stroke="#f5d77a" strokeWidth="2" />
        <ellipse cx="60" cy="60" rx="50" ry="38" fill="none" stroke="#f5d77a" strokeWidth="1.5" />
        <ellipse cx="60" cy="60" rx="38" ry="50" fill="none" stroke="#f5d77a" strokeWidth="1.5" />
      </g>
      {/* tay quay */}
      <path d="M110 60 h8 v-4 h4 v12 h-4 v-4 h-8z" fill="#e8453c" />
    </svg>
  );
}

export function LotteryGame() {
  const [settings, setSettings] = useLocalStorage<LotterySettings>("skv.play.lottery.settings", defaultLottery);
  const [history, setHistory] = useLocalStorage<HistoryEntry[]>("skv.play.lottery.history", EMPTY_HISTORY);

  const digits = Math.max(String(settings.max).length, 2);
  const drawn = React.useMemo(
    () => new Set(history.map((h) => Number(h.label)).filter((x) => !Number.isNaN(x))),
    [history],
  );
  const total = settings.max - settings.min + 1;
  const remaining = Math.max(total - drawn.size, 0);

  const [display, setDisplay] = React.useState<string[]>(() => Array(digits).fill("?"));
  const [drawing, setDrawing] = React.useState(false);
  const [result, setResult] = React.useState<number | null>(null);
  const [resultOpen, setResultOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  const [draft, setDraft] = React.useState<LotterySettings>(defaultLottery);
  const timers = React.useRef<number[]>([]);

  React.useEffect(() => () => timers.current.forEach(clearTimeout), []);

  function draw() {
    if (drawing) return;
    if (remaining === 0) {
      toast("Đã bốc hết số. Bấm Sửa nhanh để đặt lại.");
      return;
    }
    let pick: number;
    do {
      pick = settings.min + Math.floor(Math.random() * total);
    } while (drawn.has(pick));
    const finalDigits = String(pick).padStart(digits, "0").split("");
    const ms = lotterySpeeds[settings.speed].ms;

    setDrawing(true);
    setResult(pick);
    const locked = Array<boolean>(digits).fill(false);
    const interval = window.setInterval(() => {
      setDisplay((d) => d.map((v, i) => (locked[i] ? v : String(Math.floor(Math.random() * 10)))));
    }, 70);
    timers.current.push(interval);

    finalDigits.forEach((ch, i) => {
      const t = window.setTimeout(
        () => {
          locked[i] = true;
          setDisplay((d) => d.map((v, j) => (j === i ? ch : v)));
          if (i === digits - 1) {
            clearInterval(interval);
            setDrawing(false);
            setResultOpen(true);
            setHistory((h) => [...h, newEntry(String(pick))]);
            confetti({ particleCount: 160, spread: 80, origin: { y: 0.6 } });
          }
        },
        ms * (0.55 + (0.45 * (i + 1)) / digits),
      );
      timers.current.push(t);
    });
  }

  function openEdit() {
    setDraft(settings);
    setEditOpen(true);
  }

  function saveEdit() {
    const min = Math.max(0, Math.floor(draft.min));
    const max = Math.floor(draft.max);
    if (!(max > min)) {
      toast("Số lớn nhất phải lớn hơn số nhỏ nhất.");
      return;
    }
    if (max - min + 1 > 100000) {
      toast("Khoảng số tối đa 100.000.");
      return;
    }
    setSettings({ min, max, speed: draft.speed });
    setDisplay(Array(Math.max(String(max).length, 2)).fill("?"));
    setEditOpen(false);
  }

  function resetDrawn() {
    setHistory([]);
    setDisplay(Array(digits).fill("?"));
    setEditOpen(false);
    toast("Đã đặt lại, có thể bốc lại từ đầu.");
  }

  return (
    <>
      <PlayToolbar stageId={STAGE_ID} onEdit={openEdit} />

      <div className="wrap py-6">
        <PlayStage
          id={STAGE_ID}
          title="Bốc thăm trúng thưởng"
          subtitle="Chúc mọi người may mắn!"
          className="bg-[radial-gradient(ellipse_at_top,#6b5bb5_0%,#3b3560_45%,#1f1b3d_100%)]"
        >
          <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-black/25 px-3.5 py-1.5 text-xs font-extrabold text-white/90">
            <span className={cn("size-2 rounded-full", drawing ? "animate-pulse bg-yellow" : "bg-mint")} />
            {drawing ? "Đang quay lồng…" : "Máy sẵn sàng · bấm Bốc thăm để quay lồng"}
          </p>

          <div className="mt-4 w-full max-w-3xl rounded-[24px] bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] p-4 md:p-6">
            <div className={cn("mx-auto grid gap-3 md:gap-6", digits <= 3 ? "grid-cols-3" : "grid-cols-4")}>
              {Array.from({ length: digits }).map((_, i) => (
                <Cage key={i} spinning={drawing && display[i] !== undefined} seed={i + 3} />
              ))}
            </div>
            <div className="mx-auto mt-2 h-3 w-[90%] rounded-full bg-[#e8603c] shadow-[0_6px_0_0_#a63d25]" />
          </div>

          <div className="mt-6 flex gap-2 md:gap-3" aria-live="polite" aria-label="Số bốc được">
            {display.map((ch, i) => (
              <span
                key={i}
                className="flex h-16 w-12 items-center justify-center rounded-xl border-2 border-yellow/60 bg-black/30 font-display text-3xl font-extrabold text-yellow md:h-20 md:w-16 md:text-4xl"
              >
                {ch}
              </span>
            ))}
          </div>

          <Button
            size="lg"
            onClick={draw}
            disabled={drawing}
            className="mt-5 min-w-56 border-yellow-deep bg-yellow text-ink shadow-[0_5px_0_0_var(--color-yellow-deep)] hover:bg-yellow"
          >
            <Image src={iconSrc("ticket")} alt="" width={22} height={22} className="size-5" />
            Bốc thăm
          </Button>

          <ul className="mt-5 flex flex-wrap justify-center gap-2 text-xs font-extrabold text-white/90">
            <li className="inline-flex items-center gap-1.5 rounded-full bg-black/25 px-3 py-1.5">
              <Image src={iconSrc("numbers")} alt="" width={16} height={16} className="size-4" />
              Từ {settings.min} đến {settings.max}
            </li>
            <li className="inline-flex items-center gap-1.5 rounded-full bg-black/25 px-3 py-1.5">
              <Image src={iconSrc("target")} alt="" width={16} height={16} className="size-4" />
              {digits} lồng · còn {remaining} số
            </li>
            <li className="inline-flex items-center gap-1.5 rounded-full bg-black/25 px-3 py-1.5">
              <Image src={iconSrc("timer")} alt="" width={16} height={16} className="size-4" />
              {lotterySpeeds[settings.speed].label}
            </li>
          </ul>
          <p className="mt-3 text-center text-xs text-white/60">
            Kết quả được chọn ngẫu nhiên bằng máy tính; lồng cầu chỉ mô phỏng quá trình bốc thăm.
          </p>
        </PlayStage>

        <HistoryBar
          entries={history}
          onClear={() => {
            setHistory([]);
            setDisplay(Array(digits).fill("?"));
          }}
          note="Chơi thử không cần tài khoản. Cần dùng cho sự kiện của công ty?"
        />
      </div>

      <ResultDialog
        open={resultOpen}
        onOpenChange={setResultOpen}
        title="🎟️ Số trúng thưởng"
        actions={
          <Button size="sm" onClick={() => setResultOpen(false)}>
            Tiếp tục
          </Button>
        }
      >
        <p className="font-display text-6xl font-extrabold text-bar">{result}</p>
        <p className="mt-1 text-sm text-ink-3">Còn {remaining} số chưa bốc</p>
      </ResultDialog>

      <QuickEditDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        title="Sửa nhanh bốc thăm"
        description="Khoảng số theo vé hoặc số ghế. Số đã bốc sẽ không lặp lại."
        onSave={saveEdit}
      >
        <div className="grid grid-cols-2 gap-3">
          <label className="flex flex-col gap-1.5">
            <span className={labelClass}>Từ số</span>
            <input
              type="number"
              inputMode="numeric"
              value={draft.min}
              onChange={(e) => setDraft({ ...draft, min: Number(e.target.value) })}
              className={inputClass}
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className={labelClass}>Đến số</span>
            <input
              type="number"
              inputMode="numeric"
              value={draft.max}
              onChange={(e) => setDraft({ ...draft, max: Number(e.target.value) })}
              className={inputClass}
            />
          </label>
        </div>
        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>Tốc độ quay</span>
          <select
            value={draft.speed}
            onChange={(e) => setDraft({ ...draft, speed: e.target.value as LotterySpeed })}
            className={inputClass}
          >
            {(Object.keys(lotterySpeeds) as LotterySpeed[]).map((k) => (
              <option key={k} value={k}>
                {lotterySpeeds[k].label}
              </option>
            ))}
          </select>
        </label>
        <Button variant="subtle" size="sm" className="self-start" onClick={resetDrawn}>
          <Image src={iconSrc("undo")} alt="" width={18} height={18} className="size-4" />
          Đặt lại số đã bốc ({drawn.size})
        </Button>
      </QuickEditDialog>
    </>
  );
}
