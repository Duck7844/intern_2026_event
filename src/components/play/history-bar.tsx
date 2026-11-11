"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { iconSrc } from "@/lib/assets";

export type HistoryEntry = { id: string; label: string; at: number };

type HistoryBarProps = {
  title?: string;
  entries: HistoryEntry[];
  onClear?: () => void;
  /** Dòng ghi chú dưới thanh lịch sử */
  note?: string;
};

export function newEntry(label: string): HistoryEntry {
  return { id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, label, at: Date.now() };
}

/** Thanh "Lịch sử (n) · Xem" + sheet danh sách, và dòng ghi chú kèm link tư vấn. */
export function HistoryBar({ title = "Lịch sử", entries, onClear, note }: HistoryBarProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <div className="mt-5 flex items-center justify-between rounded-2xl border-2 border-line bg-white px-4 py-3">
        <span className="inline-flex items-center gap-2 text-sm font-extrabold text-ink">
          <Image src={iconSrc("clipboard")} alt="" width={20} height={20} className="size-5" />
          {title} ({entries.length})
        </span>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="cursor-pointer text-sm font-extrabold text-ink-3 hover:text-ink"
        >
          Xem
        </button>
      </div>

      {note && (
        <p className="mt-5 text-center text-sm text-ink-3">
          {note}{" "}
          <Link href="/#tu-van" className="font-extrabold text-bar">
            Tư vấn cho sự kiện
          </Link>
        </p>
      )}

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="bottom"
          className="mx-auto max-h-[80vh] w-full max-w-2xl rounded-t-[24px] border-2 border-ink bg-white text-ink sm:left-1/2 sm:-translate-x-1/2"
        >
          <SheetHeader className="pr-12">
            <SheetTitle className="font-display text-xl font-extrabold text-ink">{title}</SheetTitle>
            <SheetDescription className="text-ink-3">
              Lưu trên trình duyệt này, mới nhất ở trên.
            </SheetDescription>
          </SheetHeader>
          <div className="overflow-y-auto px-4 pb-2">
            {entries.length === 0 ? (
              <p className="py-6 text-center text-sm text-ink-3">Chưa có kết quả nào.</p>
            ) : (
              <ol className="flex flex-col gap-2">
                {[...entries].reverse().map((e, i) => (
                  <li
                    key={e.id}
                    className="flex items-center justify-between gap-3 rounded-xl border-2 border-line px-3 py-2 text-sm"
                  >
                    <span className="font-extrabold">
                      <span className="mr-2 text-ink-4">#{entries.length - i}</span>
                      {e.label}
                    </span>
                    <time dateTime={new Date(e.at).toISOString()} className="shrink-0 text-xs text-ink-3">
                      {new Date(e.at).toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })}
                    </time>
                  </li>
                ))}
              </ol>
            )}
          </div>
          {onClear && entries.length > 0 && (
            <div className="border-t-2 border-line p-4">
              <Button
                variant="subtle"
                size="sm"
                onClick={() => {
                  onClear();
                  setOpen(false);
                }}
              >
                Xoá lịch sử
              </Button>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
