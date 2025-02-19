import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useCart } from "@/cart.tsx";
import { TicketType } from "@/components/Seating.tsx";

type TicketCountType = TicketType & {
  count: number;
};

const CartComponent = () => {
  const [open, setOpen] = useState(false);
  const { cart, ticketCount } = useCart();

  //Create array of unique tickets from cart items,including Quantity of each unique item
  const ticketCountArray: TicketCountType[] = Object.values(
    cart.reduce((acc, ticket) => {
      const ticketType = ticket.ticketType;
      if (acc[ticketType.id]) {
        acc[ticketType.id].count++;
      } else {
        acc[ticketType.id] = {
          ...ticketType,
          count: 1,
        };
      }
      return acc;
    }, {} as Record<string, TicketCountType>)
  );

  //calculate total Price of all tickets
  const totalPrice = ticketCountArray.reduce((sum, record) => {
    return sum + record.price * record.count;
  }, 0);

  //using ShadCn Dialog component
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          disabled={ticketCount === 0}
          variant="default"
          onClick={() => setOpen(true)}
        >
          Checkout now
        </Button>
      </DialogTrigger>
      <DialogContent className={"bg-white text-black"}>
        <DialogHeader>
          <DialogTitle>Checkout</DialogTitle>
          <DialogDescription>Total items: {ticketCount}</DialogDescription>
        </DialogHeader>
        <ul className={"flex flex-col gap-y-4"}>
          {ticketCountArray.map((ticket) => (
            <li key={`ticket-${ticket.id}`} className={"flex flex-col"}>
              <h3>Ticket Name: {ticket.name}</h3>
              <div className={"flex flex-row gap-2"}>
                <p>Price: {ticket.price.toFixed(2)} CZK</p>
                <p>Count: {ticket.count}</p>
              </div>
              <p>Sub-Total: {(ticket.price * ticket.count).toFixed(2)} CZK</p>
            </li>
          ))}
        </ul>
        <h2>Total Price: {totalPrice.toFixed(2)} CZK</h2>
      </DialogContent>
    </Dialog>
  );
};

export default CartComponent;
