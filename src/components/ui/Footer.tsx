import CartComponent from "@/components/CartComponent.tsx";
import { useCart } from "@/cart.tsx";

const Footer = () => {
  const { cart, ticketCount } = useCart();

  //sum of total price
  const totalPrice = cart.reduce((sum, record) => {
    return sum + record.ticketType.price;
  }, 0);

  return (
    <nav className="sticky bottom-0 left-0 right-0 bg-white border-t border-zinc-200 flex justify-center text-black">
      {/* inner content */}
      <div className="max-w-screen-lg p-6 flex justify-between items-center gap-4 grow">
        {/* total in cart state */}
        {ticketCount === 0 ? (
          <div className={"text-2xl font-semibold"}>Cart is empty</div>
        ) : (
          <div className="flex flex-col">
            <span>Total for {ticketCount} tickets</span>
            <span className="text-2xl font-semibold">
              {totalPrice.toFixed(2)} CZK
            </span>
          </div>
        )}

        {/* checkout button */}
        <CartComponent />
      </div>
    </nav>
  );
};

export default Footer;
