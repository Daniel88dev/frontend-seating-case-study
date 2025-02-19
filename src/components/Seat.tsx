import { Button } from "@/components/ui/button.tsx";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover.tsx";
import { cn } from "@/lib/utils.ts";
import React, { useMemo } from "react";
import { SeatDataType } from "@/components/Seating.tsx";
import { useCart } from "@/cart.tsx";

interface SeatProps extends React.HTMLAttributes<HTMLElement> {
  place: number;
  available: boolean;
  row: number;
  seatData: SeatDataType;
}

export const Seat = React.forwardRef<HTMLDivElement, SeatProps>(
  (props, ref) => {
    const { addToCart, removeFromCart, cart } = useCart();

    //using useMemo to force updating cart state for each seat
    const isInCart = useMemo(() => {
      return cart.some(
        (item) => item.seatType.seatId === props.seatData.seatType.seatId
      );
    }, [cart, props.seatData.seatType.seatId]);

    return (
      <Popover>
        <PopoverTrigger disabled={!props.available}>
          <div
            className={cn(
              "size-8 rounded-full bg-zinc-100 hover:bg-zinc-200 transition-color",
              props.className,
              {
                "bg-zinc-100 text-black hover:bg-zinc-200": props.available,
                "bg-red-400 text-zinc-200 hover:bg-red-500": !props.available,
                "bg-green-400 text-black hover:bg-green-600": isInCart,
              }
            )}
            ref={ref}
          >
            <span className="text-xs font-medium">{props.place}</span>
          </div>
        </PopoverTrigger>
        <PopoverContent>
          <h2>Selected Seat:</h2>
          <div className={"flex flex-row gap-4"}>
            <p>Row: {props.row}</p>
            <p>Seat: {props.place}</p>
          </div>
          <div className={"flex flex-row gap-4"}>
            <p>Ticket Name: {props.seatData.ticketType.name}</p>
            <p>
              Ticket Price: {props.seatData.ticketType.price.toFixed(2)} CZK
            </p>
          </div>
          <footer className="flex flex-col">
            {isInCart ? (
              <Button
                variant="destructive"
                size="sm"
                onClick={() => removeFromCart(props.seatData)}
              >
                Remove from cart
              </Button>
            ) : (
              <Button
                variant="default"
                size="sm"
                onClick={() => addToCart(props.seatData)}
              >
                Add to cart
              </Button>
            )}
          </footer>
        </PopoverContent>
      </Popover>
    );
  }
);
