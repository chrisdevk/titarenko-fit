"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";
import { useCart } from "@/context/cart";
import { Check, Dumbbell, MoveUpRight } from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";

type SubscriptionProps = {
  clubProductId: number | null;
  clubUnitPrice: number;
  clubStripeProductId: string | null;
};

export const Subscription = ({
  clubProductId,
  clubUnitPrice,
  clubStripeProductId,
}: SubscriptionProps) => {
  const t = useTranslations("ClubPage.subscription");
  const benefits = t.raw("benefits") as string[];
  const { user } = useAuth();
  const { addItemToCart } = useCart();
  const router = useRouter();
  const { locale } = useParams<{ locale: string }>();

  const handleJoinClub = () => {
    if (!user) {
      router.push(`/${locale}/auth`);
      return;
    }

    if (!clubProductId || !clubStripeProductId) return;

    addItemToCart({
      product: clubProductId,
      unitPrice: clubUnitPrice,
      stripeProductID: clubStripeProductId,
      quantity: 1,
    });

    localStorage.setItem("postCheckoutRedirect", `/${locale}/club/month`);
    router.push(`/${locale}/checkout`);
  };

  return (
    <section id="subscription" className="bg-cyan-light py-20">
      <div className="mx-auto w-11/12 max-w-[996px] space-y-12">
        <div className="flex flex-col items-center gap-3">
          <div className="flex size-[50px] items-center justify-center rounded-full border border-baby-slate bg-turquoise-dark">
            <Dumbbell color="#fff" />
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center text-3xl font-semibold text-off-black md:text-[48px] md:leading-tight"
          >
            {t("heading")}
          </motion.h2>
          <div className="h-[3px] w-[97px] rounded bg-off-black" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mx-auto max-w-[525px] overflow-hidden rounded-[14px] shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)]"
        >
          <div className="flex flex-col gap-[18px] bg-turquoise-dark p-[30px]">
            <div className="flex flex-col gap-[18px]">
              <div className="flex flex-col gap-[18px]">
                <p className="text-center text-[32px] font-medium text-baby-slate">
                  {t("cost-label")}
                </p>
                <p className="text-lg text-[#e7e7e7]">
                  {t("cost-description")}
                </p>
              </div>
              <div className="flex items-end gap-1.5 text-baby-slate">
                <span className="text-[64px] font-semibold leading-none">
                  {t("price")}
                </span>
                <div className="flex items-end">
                  <span className="text-[64px] font-semibold leading-none">
                    /
                  </span>
                  <span className="pb-1 text-xl font-semibold leading-[46px]">
                    {t("period").replace("/", "")}
                  </span>
                </div>
              </div>
            </div>
            <Button
              variant="secondary"
              size="lg"
              className="z-10"
              onClick={handleJoinClub}
            >
              {t("button")}
              <MoveUpRight className="size-5" />
            </Button>
          </div>

          <div className="flex flex-col gap-4 bg-baby-slate p-8 pt-10">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-5">
                <div className="flex size-[39px] shrink-0 items-center justify-center rounded-full border-2 bg-turquoise-dark">
                  <Check className="size-5 text-white" strokeWidth={2.5} />
                </div>
                <span className="text-lg text-off-black">{benefit}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
