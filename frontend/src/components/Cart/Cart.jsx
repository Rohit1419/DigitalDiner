import { useCart } from "../../context/CartContext";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import Button from "../UI/Button";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

export default function Cart() {
  const { items, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-semibold mb-4">Your Cart is Empty</h2>
        <p className="text-gray-600 mb-6">
          Add some delicious items from our menu!
        </p>
        <Link
          to="/menu"
          className="inline-flex items-center text-blue-600 hover:underline"
        >
          <FaArrowLeft className="mr-2" /> Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Your Cart</h2>
          <Button onClick={clearCart} className="bg-red-500 hover:bg-red-600">
            Clear Cart
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow-md">
          {items.map((item) => (
            <CartItem key={item.id || item._id} item={item} />
          ))}
        </div>
      </div>

      <div>
        <CartSummary />
      </div>
    </div>
  );
}
