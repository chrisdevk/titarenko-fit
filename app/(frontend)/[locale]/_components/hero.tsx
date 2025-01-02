import { buttonVariants } from "@/components/ui/button";
import { Socials } from "@/components/ui/socials";
import { cn } from "@/lib/utils";
import { MoveUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export const Hero = () => {
  const t = useTranslations("HomePage.hero");

  const heading = t("heading")
    .split(/(\s+)/)
    .map((word, index) => {
      const trimmedWord = word.trim();
      if (/^(stronger|сильнее)$/i.test(trimmedWord)) {
        return (
          <span key={index} className="text-indigo-custom">
            {trimmedWord}{" "}
          </span>
        );
      }
      return `${word}`;
    });

  return (
    <section className="w-11/12 mx-auto mt-[90px] h-fit flex flex-col gap-y-40 px-8 pt-24 pb-8 relative">
      <div className="flex flex-col gap-y-10 max-w-[692px]">
        <h1 className="uppercase font-semibold text-[4rem] leading-tight">
          {heading}
        </h1>
        <p className="text-xl max-w-[480px]">{t("paragraph")}</p>
        <Link
          href="/"
          className={cn(
            "w-fit",
            buttonVariants({ variant: "default", size: "lg" })
          )}
        >
          <span>{t("button")}</span>
          <MoveUpRight size={24} />
        </Link>
      </div>
      <div>
        <Socials />
      </div>
      <div className="absolute left-0 top-0 w-full h-full -z-10">
        <Image
          src="/images/hero-bg.webp"
          alt="Hero image"
          fill
          quality={100}
          priority
          className="object-cover overflow-hidden rounded-3xl"
        />
      </div>
    </section>
  );
};
