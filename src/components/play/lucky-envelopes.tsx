"use client";

import * as React from "react";
import Image from "next/image";
import confetti from "canvas-confetti";
import { toast } from "sonner";

import { HistoryBar, type HistoryEntry, newEntry } from "@/components/play/history-bar";
import { PlayStage } from "@/components/play/play-stage";
import { PlayToolbar } from "@/components/play/play-toolbar";
import { QuickEditDialog, ResultDialog, labelClass } from "@/components/play/quick-edit-dialog";
import { Button } from "@/components/ui/button";
import { CONSOLATION, ENVELOPE_COUNT, type Prize, defaultPrizes } from "@/data/play";
import { iconSrc } from "@/lib/assets";
import { useLocalStorage } from "@/lib/use-local-storage";
import { cn } from "@/lib/utils";

const STAGE_ID = "lixi-stage";
const EMPTY_HISTORY: HistoryEntry[] = [];

type Board = {
  /** Thứ tự hiển thị các bao (index 0..15) */
  order: number[];
  /** Giải gán cho từng bao theo index */
  assignment: string[];
  /** Bao đã mở: index -> true */
  opened: Record<number, boolean>;
};

function shuffle<T>(arr: T[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildBoard(prizes: Prize[]): Board {
  const pool: string[] = [];
  prizes.forEach((p) => {
    for (let i = 0; i < p.qty; i++) pool.push(p.name);
  });
  while (pool.length < ENVELOPE_COUNT) pool.push(CONSOLATION);
  return {
    order: shuffle(Array.from({ length: ENVELOPE_COUNT }, (_, i) => i)),
    assignment: shuffle(pool).slice(0, ENVELOPE_COUNT),
    opened: {},
  };
}

const INITIAL_BOARD: Board = {
  order: Array.from({ length: ENVELOPE_COUNT }, (_, i) => i),
  assignment: Array(ENVELOPE_COUNT).fill(""),
  opened: {},
};

function prizesToText(prizes: Prize[]) {
  return prizes.map((p) => `${p.name} x${p.qty}`).join("\n");
}

function textToPrizes(text: string): Prize[] {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const m = line.match(/^(.*?)\s*[x×]\s*(\d+)\s*$/i);
      return m ? { name: m[1].trim(), qty: Math.max(1, Number(m[2])) } : { name: line, qty: 1 };
    });
}

