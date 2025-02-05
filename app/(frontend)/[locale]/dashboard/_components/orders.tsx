import { ScrollArea } from "@/components/ui/scroll-area";
import { Order } from "@/payload-types";
import { CourseCard } from "./course-card";

interface OrdersProps {
  orders: Order[];
  course_btn_text: string;
  locale: string;
}

export const Orders = ({ orders, course_btn_text, locale }: OrdersProps) => {
  const products = orders.flatMap((order) => order.items || []);

  return (
    <ScrollArea className="h-[275px] w-full rounded-md">
      <div className="flex flex-col flex-wrap justify-between gap-y-2 md:flex-row">
        {products.map((item) => {
          let imgSrc;

          if (typeof item.product !== "number") {
            imgSrc =
              typeof item.product.product_thumbnail === "object" &&
              item.product.product_thumbnail?.url
                ? item.product.product_thumbnail?.url
                : "/images/no-image.jpg";
          }

          return (
            typeof item.product !== "number" && (
              <CourseCard
                key={item.id}
                title={item.product.title}
                path={`/${locale}/dashboard/${item.product.id}`}
                imgSrc={imgSrc || "/images/no-image.jpg"}
                course_btn_text={course_btn_text}
              />
            )
          );
        })}
      </div>
    </ScrollArea>
  );
};
