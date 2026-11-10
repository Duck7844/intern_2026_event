"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Ô "Có mã phòng?" ở hero. Chuẩn hoá mã (bỏ khoảng trắng, viết hoa) rồi chuyển sang /choi?code=...
 * Trang /choi sẽ xử lý tiếp ở phase 2.
 */
export function RoomCodeForm({ className }: { className?: string }) {
  const router = useRouter();
  const [code, setCode] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const normalized = code.replace(/\s+/g, "").toUpperCase();
    if (normalized.length < 6) {
      setError("Mã phòng gồm 6 ký tự, ví dụ 482913 hoặc WYS77K");
      return;
    }
    setError(null);
    router.push(`/choi?code=${encodeURIComponent(normalized)}`);
  }

  return (
    <form
      onSubmit={onSubmit}
      className={cn(
        "flex flex-col gap-2 rounded-[22px] border-2 border-line bg-white p-2.5 pl-4 shadow-soft sm:flex-row sm:items-center",
        className,
      )}
    >
      <label htmlFor="room-code" className="shrink-0 py-1.5 text-sm font-extrabold text-ink-2">
        Có mã phòng?
      </label>
      <input
        id="room-code"
        name="code"
        inputMode="text"
        autoComplete="off"
        autoCapitalize="characters"
        maxLength={8}
        placeholder="482 913"
        value={code}
        onChange={(e) => {
          setCode(e.target.value);
          if (error) setError(null);
        }}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? "room-code-error" : undefined}
        className="h-12 min-w-0 flex-1 rounded-[14px] border-2 border-line-2 bg-white px-4 font-mono text-lg tracking-[0.2em] text-ink placeholder:text-ink-4 focus:border-ink-4 focus:outline-none focus-visible:ring-4 focus-visible:ring-focus aria-invalid:border-err"
      />
      <Button
        type="submit"
        size="md"
        className="h-12 border-ink bg-peri px-6 text-ink shadow-hard hover:bg-peri/80"
      >
        Vào
      </Button>
      {error && (
        <p id="room-code-error" role="alert" className="px-1 pb-1 text-xs font-bold text-err sm:hidden">
          {error}
        </p>
      )}
      {error && (
        <p className="hidden w-full px-1 pb-1 text-xs font-bold text-err sm:block sm:basis-full" aria-hidden="true">
          {error}
        </p>
      )}
    </form>
  );
}
