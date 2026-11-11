"use client";

import * as React from "react";
import confetti from "canvas-confetti";
import { toast } from "sonner";

import { HistoryBar, type HistoryEntry, newEntry } from "@/components/play/history-bar";
import { PlayStage } from "@/components/play/play-stage";
import { PlayToolbar } from "@/components/play/play-toolbar";
import { QuickEditDialog, ResultDialog, labelClass } from "@/components/play/quick-edit-dialog";
import { Button } from "@/components/ui/button";
import { defaultWheelNames, wheelSegments } from "@/data/play";
import { IMG } from "@/lib/assets";
import { useLocalStorage } from "@/lib/use-local-storage";
import { cn } from "@/lib/utils";

const STAGE_ID = "wheel-stage";
const EMPTY_HISTORY: HistoryEntry[] = [];
const SPIN_MS = 5200;

/** Đường path múi tròn từ góc a0 đến a1 (độ, 0 = 12 giờ, chiều kim đồng hồ). */
function segmentPath(a0: number, a1: number, r = 190, cx = 200, cy = 200) {
  const toXY = (a: number) => {
    const rad = ((a - 90) * Math.PI) / 180;
    return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)] as const;
  };
  const [x0, y0] = toXY(a0);
  const [x1, y1] = toXY(a1);
  const large = a1 - a0 > 180 ? 1 : 0;
  return `M ${cx} ${cy} L ${x0} ${y0} A ${r} ${r} 0 ${large} 1 ${x1} ${y1} Z`;
}

