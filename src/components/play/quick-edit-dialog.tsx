"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type QuickEditDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  onSave: () => void;
  saveLabel?: string;
  children: React.ReactNode;
};

/** Dialog "Sửa nhanh" dùng chung cho các trang chơi. */
export function QuickEditDialog({
  open,
  onOpenChange,
  title,
  description,
  onSave,
  saveLabel = "Lưu",
  children,
}: QuickEditDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-[24px] border-2 border-ink bg-white p-6 text-ink ring-0 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-xl font-extrabold text-ink">{title}</DialogTitle>
          {description && <DialogDescription className="text-ink-3">{description}</DialogDescription>}
        </DialogHeader>
        <div className="flex flex-col gap-4">{children}</div>
        <div className="mt-2 flex justify-end gap-2">
          <Button variant="subtle" size="sm" onClick={() => onOpenChange(false)}>
            Huỷ
          </Button>
          <Button size="sm" onClick={onSave}>
            {saveLabel}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/** Dialog kết quả (trúng thưởng, quẻ xăm…). */
export function ResultDialog({
  open,
  onOpenChange,
  title,
  children,
  actions,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children?: React.ReactNode;
  actions?: React.ReactNode;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-[24px] border-2 border-ink bg-white p-6 text-center text-ink ring-0 sm:max-w-md">
        <DialogHeader className="items-center">
          <DialogTitle className="font-display text-2xl font-extrabold text-ink">{title}</DialogTitle>
          <DialogDescription className="sr-only">Kết quả</DialogDescription>
        </DialogHeader>
        {children}
        {actions && <div className="mt-2 flex flex-wrap justify-center gap-2">{actions}</div>}
      </DialogContent>
    </Dialog>
  );
}

export const inputClass =
  "h-11 w-full rounded-[14px] border-2 border-line-2 bg-white px-3.5 text-sm font-bold text-ink placeholder:font-semibold placeholder:text-ink-4 focus:border-ink-4 focus:outline-none focus-visible:ring-4 focus-visible:ring-focus";

export const labelClass = "text-xs font-extrabold text-ink-2";