export function LuckyEnvelopesGame() {
  const [prizes, setPrizes] = useLocalStorage<Prize[]>("skv.play.lixi.prizes", defaultPrizes);
  const [board, setBoard] = useLocalStorage<Board>("skv.play.lixi.board", INITIAL_BOARD);
  const [history, setHistory] = useLocalStorage<HistoryEntry[]>("skv.play.lixi.history", EMPTY_HISTORY);

  const [picked, setPicked] = React.useState<{ index: number; prize: string } | null>(null);
  const [resultOpen, setResultOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  const [draft, setDraft] = React.useState("");

  // Bàn chưa gán giải (lần đầu) -> gán ngay khi người dùng tương tác
  const ready = board.assignment.every(Boolean);
  const openedCount = Object.keys(board.opened).length;
  const remaining = ENVELOPE_COUNT - openedCount;

  function ensureBoard(): Board {
    if (ready) return board;
    const b = buildBoard(prizes);
    setBoard(b);
    return b;
  }

  function openEnvelope(index: number) {
    const b = ensureBoard();
    const prize = b.assignment[index];
    if (b.opened[index]) {
      setPicked({ index, prize });
      setResultOpen(true);
      return;
    }
    setBoard({ ...b, opened: { ...b.opened, [index]: true } });
    setPicked({ index, prize });
    setResultOpen(true);
    setHistory((h) => [...h, newEntry(`Bao ${index + 1}: ${prize}`)]);
    if (prize !== CONSOLATION) {
      confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 }, colors: ["#e8453c", "#ffd58a", "#ffffff"] });
    }
  }

  function reshuffle() {
    const b = ensureBoard();
    setBoard({ ...b, order: shuffle(b.order) });
  }

  function restart() {
    setBoard(buildBoard(prizes));
    toast("Đã chia lại 16 bao lì xì.");
  }

  function openEdit() {
    setDraft(prizesToText(prizes));
    setEditOpen(true);
  }

  function saveEdit() {
    const list = textToPrizes(draft);
    const totalQty = list.reduce((s, p) => s + p.qty, 0);
    if (list.length === 0 || totalQty > ENVELOPE_COUNT) {
      toast(`Tổng số giải tối đa ${ENVELOPE_COUNT}.`);
      return;
    }
    setPrizes(list);
    setBoard(buildBoard(list));
    setEditOpen(false);
  }

  return (
    <>
      <PlayToolbar stageId={STAGE_ID} onEdit={openEdit} />

      <div className="wrap py-6">
        <PlayStage
          id={STAGE_ID}
          eyebrow="Chúc mừng năm mới"
          title="Lì xì đầu xuân"
          subtitle="Mỗi người chọn một bao, lộc đến bất ngờ!"
          className="bg-[radial-gradient(ellipse_at_top,#d7262a_0%,#b1151c_55%,#7a0e14_100%)]"
        >
          <ul className="mt-6 grid w-full max-w-3xl grid-cols-4 gap-3 md:grid-cols-6 md:gap-5" aria-label="16 bao lì xì">
            {board.order.map((index) => {
              const opened = Boolean(board.opened[index]);
              const seal = index % 2 === 0 ? "Lộc" : "Phúc";
              return (
                <li key={index}>
                  <button
                    type="button"
                    onClick={() => openEnvelope(index)}
                    aria-label={`Bao lì xì số ${index + 1}${opened ? ", đã mở" : ""}`}
                    className={cn(
                      "group relative aspect-[3/4] w-full cursor-pointer overflow-hidden rounded-xl border-2 outline-none transition-transform focus-visible:ring-4 focus-visible:ring-yellow",
                      opened
                        ? "border-yellow/60 bg-cream"
                        : "border-yellow-deep bg-[linear-gradient(180deg,#f04a3c_0%,#c8161c_100%)] shadow-[0_4px_0_0_#7a0e14] hover:-translate-y-1",
                    )}
                  >
                    {opened ? (
                      <span className="flex h-full flex-col items-center justify-center gap-1 p-2 text-center">
                        <Image src={iconSrc("gift")} alt="" width={28} height={28} className="size-7" />
                        <span className="line-clamp-3 text-[11px] leading-tight font-extrabold text-ink">
                          {board.assignment[index]}
                        </span>
                      </span>
                    ) : (
                      <>
                        {/* nắp bao */}
                        <span
                          aria-hidden="true"
                          className="absolute inset-x-0 top-0 h-[36%] bg-[linear-gradient(180deg,#ff6b5a,#e8453c)] [clip-path:polygon(0_0,100%_0,50%_100%)]"
                        />
                        {/* con dấu */}
                        <span className="absolute top-1/2 left-1/2 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-yellow-deep bg-yellow font-display text-xs font-extrabold text-bar shadow-[0_2px_0_0_#b8860b] md:size-12 md:text-sm">
                          {seal}
                        </span>
                        <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 text-[10px] font-extrabold text-yellow/80">
                          {index + 1}
                        </span>
                        {/* viền hoa văn */}
                        <span
                          aria-hidden="true"
                          className="absolute inset-x-2 bottom-1 h-1 border-b-2 border-dotted border-yellow/60"
                        />
                      </>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-black/25 px-3.5 py-2 text-sm font-extrabold text-yellow">
              <Image src={iconSrc("gift")} alt="" width={18} height={18} className="size-4" />
              Còn {remaining}/{ENVELOPE_COUNT} bao
            </span>
            <span className="text-sm font-bold text-white/90">Chạm vào một bao để mở</span>
            <Button variant="dark" size="sm" onClick={reshuffle} className="border-white/20 bg-black/30 shadow-none hover:bg-black/40">
              <Image src={iconSrc("repeat")} alt="" width={18} height={18} className="size-4" />
              Xáo trộn
            </Button>
            <Button variant="dark" size="sm" onClick={restart} className="border-white/20 bg-black/30 shadow-none hover:bg-black/40">
              <Image src={iconSrc("undo")} alt="" width={18} height={18} className="size-4" />
              Chơi lại
            </Button>
          </div>
        </PlayStage>

        <HistoryBar
          entries={history}
          onClear={() => setHistory([])}
          note="Muốn dùng lì xì cho sự kiện của công ty?"
        />
      </div>

      <ResultDialog
        open={resultOpen}
        onOpenChange={setResultOpen}
        title={picked?.prize === CONSOLATION ? "🧧 Bao lì xì" : "🧧 Chúc mừng!"}
        actions={
          <Button size="sm" onClick={() => setResultOpen(false)}>
            Đóng
          </Button>
        }
      >
        <p className="text-sm text-ink-3">Bao số {picked ? picked.index + 1 : ""}</p>
        <p className="mt-1 font-display text-3xl font-extrabold text-bar">{picked?.prize}</p>
      </ResultDialog>

      <QuickEditDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        title="Sửa nhanh lì xì"
        description={`Mỗi dòng một giải, dạng "Tên giải x số lượng". Tổng tối đa ${ENVELOPE_COUNT}, bao còn lại là lời chúc.`}
        onSave={saveEdit}
        saveLabel="Lưu và chia lại"
      >
        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>Danh sách giải</span>
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            rows={6}
            className="w-full rounded-[14px] border-2 border-line-2 p-3 text-sm font-bold text-ink focus:border-ink-4 focus:outline-none focus-visible:ring-4 focus-visible:ring-focus"
          />
        </label>
      </QuickEditDialog>
    </>
  );
}
