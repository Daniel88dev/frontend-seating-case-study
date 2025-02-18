import { Button } from "@/components/ui/button.tsx";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover.tsx";
import { cn } from "@/lib/utils.ts";
import React from "react";
import { SeatDataType } from "@/components/Seating.tsx";

interface SeatProps extends React.HTMLAttributes<HTMLElement> {
  place: number;
  available: boolean;
  seatData: SeatDataType;
}

export const Seat = React.forwardRef<HTMLDivElement, SeatProps>(
  (props, ref) => {
    const isInCart = false;
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
                "bg-white border-green-400 text-zinc-200 hover:text-white hover:bg-zinc-100":
                  isInCart,
              }
            )}
            ref={ref}
          >
            <span className="text-xs font-medium">{props.place}</span>
          </div>
        </PopoverTrigger>
        <PopoverContent>
          <pre>{JSON.stringify({ seatData: null }, null, 2)}</pre>

          <footer className="flex flex-col">
            {isInCart ? (
              <Button disabled variant="destructive" size="sm">
                Remove from cart
              </Button>
            ) : (
              <Button disabled variant="default" size="sm">
                Add to cart
              </Button>
            )}
          </footer>
        </PopoverContent>
      </Popover>
    );
  }
);
