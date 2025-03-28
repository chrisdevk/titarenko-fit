"use client";

import { Button } from "@/components/ui/button";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";
import { useCart } from "@/context/cart";

export const CheckoutForm = ({ locale }: { locale: string }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = React.useState<null | string>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();
  const { clearCart } = useCart();

  function wait(delay = 500) {
    return new Promise((resolve) => setTimeout(resolve, delay));
  }

  const fetchRetry = useCallback(
    async (
      url: string,
      fetchOptions = {},
      delay = 750,
      tries = 3,
    ): Promise<Response> => {
      function onError(err: Error) {
        const triesLeft = tries - 1;
        if (!triesLeft) {
          throw err;
        }
        return wait(delay).then(() =>
          fetchRetry(url, fetchOptions, delay, triesLeft),
        );
      }

      return fetch(url, fetchOptions).catch(onError);
    },
    [],
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsLoading(true);

      if (stripe && elements) {
        try {
          const { error: stripeError, paymentIntent } =
            await stripe.confirmPayment({
              confirmParams: {
                return_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/order-confirmation`,
              },
              elements,
              redirect: "if_required",
            });

          if (stripeError?.message) {
            setError(stripeError.message);
            setIsLoading(false);
          }

          if (paymentIntent?.id) {
            /**
             * We need to wait for an order to be created on the backend, so we try a few fetches
             * with a delay in between to give the server time to process the order
             */
            try {
              const query = new URLSearchParams();

              query.append("limit", "1");
              query.append("depth", "0");
              query.append(
                "where",
                `[stripePaymentIntentID][equals]=${paymentIntent.id}`,
              );

              const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/orders?${query.toString()}`;

              setTimeout(() => {
                fetch(url, {
                  credentials: "include",
                  method: "GET",
                })
                  .then((res) => res.json())
                  .then(() => {
                    clearCart();
                    router.push(`/${locale}/dashboard`);
                  })
                  .catch((err: Error) => {
                    throw new Error(err?.message || "Something went wrong.");
                  });
              }, 3000);
            } catch (err: unknown) {
              if (err instanceof Error) {
                console.error(err.message);
              } else {
                console.error("An unknown error occurred.");
              }
            }
          }
        } catch (err: Error | unknown) {
          const msg =
            err instanceof Error ? err.message : "Something went wrong.";
          setError(`Error while submitting payment: ${msg}`);
          setIsLoading(false);
        }
      }
    },
    [stripe, elements, clearCart, router, locale],
  );

  return (
    <form onSubmit={handleSubmit}>
      {error && <p>{error}</p>}
      <PaymentElement options={{ paymentMethodOrder: ["card"] }} />
      <div className="mt-8 flex gap-4">
        <Button disabled={!stripe || isLoading} type="submit" variant="default">
          {isLoading ? "Loading..." : "Pay now"}
        </Button>
      </div>
    </form>
  );
};

export default CheckoutForm;
