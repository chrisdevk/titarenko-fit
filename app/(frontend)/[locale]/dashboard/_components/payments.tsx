import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Order } from "@/payload-types";

interface PaymentProps {
  orders: Order[];
  order_id: string;
  createdAt: string;
  status: string;
  price: string;
  paid: string;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
};

export const Payments = ({
  orders,
  order_id,
  createdAt,
  status,
  price,
  paid,
}: PaymentProps) => {
  return (
    <Table className="overflow-hidden rounded-3xl bg-white">
      <TableHeader className="rounded-t-3xl bg-off-white">
        <TableRow className="text-lg">
          <TableHead>{order_id}</TableHead>
          <TableHead>{createdAt}</TableHead>
          <TableHead>{status}</TableHead>
          <TableHead className="text-right">{price}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id} className="text-lg">
            <TableCell className="font-medium">№{order.id}</TableCell>
            <TableCell>{formatDate(order.createdAt)}</TableCell>
            <TableCell>
              {order.stripePaymentIntentID && (
                <p className="flex w-fit items-center gap-x-1 rounded-3xl bg-green-100 px-2 text-green-500">
                  <span className="size-2 rounded-3xl bg-green-500" />{" "}
                  <span>{paid}</span>
                </p>
              )}
            </TableCell>
            <TableCell className="text-right">{`$${order.total / 100}`}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
