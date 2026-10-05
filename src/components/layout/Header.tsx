import Link from "next/link";
import { headerData } from "@/data/header";
import Container from "@/components/layout/Container";
import HeaderNavigation from "@/components/layout/HeaderNavigation";

type HeaderProps = Readonly<{
  activeItem?: "Home" | "Projects";
}>;

export default function Header({ activeItem }: HeaderProps = {}) {
  return (
    <header className="sticky top-0 z-[100] border-b border-border/80 bg-background/90 backdrop-blur-[18px]">
      <Container className="flex min-h-[78px] items-center justify-between gap-[30px]">
        <Link
          href={headerData.brand.href}
          className="flex flex-col leading-[1.1] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest"
        >
          <strong className="text-[17px] font-bold">
            {headerData.brand.name}
          </strong>

          <span className="mt-1 text-[11px] uppercase tracking-[0.08em] text-text-muted">
            {headerData.brand.role}
          </span>
        </Link>

        <HeaderNavigation activeItem={activeItem} />

        <a
          href={activeItem ? `/${headerData.cta.href}` : headerData.cta.href}
          className="rounded-full bg-forest px-[18px] py-[11px] text-xs font-bold text-white transition-colors duration-150 hover:bg-forest-light focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest motion-reduce:transition-none max-[561px]:hidden"
        >
          {headerData.cta.label}
        </a>
      </Container>
    </header>
  );
}
