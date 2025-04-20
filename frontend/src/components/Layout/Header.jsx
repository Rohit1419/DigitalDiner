import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { FaShoppingCart } from "react-icons/fa";

export default function Header() {
  const { totalItems } = useCart();

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Digital Diner
        </Link>
        <nav className="flex items-center space-x-6">
          <Link to="/menu" className="hover:text-blue-200 transition-colors">
            Menu
          </Link>
          <Link to="/cart" className="relative">
            <FaShoppingCart className="text-xl hover:text-blue-200 transition-colors" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
          <Link to="/orders" className="hover:text-blue-200 transition-colors">
            My Orders
          </Link>
        </nav>
      </div>
    </header>
  );
}
