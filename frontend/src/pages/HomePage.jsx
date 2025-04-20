import { Link } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Button from "../components/UI/Button";
import { FaUtensils, FaHistory, FaShoppingCart } from "react-icons/fa";

export default function HomePage() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto text-center py-12">
        <h1 className="text-4xl font-bold mb-6">Welcome to Digital Diner</h1>
        <p className="text-xl text-gray-600 mb-8">
          Order delicious food online for pickup - fast, fresh, and convenient!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <FaUtensils className="text-blue-600 text-4xl mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Browse Our Menu</h2>
            <p className="text-gray-600 mb-4">
              Explore our wide selection of delicious dishes
            </p>
            <Link to="/menu">
              <Button className="w-full">View Menu</Button>
            </Link>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <FaShoppingCart className="text-blue-600 text-4xl mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Your Cart</h2>
            <p className="text-gray-600 mb-4">
              Review your selected items and checkout
            </p>
            <Link to="/cart">
              <Button className="w-full">Go to Cart</Button>
            </Link>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <FaHistory className="text-blue-600 text-4xl mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Order History</h2>
            <p className="text-gray-600 mb-4">
              Check the status of your recent orders
            </p>
            <Link to="/orders">
              <Button className="w-full">View Orders</Button>
            </Link>
          </div>
        </div>

        <div className="bg-blue-50 p-8 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
          <ol className="text-left max-w-md mx-auto space-y-4">
            <li className="flex items-start">
              <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                1
              </span>
              <span>Browse our menu and add items to your cart</span>
            </li>
            <li className="flex items-start">
              <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                2
              </span>
              <span>Provide your contact information and place your order</span>
            </li>
            <li className="flex items-start">
              <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                3
              </span>
              <span>Receive confirmation with pickup time</span>
            </li>
            <li className="flex items-start">
              <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                4
              </span>
              <span>Pick up your delicious food at the restaurant!</span>
            </li>
          </ol>
        </div>
      </div>
    </Layout>
  );
}
