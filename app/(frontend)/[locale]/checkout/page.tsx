"use client";

import { useAuth } from "@/context/auth-context";
import { useCart } from "@/context/cart";
import { loadStripe } from "@stripe/stripe-js";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { Fragment, Suspense, useEffect, useRef, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { CheckoutForm } from "@/components/forms/checkout-form";
import Image from "next/image";
import { Product } from "@/payload-types";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

const apiKey = `${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`;
const stripe = loadStripe(apiKey);

export default function CheckoutPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [error, setError] = useState<null | string>(null);
  const [clientSecret, setClientSecret] = useState();
  const hasMadePaymentIntent = useRef(false);
  const [email, setEmail] = useState("");
  const [emailEditable, setEmailEditable] = useState(true);

  const { cart, cartIsEmpty, cartTotal, clearCart, deleteItemFromCart } =
    useCart();
  const t = useTranslations("CheckoutPage");

  useEffect(() => {
    if (
      cart &&
      (user || (Boolean(email) && !emailEditable)) &&
      hasMadePaymentIntent.current === false
    ) {
      hasMadePaymentIntent.current = true;

      const makeIntent = async () => {
        try {
          const body = !user
            ? {
                cart,
                email,
              }
            : undefined;

          const paymentReq = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/create-payment-intent`,
            {
              ...(body
                ? {
                    body: JSON.stringify(body),
                    headers: {
                      "Content-Type": "application/json",
                    },
                  }
                : {}),
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
        } catch (e) {
          setError("Something went wrong.");
        }
      };

      void makeIntent();
    }
  }, [cart, user, emailEditable, email]);

  if (!stripe) return null;

  return (
    <main className="mx-auto flex h-screen w-11/12 max-w-[1440px] items-center">
      <article className="flex w-full justify-between gap-x-8">
        <section className="flex h-fit w-2/3 flex-col gap-y-3 rounded-3xl bg-turquoise-light px-4 py-6">
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
                  <CheckoutForm />
                </Elements>
              </>
            )}
          </Suspense>
        </section>
        <aside className="h-fit w-1/3 rounded-3xl bg-turquoise-light px-4 py-6">
          {cartIsEmpty ? (
            <p>{t("cartIsEmpty")}</p>
          ) : (
            <div className="flex flex-col gap-y-7">
              <h2 className="font-semibold">{t("cart")}</h2>
              <div className="space-y-3">
                {cart?.items?.map((item) => {
                  if (!item.product) return null;

                  if (typeof item.product === "number") return null;

                  const {
                    product: { id, product_thumbnail, title },
                    unitPrice,
                  } = item;

                  const thumbnail =
                    typeof product_thumbnail === "object" &&
                    product_thumbnail?.url
                      ? product_thumbnail?.url
                      : null;

                  const formattedPrice = `$${(unitPrice / 100).toFixed(2)}`;

                  return (
                    <div
                      key={item.id}
                      className="w-full rounded-xl bg-off-white p-1"
                    >
                      {item.product && (
                        <div className="flex items-end justify-between">
                          <div className="flex items-center gap-x-2.5">
                            <div className="relative h-[120px] w-[140px]">
                              <Image
                                src={thumbnail!}
                                alt={title}
                                fill
                                className="rounded-xl object-cover"
                              />
                            </div>
                            <div className="space-y-5 py-2">
                              <h3 className="uppercase">{title}</h3>
                              <p className="text-2xl font-semibold text-purple-custom">
                                {formattedPrice}
                              </p>
                            </div>
                          </div>
                          <Button
                            size="icon"
                            onClick={() => deleteItemFromCart(item.id || "")}
                            className="mb-4 bg-transparent p-0 hover:bg-transparent"
                          >
                            <Trash2 className="!size-6 text-off-black transition-colors group-hover:text-red-500" />
                          </Button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              <h3 className="flex justify-between text-2xl">
                Total: <span>${cartTotal.amount / 100}</span>
              </h3>
            </div>
          )}
        </aside>
      </article>
    </main>
  );
}
