"use client";

import type { Product, User } from "@/payload-types";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";

import type { CartItem } from "./reducer";

import { cartReducer } from "./reducer";
import { useAuth } from "../auth-context";

export type CartContext = {
  addItemToCart: (item: CartItem) => void;
  cart: User["cart"];
  cartIsEmpty: boolean | undefined;
  cartTotal: {
    amount: number;
    currency: string;
  };
  clearCart: () => void;
  deleteItemFromCart: (id: string) => void;
  hasInitializedCart: boolean;
  isProductInCart: (product: Product, variantId?: string) => boolean;
};

const Context = createContext({} as CartContext);

export const useCart = () => {
  const context = useContext(Context);
  return context;
};

const arrayHasItems = (array?: unknown[] | null): array is unknown[] =>
  Array.isArray(array) && array.length > 0;

const flattenCart = (cart: User["cart"]): User["cart"] => ({
  ...cart,
  items: cart?.items
    ?.map((item) => {
      if (!item?.product) {
        return null;
      }

      const productId =
        typeof item.product === "string" || typeof item.product === "number"
          ? item.product
          : item.product.id;

      return {
        ...item,
        product: productId,
        quantity: 1,
      };
    })
    .filter(Boolean) as CartItem[],
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const { status: authStatus, user } = useAuth();

  const [cart, dispatchCart] = useReducer(cartReducer, {});

  const [total, setTotal] = useState<{
    amount: number;
    currency: string;
  }>({
    amount: 0,
    currency: "usd",
  });

  const hasInitialized = useRef(false);
  const [hasInitializedCart, setHasInitialized] = useState(false);

  useEffect(() => {
    if (user === undefined) return;
    if (!hasInitialized.current) {
      hasInitialized.current = true;

      const syncCartFromLocalStorage = async () => {
        const localCart = localStorage.getItem("cart");

        const parsedCart = JSON.parse(localCart || "{}");

        if (parsedCart?.items && parsedCart?.items?.length > 0) {
          dispatchCart({
            type: "SET_CART",
            payload: {
              items: parsedCart.items,
            },
          });
        } else {
          dispatchCart({
            type: "SET_CART",
            payload: {
              items: [],
            },
          });
        }
      };

      void syncCartFromLocalStorage();
    }
  }, [user]);

  useEffect(() => {
    if (!hasInitialized.current) return;

    if (authStatus === "loggedIn") {
      dispatchCart({
        type: "MERGE_CART",
        payload: user?.cart,
      });
    }

    if (authStatus === "loggedOut") {
      dispatchCart({
        type: "CLEAR_CART",
      });
    }
  }, [user, authStatus]);

  useEffect(() => {
    if (!hasInitialized.current || user === undefined || !cart?.items) return;

    const flattenedCart = flattenCart(cart);

    if (user) {
      if (
        JSON.stringify(flattenCart(user.cart)) === JSON.stringify(flattenedCart)
      ) {
        setHasInitialized(true);
        return;
      }

      try {
        const syncCartToPayload = async () => {
          const req = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/${user.id}`,
            {
              body: JSON.stringify({
                cart: flattenedCart,
              }),
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
              method: "PATCH",
            },
          );

          if (req.ok) {
            localStorage.setItem("cart", "[]");
          }
        };

        void syncCartToPayload();
      } catch (e) {
        console.error("Error while syncing cart to Payload.");
      }
    } else {
      localStorage.setItem("cart", JSON.stringify(cart));
    }

    setHasInitialized(true);
  }, [user, cart]);

  const isProductInCart = useCallback(
    (incomingProduct: Product): boolean => {
      let isInCart = false;
      const { items: itemsInCart } = cart || {};

      if (Array.isArray(itemsInCart) && itemsInCart.length > 0) {
        isInCart = Boolean(
          itemsInCart.find(({ product }) => {
            const productId =
              typeof product === "string" || typeof product === "number"
                ? product
                : product?.id;

            return productId === incomingProduct.id;
          }),
        );
      }

      return isInCart;
    },
    [cart],
  );

  const addItemToCart = useCallback((incomingItem: CartItem) => {
    dispatchCart({
      type: "ADD_ITEM",
      payload: incomingItem,
    });
  }, []);

  const deleteItemFromCart = useCallback((id: string) => {
    dispatchCart({
      type: "DELETE_ITEM",
      payload: id,
    });
  }, []);

  const clearCart = useCallback(() => {
    dispatchCart({
      type: "CLEAR_CART",
    });
  }, []);

  useEffect(() => {
    if (!hasInitialized) return;

    const newTotal =
      cart?.items?.reduce((acc, item) => {
        if (typeof item.product === "string" || !item.product) return acc;

        let itemCost = 0;
        itemCost = item.unitPrice;

        return acc + itemCost;
      }, 0) || 0;

    setTotal({
      amount: newTotal,
      currency: "USD",
    });
  }, [cart, hasInitialized]);

  return (
    <Context.Provider
      value={{
        addItemToCart,
        cart,
        cartIsEmpty: hasInitializedCart && !arrayHasItems(cart?.items),
        cartTotal: total,
        clearCart,
        deleteItemFromCart,
        hasInitializedCart,
        isProductInCart,
      }}
    >
      {children}
    </Context.Provider>
  );
};
