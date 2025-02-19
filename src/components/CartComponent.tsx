import { FormEvent, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useCart } from "@/cart.tsx";
import { TicketType } from "@/components/Seating.tsx";
import { LoginState } from "@/App.tsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { toast } from "sonner";

type TicketCountType = TicketType & {
  count: number;
};

type Props = {
  userData: LoginState;
  eventId: string;
};

const CartComponent = ({ userData, eventId }: Props) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
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

  //on Checkout Submit
  const onCheckOutSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const email = userData.isLoggedIn
      ? userData.email
      : event.currentTarget.email.value;

    const firstName = userData.isLoggedIn
      ? userData.firstName
      : event.currentTarget.firstName.value;

    const lastName = userData.isLoggedIn
      ? userData.lastName
      : event.currentTarget.lastName.value;

    if (!email) {
      setError("Email is required");
      setIsLoading(false);
      return;
    }

    if (!firstName) {
      setError("First Name is required");
      setIsLoading(false);
      return;
    }

    if (!lastName) {
      setError("Last Name is required");
      setIsLoading(false);
      return;
    }

    const tickets = cart.map((record) => {
      return {
        ticketTypeId: record.ticketType.id,
        seatId: record.seatType.seatId,
      };
    });

    if (tickets.length === 0) {
      setError("Cart is empty");
      setIsLoading(false);
      return;
    }

    const response = await fetch(
      "https://nfctron-frontend-seating-case-study-2024.vercel.app/order",
      {
        method: "POST",
        body: JSON.stringify({
          eventId,
          tickets,
          user: { email, firstName, lastName },
        }),
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!response.ok) {
      setError("Order failed");
      setIsLoading(false);
      toast.error("Order failed", { style: { color: "red" } });
      return;
    }

    const result = await response.json();

    console.log(result);

    toast("Order Completed!");
    setIsLoading(false);
    setError(null);
    setOpen(false);
  };

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
        <Card>
          <CardHeader>
            <CardTitle>Your Cart:</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className={"flex flex-col gap-y-4"}>
              {ticketCountArray.map((ticket) => (
                <li key={`ticket-${ticket.id}`} className={"flex flex-col"}>
                  <h3>Ticket Name: {ticket.name}</h3>
                  <div className={"flex flex-row gap-2"}>
                    <p>Price: {ticket.price.toFixed(2)} CZK</p>
                    <p>Qty: {ticket.count}</p>
                  </div>
                  <p>
                    Sub-Total: {(ticket.price * ticket.count).toFixed(2)} CZK
                  </p>
                  <Separator />
                </li>
              ))}
            </ul>
            <CardFooter className={"mt-4"}>
              <h2 className={"font-bold"}>
                Total Price: {totalPrice.toFixed(2)} CZK
              </h2>
            </CardFooter>
          </CardContent>
        </Card>
        <form onSubmit={onCheckOutSubmit}>
          {!userData.isLoggedIn && (
            <Card>
              <CardHeader>
                <CardTitle>User Informations:</CardTitle>
                <CardDescription>
                  Or you can Login/Register to not input informations manually
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Label htmlFor={"email"}>Your Email:</Label>
                <Input id={"email"} name={"email"} type={"email"} />
                <Label htmlFor={"firstName"}>First Name:</Label>
                <Input id={"firstName"} name={"firstName"} type={"email"} />
                <Label htmlFor={"lastName"}>Last Name:</Label>
                <Input id={"lastName"} name={"lastName"} type={"lastName"} />
              </CardContent>
            </Card>
          )}
          {error && <p className={"text-red-500"}>{error}</p>}
          <DialogFooter className={"mt-4"}>
            <Button type={"submit"} disabled={isLoading}>
              Order
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CartComponent;
