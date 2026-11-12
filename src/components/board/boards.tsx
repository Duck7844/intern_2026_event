import Image from "next/image";

import { type BoardKind, tycoonCells } from "@/data/board-games";
import { iconSrc } from "@/lib/assets";
import { toneSolid } from "@/lib/tones";
import { cn } from "@/lib/utils";

/**
 * Các bàn cờ tĩnh (xem trước) cho 7 trò. Chỉ render thế cờ ban đầu, chưa có logic đi quân.
 * `flipped` xoay bàn 180° (nút "Xoay bàn").
 */
type BoardProps = { flipped?: boolean; className?: string };

const WOOD = "#b8865b";
const LIGHT = "#f3dfbd";
const INK = "#3b3560";

/* ---------------- Cờ vua ---------------- */
const CHESS_BACK = ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"];
const CHESS_BACK_W = ["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"];

export function ChessBoard({ flipped, className }: BoardProps) {
  const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const cell = 50;
  const pieceAt = (r: number, c: number) => {
    if (r === 0) return { ch: CHESS_BACK[c], white: false };
    if (r === 1) return { ch: "♟", white: false };
    if (r === 6) return { ch: "♙", white: true };
    if (r === 7) return { ch: CHESS_BACK_W[c], white: true };
    return null;
  };
  return (
    <svg viewBox="0 0 440 440" className={cn("h-auto w-full", className)} role="img" aria-label="Bàn cờ vua, thế cờ ban đầu">
      <rect x="0" y="0" width="440" height="440" rx="10" fill="#7a4f2a" />
      <g transform={flipped ? "rotate(180 220 220)" : undefined}>
        {Array.from({ length: 64 }).map((_, i) => {
          const r = Math.floor(i / 8);
          const c = i % 8;
          const dark = (r + c) % 2 === 1;
          const p = pieceAt(r, c);
          return (
            <g key={i}>
              <rect x={20 + c * cell} y={20 + r * cell} width={cell} height={cell} fill={dark ? WOOD : LIGHT} />
              {p && (
                <text
                  x={20 + c * cell + cell / 2}
                  y={20 + r * cell + cell / 2 + 2}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="38"
                  fill={p.white ? "#fffaf0" : INK}
                  stroke={INK}
                  strokeWidth={p.white ? 1.2 : 0}
                  transform={flipped ? `rotate(180 ${20 + c * cell + cell / 2} ${20 + r * cell + cell / 2})` : undefined}
                >
                  {p.ch}
                </text>
              )}
            </g>
          );
        })}
        {files.map((f, i) => (
          <text key={f} x={20 + i * cell + cell / 2} y="432" textAnchor="middle" fontSize="12" fontWeight="800" fill="#f3dfbd">
            {flipped ? files[7 - i] : f}
          </text>
        ))}
        {Array.from({ length: 8 }).map((_, i) => (
          <text key={i} x="10" y={20 + i * cell + cell / 2 + 4} textAnchor="middle" fontSize="12" fontWeight="800" fill="#f3dfbd">
            {flipped ? i + 1 : 8 - i}
          </text>
        ))}
      </g>
    </svg>
  );
}

/* ---------------- Cờ tướng ---------------- */
const XQ_BLACK = ["車", "馬", "象", "士", "將", "士", "象", "馬", "車"];
const XQ_RED = ["俥", "傌", "相", "仕", "帥", "仕", "相", "傌", "俥"];

