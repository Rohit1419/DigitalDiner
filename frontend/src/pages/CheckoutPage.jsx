import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import OrderForm from "../components/Order/OrderForm";
import { useCart } from "../context/CartContext";
import { createOrder } from "../services/orderService";
import CartSummary from "../components/Cart/CartSummary";
import CartItem from "../components/Cart/CartItem";

export default function CheckoutPage() {
  const { items, totalAmount, clearCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Use useEffect to handle empty cart navigation, but only if an order wasn't just placed
  useEffect(() => {
    if (items.length === 0 && !orderPlaced) {
      navigate("/cart");
    }
  }, [items.length, navigate, orderPlaced]);

  const handleSubmitOrder = async (formData) => {
    if (items.length === 0) {
      setError("Your cart is empty");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const orderData = {
        ...formData,
        items: items.map((item) => ({
          id: item.id || item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity || 1,
          prepTime: item.prepTime,
        })),
        totalAmount,
      };

      const response = await createOrder(orderData);

      if (response.success) {
        // Mark that an order was placed to prevent redirect
        setOrderPlaced(true);

        // Store order data in localStorage for confirmation page
        localStorage.setItem("lastOrder", JSON.stringify(response.data));

        // Clear the cart
        clearCart();

        // Redirect to confirmation page
        navigate("/order-confirmation", { replace: true });
      } else {
        setError(response.message || "Failed to place order");
      }
    } catch (error) {
      setError("Error placing order: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Return null during initial render if cart is empty and no order was placed
  if (items.length === 0 && !orderPlaced) {
    return null;
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <OrderForm onSubmit={handleSubmitOrder} isLoading={isLoading} />
          </div>

          <div>
            <div className="bg-white rounded-lg shadow-md p-4 mb-4">
              <h2 className="text-xl font-semibold mb-4">Order Items</h2>
              {items.map((item) => (
                <CartItem key={item.id || item._id} item={item} />
              ))}
            </div>

            <CartSummary />
          </div>
        </div>
      </div>
    </Layout>
  );
}
