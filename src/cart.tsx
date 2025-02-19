import {
  createContext,
  PropsWithChildren,
  useContext,
  useReducer,
} from "react";
import { SeatDataType } from "@/components/Seating.tsx";

type CartContextType = {
  cart: SeatDataType[];
  addToCart: (seat: SeatDataType) => void;
  removeFromCart: (seat: SeatDataType) => void;
  checkInCart: (seatId: string) => boolean;
  ticketCount: number;
};
type CartActionTypes =
  | { type: "ADD_TICKET"; seat: SeatDataType }
  | { type: "REMOVE_TICKET"; seat: SeatDataType };

const CartContext = createContext<CartContextType | undefined>(undefined);

const cartReducer = (cart: SeatDataType[], action: CartActionTypes) => {
  switch (action.type) {
    case "ADD_TICKET": {
      const findDuplicate = cart.find(
        (record) => record.seatType.seatId === action.seat.seatType.seatId
      );
      if (findDuplicate) {
        return cart;
      } else {
        return [...cart, action.seat];
      }
    }
    case "REMOVE_TICKET": {
      return cart.filter(
        (record) => record.seatType.seatId !== action.seat.seatType.seatId
      );
    }
    default:
      return cart;
  }
};

const CartProvider = ({ children }: PropsWithChildren) => {
  const initialCart: SeatDataType[] = [];

  const [cart, dispatch] = useReducer(cartReducer, initialCart);

  const addToCart = (seat: SeatDataType) => {
    dispatch({ type: "ADD_TICKET", seat });
  };

  const removeFromCart = (seat: SeatDataType) => {
    dispatch({ type: "REMOVE_TICKET", seat });
  };

  const checkInCart = (seatId: string) => {
    const check = cart.find((record) => {
      record.seatType.seatId === seatId;
    });

    return !!check;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        checkInCart,
        ticketCount: cart.length,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export { CartProvider, useCart };
