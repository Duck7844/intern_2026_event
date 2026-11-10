import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Card nền tảng: viền 2px, bo 20px. `tone` đổi màu nền pastel, `hover` thêm hiệu ứng nâng nhẹ.
 */
const cardVariants = cva("rounded-card border-2 border-line transition-[transform,box-shadow] duration-200", {
  variants: {
    tone: {
      white: "bg-white",
      cream: "bg-cream",
      mint: "bg-mint/35",
      peri: "bg-peri/35",
      peach: "bg-peach/35",
      pink: "bg-pink/35",
      lilac: "bg-lilac/40",
      yellow: "bg-yellow/40",
      ink: "border-ink bg-ink text-white",
    },
    padding: {
      none: "p-0",
      sm: "p-4",
      md: "p-5 md:p-6",
      lg: "p-6 md:p-8",
    },
    hover: {
      true: "hover:-translate-y-0.5 hover:shadow-soft",
      false: "",
    },
  },
  defaultVariants: { tone: "white", padding: "md", hover: false },
});

type CardProps = React.ComponentProps<"div"> & VariantProps<typeof cardVariants>;

function Card({ className, tone, padding, hover, ...props }: CardProps) {
  return (
    <div
      data-slot="card"
      className={cn(cardVariants({ tone, padding, hover }), className)}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      data-slot="card-title"
      className={cn("font-display text-lg leading-tight font-extrabold", className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="card-description"
      className={cn("text-sm leading-relaxed text-ink-3", className)}
      {...props}
    />
  );
}

export { Card, CardTitle, CardDescription, cardVariants, type CardProps };
