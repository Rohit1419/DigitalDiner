import { useState, useEffect } from "react";
import { getOrdersByPhone } from "../../services/orderService";
import Card from "../UI/Card";
import Loading from "../UI/Loading";
import { Link } from "react-router-dom";

export default function OrderHistory({ phone }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!phone) return;

      try {
        setLoading(true);
        const response = await getOrdersByPhone(phone);

        if (response.success) {
          setOrders(response.data);
        } else {
          setError(response.message || "Failed to fetch orders");
        }
      } catch (error) {
        setError("Error fetching order history: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [phone]);

  if (loading) return <Loading />;

  if (error) return <div className="text-red-500 text-center">{error}</div>;

  if (orders.length === 0) {
    return (
      <Card className="text-center py-6">
        <h2 className="text-xl font-semibold mb-2">No Orders Found</h2>
        <p className="text-gray-600 mb-4">
          You haven't placed any orders yet with this phone number.
        </p>
        <Link to="/menu" className="text-blue-600 hover:underline">
          Browse our menu
        </Link>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold mb-4">Your Order History</h2>

      {orders.map((order) => {
        // Calculate pickup time
        const orderDate = new Date(order.createdAt);
        const pickupTime = new Date(
          orderDate.getTime() + (order.pickupTime || 30) * 60000
        );

        // Convert totalAmount to a number if it's a string
        const totalAmount =
          typeof order.totalAmount === "string"
            ? parseFloat(order.totalAmount)
            : order.totalAmount || 0;

        return (
          <Card key={order.id} className="hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">Order #{order.id}</h3>
                <p className="text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString()} at{" "}
                  {new Date(order.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              <div className="text-right">
                <span
                  className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    order.status === "completed"
                      ? "bg-green-100 text-green-800"
                      : order.status === "cancelled"
                      ? "bg-red-100 text-red-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
                <p className="text-sm font-medium mt-1">
                  ${totalAmount.toFixed(2)}
                </p>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t">
              <p className="text-sm">
                <span className="font-medium">Pickup Time:</span>{" "}
                {pickupTime.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              <div className="mt-2">
                <p className="text-sm font-medium">Items:</p>
                <ul className="text-sm text-gray-600">
                  {order.OrderItems?.map((item) => {
                    // Convert item price to a number if it's a string
                    const price =
                      typeof item.price === "string"
                        ? parseFloat(item.price)
                        : item.price || 0;

                    return (
                      <li key={item.id} className="flex justify-between">
                        <span>
                          {item.quantity}x {item.name}
                        </span>
                        <span>${(price * item.quantity).toFixed(2)}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t flex justify-end">
              <Link
                to={`/orders/${order.id}`}
                className="text-blue-600 hover:underline text-sm"
              >
                View Order Details
              </Link>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
