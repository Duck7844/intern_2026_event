import { Lightbulb } from "lucide-react";

import { cn } from "@/lib/utils";

type TipBoxProps = {
  children: React.ReactNode;
  className?: string;
};

/** Box ghi chú nền vàng nhạt, chữ nâu, icon bóng đèn. */
export function TipBox({ children, className }: TipBoxProps) {
  return (
    <p
      className={cn(
        "flex items-start gap-3 rounded-2xl border-2 border-dashed border-yellow-deep bg-note-bg px-4 py-3 text-sm leading-relaxed font-bold text-note",
        className,
      )}
    >
      <Lightbulb className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
      <span>{children}</span>
    </p>
  );
}
