import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, MoveUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

type CardData = {
  title: string;
  features: string[];
  button: string;
};

export const TrainingType = async ({
  locale,
}: {
  locale: "en" | "ru";
}) => {
  const t = await getTranslations({ locale, namespace: "HomePage" });
  const cards = t.raw("training-type.cards") as CardData[];

  return (
    <section className="bg-off-white">
      <div className="relative rounded-t-3xl bg-turquoise-dark py-16">
        <div className="relative z-10 mx-auto w-11/12 max-w-[1120px] space-y-10">
          <h2 className="text-center text-white">
            {t("training-type.heading")}
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {cards.map((card, index) => (
              <div
                key={card.title}
                className="flex flex-col gap-y-4 overflow-hidden rounded-3xl bg-white p-4"
              >
                <div
                  className={cn(
                    "h-full space-y-4 rounded-2xl p-6",
                    index === 0 && "bg-turquoise-light",
                    index === 1 && "bg-[#E6E7FF]",
                  )}
                >
                  <h3 className="text-xl font-bold text-neutral-900">
                    {card.title}
                  </h3>
                  <ul className="flex flex-1 flex-col gap-3">
                    {card.features.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-neutral-800"
                      >
                        <span
                          className={cn(
                            "mt-0.5 shrink-0",
                            index === 0 && "text-turquoise-dark",
                            index === 1 && "text-purple-custom",
                          )}
                        >
                          <Check className="size-5" strokeWidth={2.5} />
                        </span>
                        <span className="text-lg leading-snug">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Link
                  href={`/${locale}/programs`}
                  className={cn(
                    "flex w-full items-center justify-center gap-2 rounded-2xl py-3",
                    buttonVariants({ variant: "default", size: "lg" }),
                  )}
                >
                  {card.button}
                  <MoveUpRight className="size-5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute -top-7 left-0 h-[306px] w-[358px]">
          <Image src="/icons/lines.svg" alt="" fill />
        </div>
      </div>
    </section>
  );
};
