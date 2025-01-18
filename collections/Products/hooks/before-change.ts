import type { CollectionBeforeChangeHook } from "payload";
import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripe = new Stripe(stripeSecretKey || "", { apiVersion: "2022-08-01" });

const logs = false;

type CourseData = {
  skipSync?: boolean;
  stripeProductID?: string;
  description?: string;
  priceJSON?: string;
};

export const beforeProductChange: CollectionBeforeChangeHook = async ({
  req,
  data,
}) => {
  const { payload } = req;
  const newDoc: CourseData = {
    ...data,
    skipSync: false,
  };

  if (data.skipSync) {
    if (logs) payload.logger.info(`Skipping product 'beforeChange' hook`);
    return newDoc;
  }

  if (!data.stripeProductID) {
    if (logs)
      payload.logger.info(
        `No Stripe product assigned to this document, skipping product 'beforeChange' hook`
      );
    return newDoc;
  }

  if (logs) payload.logger.info(`Looking up product from Stripe...`);

  try {
    const stripeProduct = await stripe.products.retrieve(data.stripeProductID);
    if (logs)
      payload.logger.info(`Found product from Stripe: ${stripeProduct.name}`);
    if (stripeProduct.description !== null) {
      newDoc.description = stripeProduct.description;
    } else {
      newDoc.description = "";
    }
  } catch (error: unknown) {
    payload.logger.error(`Error fetching product from Stripe: ${error}`);
    return newDoc;
  }

  if (logs) payload.logger.info(`Looking up price from Stripe...`);

  try {
    const allPrices = await stripe.prices.list({
      product: data.stripeProductID,
      limit: 100,
    });

    newDoc.priceJSON = JSON.stringify(allPrices);
  } catch (error: unknown) {
    payload.logger.error(`Error fetching prices from Stripe: ${error}`);
  }

  return newDoc;
};
