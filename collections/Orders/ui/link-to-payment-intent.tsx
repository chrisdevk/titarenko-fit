"use client";

import type { TextField } from "payload";

import { useFormFields } from "@payloadcms/ui";
import * as React from "react";

export const LinkToPaymentIntent: React.FC<TextField> = (props) => {
  const { name, label } = props;

  const { value: stripePaymentIntentID } =
    useFormFields(([fields]) => fields[name]) || {};

  const href = `https://dashboard.stripe.com/${
    process.env.PAYLOAD_PUBLIC_STRIPE_IS_TEST_KEY ? "test/" : ""
  }payments/${stripePaymentIntentID}`;

  return (
    <div>
      <p style={{ marginBottom: "0" }}>
        {typeof label === "string" ? label : "Stripe Payment Intent ID"}
      </p>
      {Boolean(stripePaymentIntentID) && (
        <div>
          <div>
            <span
              className="label"
              style={{
                color: "#9A9A9A",
              }}
            >
              Manage in Stripe
            </span>
          </div>
          <div
            style={{
              fontWeight: "600",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            <a
              href={`https://dashboard.stripe.com/${
                process.env.PAYLOAD_PUBLIC_STRIPE_IS_TEST_KEY ? "test/" : ""
              }customers/${stripePaymentIntentID}`}
              rel="noreferrer noopener"
              target="_blank"
            >
              {href}
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