export function WheelGame() {
  const [names, setNames] = useLocalStorage<string[]>("skv.play.wheel.names", defaultWheelNames);
  const [history, setHistory] = useLocalStorage<HistoryEntry[]>("skv.play.wheel.history", EMPTY_HISTORY);

  const [rotation, setRotation] = React.useState(0);
  const [spinning, setSpinning] = React.useState(false);
  const [winner, setWinner] = React.useState<string | null>(null);
  const [resultOpen, setResultOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  const [draft, setDraft] = React.useState("");

  const n = Math.max(names.length, 1);
  const seg = 360 / n;

  function spin() {
    if (spinning || names.length < 2) {
      if (names.length < 2) toast("Cần ít nhất 2 tên để quay. Bấm Sửa nhanh để thêm.");
      return;
    }
    const target = Math.floor(Math.random() * names.length);
    const center = target * seg + seg / 2; // góc tâm múi, tính từ 12 giờ
    const current = ((rotation % 360) + 360) % 360;
    const delta = (360 - center - current + 360) % 360; // xoay thêm để tâm múi lên đỉnh
    const turns = 5 + Math.floor(Math.random() * 3);
    setWinner(names[target]);
    setSpinning(true);
    setRotation(rotation + turns * 360 + delta);
  }

  function onSpinEnd() {
    if (!spinning) return;
    setSpinning(false);
    setResultOpen(true);
    if (winner) setHistory((h) => [...h, newEntry(winner)]);
    confetti({ particleCount: 140, spread: 75, origin: { y: 0.6 }, colors: ["#e8453c", "#ffd58a", "#fff1d6", "#f0b85a"] });
  }

  function removeWinner() {
    if (!winner) return;
    setNames(names.filter((x) => x !== winner));
    setResultOpen(false);
  }

  function openEdit() {
    setDraft(names.join("\n"));
    setEditOpen(true);
  }

  function saveEdit() {
    const list = draft
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean)
      .slice(0, 24);
    if (list.length < 2) {
      toast("Nhập ít nhất 2 tên, mỗi tên một dòng.");
      return;
    }
    setNames(list);
    setEditOpen(false);
  }

  return (
    <>
      <PlayToolbar stageId={STAGE_ID} onEdit={openEdit} />

      <div className="wrap py-6">
        <PlayStage
          id={STAGE_ID}
          title="Vòng quay may mắn"
          subtitle="Ai sẽ là người may mắn hôm nay?"
          background={IMG.wheelTet}
        >
          <div className="relative mt-4 w-full max-w-[460px]">
            {/* Kim chỉ */}
            <div
              aria-hidden="true"
              className="absolute top-[-6px] left-1/2 z-20 h-0 w-0 -translate-x-1/2 border-x-[16px] border-t-[30px] border-x-transparent border-t-yellow drop-shadow-[0_2px_0_rgba(59,53,96,0.6)]"
            />

            <svg
              viewBox="0 0 400 400"
              role="img"
              aria-label={`Vòng quay có ${names.length} tên`}
              className="h-auto w-full drop-shadow-[0_10px_24px_rgba(0,0,0,0.35)]"
              style={{
                transform: `rotate(${rotation}deg)`,
                transition: spinning ? `transform ${SPIN_MS}ms cubic-bezier(0.17, 0.67, 0.12, 0.99)` : "none",
              }}
              onTransitionEnd={onSpinEnd}
            >
              <circle cx="200" cy="200" r="198" fill="#f0b85a" />
              {names.map((name, i) => {
                const a0 = i * seg;
                const a1 = (i + 1) * seg;
                const mid = a0 + seg / 2;
                const color = wheelSegments[i % wheelSegments.length];
                return (
                  <g key={`${name}-${i}`}>
                    <path d={segmentPath(a0, a1)} fill={color.fill} stroke="#f0b85a" strokeWidth="2" />
                    <g transform={`rotate(${mid - 90} 200 200)`}>
                      <text
                        x="318"
                        y="200"
                        textAnchor="end"
                        dominantBaseline="middle"
                        fill={color.text}
                        fontFamily="var(--font-display)"
                        fontWeight="800"
                        fontSize={n > 12 ? 15 : n > 8 ? 18 : 22}
                      >
                        {name.length > 12 ? `${name.slice(0, 11)}…` : name}
                      </text>
                    </g>
                  </g>
                );
              })}
              <circle cx="200" cy="200" r="58" fill="#f0b85a" />
            </svg>

            <button
              type="button"
              onClick={spin}
              disabled={spinning}
              className={cn(
                "absolute top-1/2 left-1/2 z-20 flex size-24 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border-[6px] border-yellow bg-bar font-display text-xl font-extrabold text-white shadow-[0_4px_0_0_rgba(0,0,0,0.3)] transition-transform outline-none hover:scale-105 focus-visible:ring-4 focus-visible:ring-focus active:scale-95 disabled:cursor-wait disabled:opacity-90 md:size-28 md:text-2xl",
              )}
            >
              QUAY
            </button>
          </div>
        </PlayStage>

        <HistoryBar
          entries={history}
          onClear={() => setHistory([])}
          note="Chơi thử không cần tài khoản. Cần dùng cho sự kiện của công ty?"
        />
      </div>

      <ResultDialog
        open={resultOpen}
        onOpenChange={setResultOpen}
        title="🎉 Chúc mừng!"
        actions={
          <>
            <Button size="sm" onClick={() => setResultOpen(false)}>
              Quay tiếp
            </Button>
            <Button variant="ghost" size="sm" onClick={removeWinner}>
              Bỏ khỏi vòng
            </Button>
          </>
        }
      >
        <p className="font-display text-4xl font-extrabold text-bar">{winner}</p>
        <p className="mt-1 text-sm text-ink-3">là người may mắn của lượt quay này</p>
      </ResultDialog>

      <QuickEditDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        title="Sửa nhanh vòng quay"
        description="Mỗi dòng một tên hoặc phần quà, tối đa 24 mục."
        onSave={saveEdit}
      >
        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>Danh sách</span>
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            rows={8}
            className="w-full rounded-[14px] border-2 border-line-2 p-3 text-sm font-bold text-ink focus:border-ink-4 focus:outline-none focus-visible:ring-4 focus-visible:ring-focus"
          />
        </label>
      </QuickEditDialog>
    </>
  );
}
