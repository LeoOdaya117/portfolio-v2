import type { ReactNode } from "react";

type ContainerProps = Readonly<{
  children: ReactNode;
  className?: string;
}>;

export default function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={`mx-auto w-[calc(100%-1.75rem)] max-w-[var(--site-container)] min-[769px]:w-[calc(100%-2.5rem)] ${className ?? ""}`}
    >
      {children}
    </div>
  );
}
