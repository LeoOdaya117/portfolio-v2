import Image from "next/image";
import { heroData } from "@/data/hero";
import Container from "@/components/layout/Container";
import styles from "./Hero.module.css";
import {
  ArrowRight,
  BriefcaseBusiness,
  Code2,
  Download,
  MapPin,
  Monitor,
  Smartphone,
} from "lucide-react";

const heroIcons = {
  arrowRight: ArrowRight,
  briefcase: BriefcaseBusiness,
  code: Code2,
  download: Download,
  mapPin: MapPin,
  monitor: Monitor,
  smartphone: Smartphone,
} as const;

const actionVariants = {
  primary: "border-forest bg-forest text-white hover:bg-forest-light",
  outline: "border-border bg-surface text-text hover:border-forest",
} as const;

const classes = {
  section:
    "relative isolate overflow-hidden bg-background max-[901px]:flex max-[901px]:flex-col",
  visual: `${styles.visual} absolute inset-0 z-0 max-[901px]:relative max-[901px]:inset-auto max-[901px]:order-2 max-[901px]:mt-7 max-[901px]:h-[clamp(300px,52vw,410px)] max-[901px]:w-full max-[561px]:mt-6 max-[561px]:h-[300px]`,
  image:
    "object-cover object-[62%_center] max-[561px]:object-[82%_center]",
  content:
    "relative z-10 flex min-h-[clamp(560px,calc(100svh_-_78px),700px)] flex-col max-[901px]:order-1 max-[901px]:min-h-0 max-[901px]:pt-[38px] max-[561px]:pt-[34px]",
  copy:
    "absolute left-0 top-[calc(50%_-_24px)] max-w-[540px] -translate-y-1/2 max-[901px]:static max-[901px]:translate-y-0",
  eyebrow: "text-[10px] font-bold leading-[1.4] tracking-[0.16em] text-text-muted",
  title:
    "mb-[13px] mt-[15px] text-[clamp(64px,7vw,100px)] font-[750] leading-[0.88] tracking-[-0.045em] max-[561px]:text-[clamp(60px,18vw,76px)]",
  subtitle:
    "m-0 text-base font-bold leading-[1.4] max-[561px]:text-[15px]",
  description:
    "mb-0 mt-[13px] max-w-[510px] text-sm leading-[1.62] text-text-muted max-[561px]:max-w-[46ch] max-[561px]:text-[13px]",
  actions:
    "mt-[23px] flex flex-wrap gap-2.5 max-[561px]:mt-[19px] max-[561px]:grid max-[561px]:grid-cols-2 max-[561px]:gap-2",
  action:
    "inline-flex min-h-[46px] items-center justify-center gap-2.5 rounded-full border px-[18px] text-[13px] font-bold transition-[transform,background-color,border-color] duration-[180ms] ease-out hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest motion-reduce:transition-none max-[561px]:gap-[7px] max-[561px]:px-[10px] max-[561px]:text-xs max-[561px]:whitespace-nowrap",
  status:
    "mt-auto flex flex-wrap items-center gap-x-[30px] gap-y-[14px] pb-6 max-[901px]:mt-[30px] max-[901px]:pb-0 max-[561px]:mt-[27px] max-[561px]:grid max-[561px]:gap-3",
  statusItem:
    "inline-flex items-center gap-2 text-[11px] font-semibold leading-[1.4]",
  focusCard:
    "absolute right-[max(calc((100%_-_var(--site-container))_/_2),_20px)] top-[22px] z-10 w-[198px] overflow-hidden rounded-[14px] border border-text/5 bg-surface/95 shadow-[0_12px_28px_rgba(20,32,28,0.12)] max-[769px]:right-[14px] max-[561px]:top-[18px] max-[561px]:w-[180px]",
  focusHeading:
    "flex min-h-[38px] items-center gap-[9px] border-b border-text/10 px-[13px] text-[11px] font-bold text-text max-[561px]:min-h-[36px] max-[561px]:text-[10px]",
  focusList: "m-0 grid list-none gap-0.5 px-2 py-[7px] pb-2",
  focusItem:
    "flex min-h-[34px] items-center gap-2.5 px-[5px] text-[11px] font-semibold text-text max-[561px]:min-h-[31px] max-[561px]:text-[10px]",
  note:
    "absolute left-[clamp(600px,42vw,820px)] top-[30%] z-10 m-0 w-[155px] rotate-[-6deg] font-note text-[17px] font-semibold italic leading-[1.1] text-[#343833] max-[901px]:left-[7%] max-[901px]:top-[23%] max-[561px]:left-8 max-[561px]:top-[28%] max-[561px]:w-[125px] max-[561px]:text-[15px]",
} as const;

export default function Hero() {
  return (
    <section className={classes.section} aria-labelledby="hero-title">
      <div className={classes.visual} aria-label={heroData.image.label}>
        <Image
          src={heroData.image.src}
          alt={heroData.image.alt}
          fill
          sizes="100vw"
          fetchPriority="high"
          className={classes.image}
        />

        <div className={classes.focusCard}>
          <div className={classes.focusHeading}>
            <span className="size-[7px] shrink-0 rounded-full bg-[#46bc79] shadow-[0_0_0_3px_rgba(70,188,121,0.16)]" />
            {heroData.focusCard.heading}
          </div>

          <ul className={classes.focusList} aria-label={heroData.focusCard.listLabel}>
            {heroData.focusCard.items.map(({ label, icon }) => {
              const Icon = heroIcons[icon];

              return (
                <li key={label} className={classes.focusItem}>
                  <Icon
                    size={16}
                    strokeWidth={1.8}
                    className="shrink-0 text-forest-light"
                    aria-hidden="true"
                  />
                  <span>{label}</span>
                </li>
              );
            })}
          </ul>
        </div>

        <p className={classes.note}>{heroData.note}</p>
      </div>

      <Container className={classes.content}>
        <div className={classes.copy}>
          <div className={classes.eyebrow}>{heroData.eyebrow}</div>

          <h1
            id="hero-title"
            className={classes.title}
          >
            {heroData.title.firstLine}
            <br />
            <span className="text-forest-light">
              {heroData.title.secondLine}
            </span>
          </h1>

          <h2 className={classes.subtitle}>{heroData.subtitle}</h2>

          <p className={classes.description}>{heroData.description}</p>

          <div className={classes.actions}>
            {heroData.actions.map((action) => {
              const Icon = heroIcons[action.icon];

              return (
                <a
                  key={action.label}
                  href={action.href}
                  className={`${classes.action} ${actionVariants[action.variant]}`}
                  target={action.target}
                  rel={action.rel}
                >
                  {action.label}
                  <Icon
                    size={action.icon === "arrowRight" ? 17 : 16}
                    aria-hidden="true"
                  />
                </a>
              );
            })}
          </div>
        </div>

        <div className={classes.status} aria-label={heroData.statusLabel}>
          {heroData.status.map(({ label, icon }) => {
            const Icon = heroIcons[icon];

            return (
              <div key={label} className={classes.statusItem}>
                <Icon
                  size={15}
                  className="shrink-0 text-forest"
                  aria-hidden="true"
                />
                <span>{label}</span>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
