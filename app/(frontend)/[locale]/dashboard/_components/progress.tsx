import { Order } from "@/payload-types";
import React from "react";

interface ProgressProps {
  orders: Order[];
}

export const Progress = ({ orders }: ProgressProps) => {
  const products = orders.flatMap((order) => order.items || []);

  return (
    <div className="space-y-2">
      {products.map(
        (item) =>
          typeof item.product !== "number" && (
            <div
              key={item.product.id}
              className="flex w-full items-center justify-between gap-x-2"
            >
              <p className="min-w-[105px] whitespace-nowrap text-sm font-semibold">
                {item.product.title}
              </p>
              <div className="h-4 w-full rounded-full border border-turquoise-dark bg-white">
                <div className="h-full w-1/3 rounded-full bg-turquoise-dark" />
              </div>
              <p className="text-sm">61%</p>
            </div>
          ),
      )}
    </div>
  );
};