export function XiangqiBoard({ flipped, className }: BoardProps) {
  const cs = 46; // khoảng cách giao điểm
  const ox = 32;
  const oy = 32;
  const X = (c: number) => ox + c * cs;
  const Y = (r: number) => oy + r * cs;
  const pieces: { r: number; c: number; ch: string; red: boolean }[] = [];
  XQ_BLACK.forEach((ch, c) => pieces.push({ r: 0, c, ch, red: false }));
  pieces.push({ r: 2, c: 1, ch: "砲", red: false }, { r: 2, c: 7, ch: "砲", red: false });
  [0, 2, 4, 6, 8].forEach((c) => pieces.push({ r: 3, c, ch: "卒", red: false }));
  [0, 2, 4, 6, 8].forEach((c) => pieces.push({ r: 6, c, ch: "兵", red: true }));
  pieces.push({ r: 7, c: 1, ch: "炮", red: true }, { r: 7, c: 7, ch: "炮", red: true });
  XQ_RED.forEach((ch, c) => pieces.push({ r: 9, c, ch, red: true }));

  return (
    <svg viewBox="0 0 432 478" className={cn("h-auto w-full", className)} role="img" aria-label="Bàn cờ tướng, thế cờ ban đầu">
      <rect x="0" y="0" width="432" height="478" rx="10" fill="#8a5a32" />
      <rect x="12" y="12" width="408" height="454" rx="6" fill="#f3dfbd" />
      <g transform={flipped ? "rotate(180 216 239)" : undefined} stroke={INK} strokeWidth="1.6">
        {Array.from({ length: 10 }).map((_, r) => (
          <line key={`h${r}`} x1={X(0)} y1={Y(r)} x2={X(8)} y2={Y(r)} />
        ))}
        {Array.from({ length: 9 }).map((_, c) => (
          <g key={`v${c}`}>
            <line x1={X(c)} y1={Y(0)} x2={X(c)} y2={Y(4)} />
            <line x1={X(c)} y1={Y(5)} x2={X(c)} y2={Y(9)} />
          </g>
        ))}
        <line x1={X(0)} y1={Y(4)} x2={X(0)} y2={Y(5)} />
        <line x1={X(8)} y1={Y(4)} x2={X(8)} y2={Y(5)} />
        <line x1={X(3)} y1={Y(0)} x2={X(5)} y2={Y(2)} />
        <line x1={X(5)} y1={Y(0)} x2={X(3)} y2={Y(2)} />
        <line x1={X(3)} y1={Y(7)} x2={X(5)} y2={Y(9)} />
        <line x1={X(5)} y1={Y(7)} x2={X(3)} y2={Y(9)} />
        <text x={X(2)} y={Y(4) + 30} fontSize="22" fontStyle="italic" fontWeight="700" fill="#8a5a32" stroke="none" textAnchor="middle">
          Sở hà
        </text>
        <text x={X(6)} y={Y(4) + 30} fontSize="22" fontStyle="italic" fontWeight="700" fill="#8a5a32" stroke="none" textAnchor="middle" transform={`rotate(180 ${X(6)} ${Y(4) + 22})`}>
          Hán giới
        </text>
        {pieces.map((p, i) => (
          <g key={i} transform={flipped ? `rotate(180 ${X(p.c)} ${Y(p.r)})` : undefined}>
            <circle cx={X(p.c)} cy={Y(p.r)} r="19" fill="#fff4dc" stroke={p.red ? "#c53035" : INK} strokeWidth="2.5" />
            <circle cx={X(p.c)} cy={Y(p.r)} r="15" fill="none" stroke={p.red ? "#c53035" : INK} strokeWidth="1" />
            <text x={X(p.c)} y={Y(p.r) + 7} textAnchor="middle" fontSize="19" fontWeight="800" fill={p.red ? "#c53035" : INK} stroke="none">
              {p.ch}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
}

/* ---------------- Ô ăn quan ---------------- */
export function OAnQuanBoard({ flipped, className }: BoardProps) {
  const stones = ["#f3dfbd", "#8edcc5", "#a9b8f5", "#ffb5c8", "#ffffff"];
  const cellW = 70;
  const ox = 90;
  return (
    <svg viewBox="0 0 530 240" className={cn("h-auto w-full", className)} role="img" aria-label="Bàn ô ăn quan, thế ban đầu">
      <rect x="0" y="0" width="530" height="240" rx="16" fill="#7a4f2a" />
      <g transform={flipped ? "rotate(180 265 120)" : undefined}>
        <rect x="10" y="10" width="510" height="220" rx="110" fill="#c79352" stroke="#8a5a32" strokeWidth="3" />
        {/* ô quan */}
        {[0, 1].map((side) => {
          const cx = side === 0 ? 50 : 480;
          return (
            <g key={side}>
              <circle cx={cx} cy="120" r="30" fill="#8edcc5" stroke="#0e6f63" strokeWidth="3" />
              <text x={cx} y="125" textAnchor="middle" fontSize="12" fontWeight="800" fill="#0e6f63">
                QUAN
              </text>
              <rect x={cx - 22} y="52" width="44" height="18" rx="9" fill={INK} />
              <text x={cx} y="65" textAnchor="middle" fontSize="11" fontWeight="800" fill="#fff">
                0 + quan
              </text>
            </g>
          );
        })}
        {/* 2 hàng × 5 ô */}
        {[0, 1].map((row) =>
          Array.from({ length: 5 }).map((_, c) => {
            const x = ox + c * cellW;
            const y = row === 0 ? 40 : 125;
            return (
              <g key={`${row}-${c}`}>
                <rect x={x} y={y} width={cellW - 4} height="75" rx="8" fill="#b8865b" stroke="#8a5a32" strokeWidth="2" />
                {stones.map((s, i) => (
                  <circle key={i} cx={x + 18 + (i % 3) * 16} cy={y + 24 + Math.floor(i / 3) * 18 + (i % 2) * 4} r="7" fill={s} stroke="rgba(0,0,0,0.2)" />
                ))}
                <circle cx={x + 10} cy={y + (row === 0 ? 8 : 67)} r="9" fill={INK} />
                <text x={x + 10} y={y + (row === 0 ? 12 : 71)} textAnchor="middle" fontSize="11" fontWeight="800" fill="#fff">
                  5
                </text>
              </g>
            );
          }),
        )}
      </g>
    </svg>
  );
}

/* ---------------- Cờ ca rô ---------------- */
export function CaroBoard({ className }: BoardProps) {
  const n = 15;
  const cs = 28;
  const marks: { r: number; c: number; x: boolean }[] = [
    { r: 7, c: 7, x: true },
    { r: 7, c: 8, x: false },
    { r: 8, c: 8, x: true },
    { r: 6, c: 7, x: false },
    { r: 9, c: 9, x: true },
  ];
  return (
    <svg viewBox={`0 0 ${n * cs + 20} ${n * cs + 20}`} className={cn("h-auto w-full", className)} role="img" aria-label="Bàn cờ ca rô 15×15">
      <rect x="0" y="0" width={n * cs + 20} height={n * cs + 20} rx="10" fill="#fff7ec" stroke="#e6dccf" strokeWidth="2" />
      {Array.from({ length: n + 1 }).map((_, i) => (
        <g key={i} stroke="#d9c7ad" strokeWidth="1">
          <line x1={10} y1={10 + i * cs} x2={10 + n * cs} y2={10 + i * cs} />
          <line x1={10 + i * cs} y1={10} x2={10 + i * cs} y2={10 + n * cs} />
        </g>
      ))}
      {marks.map((m, i) => {
        const cx = 10 + m.c * cs + cs / 2;
        const cy = 10 + m.r * cs + cs / 2;
        return m.x ? (
          <g key={i} stroke="#e8453c" strokeWidth="3.5" strokeLinecap="round">
            <line x1={cx - 8} y1={cy - 8} x2={cx + 8} y2={cy + 8} />
            <line x1={cx + 8} y1={cy - 8} x2={cx - 8} y2={cy + 8} />
          </g>
        ) : (
          <circle key={i} cx={cx} cy={cy} r="9" fill="none" stroke="#2b4fa8" strokeWidth="3.5" />
        );
      })}
    </svg>
  );
}

/* ---------------- Cờ vây ---------------- */
export function GoBoard({ className }: BoardProps) {
  const n = 9;
  const cs = 44;
  const o = 30;
  const stones: { r: number; c: number; black: boolean }[] = [
    { r: 2, c: 6, black: true },
    { r: 6, c: 2, black: false },
    { r: 4, c: 4, black: true },
    { r: 2, c: 2, black: false },
  ];
  return (
    <svg viewBox="0 0 412 412" className={cn("h-auto w-full", className)} role="img" aria-label="Bàn cờ vây 9×9">
      <rect x="0" y="0" width="412" height="412" rx="10" fill="#e3b56f" />
      {Array.from({ length: n }).map((_, i) => (
        <g key={i} stroke="#6b4a1f" strokeWidth="1.5">
          <line x1={o} y1={o + i * cs} x2={o + (n - 1) * cs} y2={o + i * cs} />
          <line x1={o + i * cs} y1={o} x2={o + i * cs} y2={o + (n - 1) * cs} />
        </g>
      ))}
      {[
        [2, 2],
        [2, 6],
        [6, 2],
        [6, 6],
        [4, 4],
      ].map(([r, c]) => (
        <circle key={`${r}${c}`} cx={o + c * cs} cy={o + r * cs} r="3.5" fill="#6b4a1f" />
      ))}
      {stones.map((s, i) => (
        <circle key={i} cx={o + s.c * cs} cy={o + s.r * cs} r="19" fill={s.black ? "#2a2540" : "#fffaf0"} stroke="rgba(0,0,0,0.35)" strokeWidth="1.5" />
      ))}
    </svg>
  );
}

/* ---------------- Cờ lật ---------------- */
export function OthelloBoard({ className }: BoardProps) {
  const cs = 50;
  return (
    <svg viewBox="0 0 440 440" className={cn("h-auto w-full", className)} role="img" aria-label="Bàn cờ lật 8×8, thế ban đầu">
      <rect x="0" y="0" width="440" height="440" rx="10" fill="#1f6b3a" />
      {Array.from({ length: 64 }).map((_, i) => {
        const r = Math.floor(i / 8);
        const c = i % 8;
        return <rect key={i} x={20 + c * cs} y={20 + r * cs} width={cs} height={cs} fill="#2e8b4e" stroke="#1f6b3a" strokeWidth="2" />;
      })}
      {[
        [3, 3, false],
        [3, 4, true],
        [4, 3, true],
        [4, 4, false],
      ].map(([r, c, black], i) => (
        <circle key={i} cx={20 + (c as number) * cs + cs / 2} cy={20 + (r as number) * cs + cs / 2} r="20" fill={black ? "#2a2540" : "#fffaf0"} stroke="rgba(0,0,0,0.35)" strokeWidth="1.5" />
      ))}
    </svg>
  );
}

/* ---------------- Cờ tỷ phú Việt ---------------- */
/** Vòng 24 ô trên lưới 7×7: hàng dưới (phải → trái), cột trái (dưới → trên), hàng trên, cột phải. */
function tycoonPosition(i: number): { col: number; row: number } {
  if (i <= 6) return { col: 7 - i, row: 7 };
  if (i <= 12) return { col: 1, row: 7 - (i - 6) };
  if (i <= 18) return { col: 1 + (i - 12), row: 1 };
  return { col: 7, row: 1 + (i - 18) };
}

export function TycoonBoard({ className }: BoardProps) {
  return (
    <div
      className={cn("grid aspect-square w-full gap-1 rounded-2xl bg-ink p-1.5 text-ink", className)}
      style={{ gridTemplateColumns: "repeat(7, minmax(0, 1fr))", gridTemplateRows: "repeat(7, minmax(0, 1fr))" }}
      role="img"
      aria-label="Bàn cờ tỷ phú Việt"
    >
      {tycoonCells.map((cell, i) => {
        const { col, row } = tycoonPosition(i);
        const corner = i % 6 === 0;
        return (
          <div
            key={`${cell.name}-${i}`}
            style={{ gridColumn: col, gridRow: row }}
            className={cn(
              "relative flex flex-col items-center justify-center overflow-hidden rounded-md bg-cream px-0.5 text-center",
              corner && "bg-yellow/70",
            )}
          >
            {cell.tone && <span className={cn("absolute top-0 left-0 h-1.5 w-full", toneSolid[cell.tone])} />}
            {cell.icon && <Image src={iconSrc(cell.icon)} alt="" width={18} height={18} className="size-4 md:size-5" />}
            <span className="text-[8px] leading-tight font-extrabold md:text-[10px]">{cell.name}</span>
            {cell.price && <span className="text-[8px] font-bold text-ink-3 md:text-[9px]">{cell.price}</span>}
          </div>
        );
      })}
      <div
        style={{ gridColumn: "2 / 7", gridRow: "2 / 7" }}
        className="flex flex-col items-center justify-center gap-2 rounded-xl bg-[repeating-linear-gradient(135deg,#fff7ec_0_10px,#fff1e6_10px_20px)]"
      >
        <p className="font-display text-2xl font-extrabold tracking-wide text-bar drop-shadow-[0_2px_0_#fff] md:text-3xl">
          TỶ PHÚ VIỆT
        </p>
        <p className="text-xs font-bold text-ink-3">Vòng 1/30 · lượt Bạn</p>
        <div className="flex gap-2">
          {[5, 6].map((d) => (
            <span key={d} className="grid size-9 grid-cols-3 gap-0.5 rounded-lg border-2 border-ink bg-white p-1 md:size-11">
              {Array.from({ length: 9 }).map((_, k) => {
                const pips: Record<number, number[]> = { 5: [0, 2, 4, 6, 8], 6: [0, 2, 3, 5, 6, 8] };
                return <span key={k} className={cn("rounded-full", pips[d].includes(k) ? (d === 5 ? "bg-ink" : "bg-bar") : "bg-transparent")} />;
              })}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function BoardPreview({ kind, flipped }: { kind: BoardKind; flipped: boolean }) {
  switch (kind) {
    case "chess":
      return <ChessBoard flipped={flipped} />;
    case "xiangqi":
      return <XiangqiBoard flipped={flipped} />;
    case "oanquan":
      return <OAnQuanBoard flipped={flipped} />;
    case "caro":
      return <CaroBoard flipped={flipped} />;
    case "go":
      return <GoBoard flipped={flipped} />;
    case "othello":
      return <OthelloBoard flipped={flipped} />;
    case "tycoon":
      return <TycoonBoard flipped={flipped} />;
  }
}
