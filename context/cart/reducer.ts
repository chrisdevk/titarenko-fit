import type { User, CartItems } from "@/payload-types";

export type CartItem = Exclude<CartItems, null>[number];

type CartType = User["cart"];

type CartAction =
  | { payload: CartItem; type: "ADD_ITEM" }
  | { payload: CartType; type: "MERGE_CART" }
  | { payload: CartType; type: "SET_CART" }
  | { payload: string; type: "DELETE_ITEM" }
  | { type: "CLEAR_CART" };

export const cartReducer = (cart: CartType, action: CartAction): CartType => {
  switch (action.type) {
    case "SET_CART": {
      return action.payload;
    }

    case "MERGE_CART": {
      const { payload: incomingCart } = action;

      const syncedItems: CartItem[] = [
        ...(cart?.items || []),
        ...(incomingCart?.items || []),
      ].reduce((acc: CartItem[], item) => {
        const productId =
          typeof item.product === "object" ? item.product?.id : item.product;

        if (
          !acc.some(
            ({ product }) =>
              (typeof product === "object" ? product?.id : product) ===
              productId,
          )
        ) {
          acc.push(item);
        }
        return acc;
      }, []);

      return { ...cart, items: syncedItems };
    }

    case "ADD_ITEM": {
      const { payload: incomingItem } = action;
      const productId =
        typeof incomingItem.product === "object"
          ? incomingItem.product?.id
          : incomingItem.product;

      if (
        cart?.items?.some(
          ({ product }) =>
            (typeof product === "object" ? product?.id : product) === productId,
        )
      ) {
        return cart;
      }

      return { ...cart, items: [...(cart?.items || []), incomingItem] };
    }

    case "DELETE_ITEM": {
      return {
        ...cart,
        items: cart?.items?.filter(({ id }) => id !== action.payload) || [],
      };
    }

    case "CLEAR_CART": {
      return { ...cart, items: [] };
    }

    default: {
      return cart;
    }
  }
};
