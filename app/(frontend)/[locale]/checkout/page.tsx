"use client";

import { CheckoutForm } from "@/components/forms/checkout-form";
import { useAuth } from "@/context/auth-context";
import { useCart } from "@/context/cart";
import { computeDiscountAmount } from "@/utils/shared/compute-discount";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { Fragment, Suspense, useState } from "react";
import { CartSummary } from "./_components/cart-summary";

const apiKey = `${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`;
const stripe = loadStripe(apiKey);

interface AppliedCoupon {
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  applicableProductIds: number[];
  applicableStripeProductIds: string[];
  discountAmount: number;
}

export default function CheckoutPage() {
  const { user } = useAuth();
  const [error, setError] = useState<null | string>(null);
  const [clientSecret, setClientSecret] = useState<string | undefined>();
  const [isProceeding, setIsProceeding] = useState(false);

  const [appliedCoupon, setAppliedCoupon] = useState<AppliedCoupon | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [couponLoading, setCouponLoading] = useState(false);

  const { locale }: { locale: string } = useParams();
  const router = useRouter();

  const { cart, cartIsEmpty, cartTotal, deleteItemFromCart, clearCart } = useCart();
  const t = useTranslations("CheckoutPage");

  const discountedTotal = appliedCoupon
    ? Math.max(0, cartTotal.amount - appliedCoupon.discountAmount)
    : cartTotal.amount;

  const handleApplyCoupon = async (code: string) => {
    setCouponLoading(true);
    setCouponError(null);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/validate-coupon`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          code,
          cartItems: (cart?.items ?? []).map((item) => ({
            ...item,
            stripeProductID: item.stripeProductID ?? undefined,
          })),
        }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        setCouponError(data.error ?? "Invalid coupon.");
        setAppliedCoupon(null);
      } else {
        const normalizedItems = (cart?.items ?? []).map((item) => ({
          ...item,
          stripeProductID: item.stripeProductID ?? undefined,
        }));

        const discountAmount = computeDiscountAmount(
          {
            discountType: data.discountType,
            discountValue: data.discountValue,
            applicableProductIds: data.applicableProductIds,
            applicableStripeProductIds: data.applicableStripeProductIds,
          },
          normalizedItems,
          cartTotal.amount,
        );

        setAppliedCoupon({
          code,
          discountType: data.discountType,
          discountValue: data.discountValue,
          applicableProductIds: data.applicableProductIds,
          applicableStripeProductIds: data.applicableStripeProductIds,
          discountAmount,
        });
      }
    } catch {
      setCouponError("Failed to validate coupon.");
    } finally {
      setCouponLoading(false);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponError(null);
  };

  const handleProceed = async () => {
    setIsProceeding(true);
    setError(null);

    try {
      if (discountedTotal === 0) {
        // Free order — skip Stripe entirely
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/create-free-order`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ cart, couponCode: appliedCoupon?.code }),
        });

        const data = await res.json();

        if (!res.ok || data.error) {
          setError(data.error ?? "Failed to place order.");
        } else {
          const rawRedirect = localStorage.getItem("postCheckoutRedirect");
          localStorage.removeItem("postCheckoutRedirect");
          // Only allow safe relative paths — reject protocol-relative URLs like //evil.com.
          const postCheckoutRedirect =
            rawRedirect &&
            rawRedirect.startsWith("/") &&
            !rawRedirect.startsWith("//")
              ? rawRedirect
              : null;
          clearCart();
          router.push(postCheckoutRedirect ?? `/${locale}/dashboard`);
        }
      } else {
        // Paid order — create Stripe payment intent
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/create-payment-intent`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ cart, couponCode: appliedCoupon?.code }),
          },
        );

        const data = await res.json();

        if (data.error) {
          setError(data.error);
        } else if (data.client_secret) {
          setClientSecret(data.client_secret);
        }
      }
    } catch {
      setError("Something went wrong.");
    } finally {
      setIsProceeding(false);
    }
  };

  if (!stripe) return null;

  return (
    <div className="mx-auto mb-24 mt-40 flex w-11/12 max-w-[1440px] items-center">
      <article className="flex w-full flex-col-reverse justify-between gap-x-8 gap-y-4 md:flex-row">
        <section className="flex h-fit flex-col gap-y-3 rounded-3xl bg-turquoise-light px-4 py-6 md:w-2/3">
          <h2 className="font-semibold">{t("h1")}</h2>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <Suspense fallback={<Fragment />}>
            {clientSecret ? (
              <Elements
                stripe={stripe}
                options={{
                  clientSecret,
                  appearance: {
                    theme: "stripe",
                    variables: { colorPrimary: "#5E60CE" },
                  },
                }}
              >
                <CheckoutForm locale={locale} />
              </Elements>
            ) : (
              !cartIsEmpty && user && (
                <button
                  type="button"
                  onClick={() => void handleProceed()}
                  disabled={isProceeding}
                  className="mt-2 w-full rounded-xl bg-purple-custom py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
                >
                  {isProceeding
                    ? t("processing")
                    : discountedTotal === 0
                      ? t("freeOrder")
                      : t("proceedToPayment")}
                </button>
              )
            )}
          </Suspense>
        </section>
        <aside className="h-fit rounded-3xl bg-turquoise-light px-4 py-6 md:w-1/3">
          {cartIsEmpty ? (
            <p>{t("cartIsEmpty")}</p>
          ) : (
            <CartSummary
              cart={cart}
              cartTotal={cartTotal.amount}
              onDelete={deleteItemFromCart}
              appliedCoupon={appliedCoupon}
              couponError={couponError}
              couponLoading={couponLoading}
              onApplyCoupon={handleApplyCoupon}
              onRemoveCoupon={handleRemoveCoupon}
            />
          )}
        </aside>
      </article>
    </div>
  );
}
