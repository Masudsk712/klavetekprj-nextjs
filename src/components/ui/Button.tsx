import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

export default function Button({
  className,
  children,
  ...props
}: Props) {
  return (
    <button
      className={cn(
        "rounded-xl bg-[var(--primary)] px-6 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-[var(--primary-dark)]",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}