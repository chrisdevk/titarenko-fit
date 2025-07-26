"use client";

import { CheckoutForm } from "@/components/forms/checkout-form";
import { useAuth } from "@/context/auth-context";
import { useCart } from "@/context/cart";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { Fragment, Suspense, useEffect, useRef, useState } from "react";
import { CartSummary } from "./_components/cart-summary";

const apiKey = `${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`;
const stripe = loadStripe(apiKey);

export default function CheckoutPage() {
  const { user } = useAuth();
  const [error, setError] = useState<null | string>(null);
  const [clientSecret, setClientSecret] = useState();
  const hasMadePaymentIntent = useRef(false);

  const { locale }: { locale: string } = useParams();

  const { cart, cartIsEmpty, cartTotal, deleteItemFromCart } = useCart();
  const t = useTranslations("CheckoutPage");

  useEffect(() => {
    if (cart && user && user.id && hasMadePaymentIntent.current === false) {
      hasMadePaymentIntent.current = true;

      const makeIntent = async () => {
        try {
          const body = {
            cart,
          };

          const paymentReq = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/create-payment-intent`,
            {
              body: JSON.stringify(body),
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
              method: "POST",
            },
          );

          const res = await paymentReq.json();

          if (res.error) {
            setError(res.error);
          } else if (res.client_secret) {
            setError(null);

            setClientSecret(res.client_secret);
          }
        } catch (error: unknown) {
          setError("Something went wrong.");
          console.error("Error:", error);
        }
      };

      void makeIntent();
    }
  }, [cart, user]);

  if (!stripe) return null;

  return (
    <div className="mx-auto mb-24 mt-40 flex w-11/12 max-w-[1440px] items-center">
      <article className="flex w-full flex-col-reverse justify-between gap-x-8 gap-y-4 md:flex-row">
        <section className="flex h-fit flex-col gap-y-3 rounded-3xl bg-turquoise-light px-4 py-6 md:w-2/3">
          <h2 className="font-semibold">{t("h1")}</h2>
          <Suspense fallback={<Fragment />}>
            {clientSecret && (
              <>
                {error && <p>{`Error: ${error}`}</p>}
                <Elements
                  stripe={stripe}
                  options={{
                    clientSecret,
                    appearance: {
                      theme: "stripe",
                      variables: {
                        colorPrimary: "#5E60CE",
                      },
                    },
                  }}
                >
                  <CheckoutForm locale={locale} />
                </Elements>
              </>
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
            />
          )}
        </aside>
      </article>
    </div>
  );
}
