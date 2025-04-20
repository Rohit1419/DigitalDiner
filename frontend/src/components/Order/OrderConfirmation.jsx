import { Link } from "react-router-dom";
import Card from "../UI/Card";
import Button from "../UI/Button";
import { FaCheckCircle, FaHistory } from "react-icons/fa";

export default function OrderConfirmation({ order }) {
  if (!order) return null;

  // Calculate expected pickup time
  const orderDate = new Date(order.createdAt);
  const pickupTime = new Date(orderDate.getTime() + order.pickupTime * 60000);

  return (
    <Card className="max-w-2xl mx-auto text-center">
      <FaCheckCircle className="text-green-500 text-5xl mx-auto mb-4" />

      <h2 className="text-2xl font-bold mb-2">Order Confirmed!</h2>
      <p className="text-gray-600 mb-6">
        Thank you for your order, {order.customer?.name || "Customer"}!
      </p>

      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <h3 className="font-semibold text-lg mb-2">Order Details</h3>
        <p className="mb-1">
          Order ID: <span className="font-medium">{order.orderId}</span>
        </p>
        <p className="mb-1">
          Total Amount:{" "}
          <span className="font-medium">${order.totalAmount.toFixed(2)}</span>
        </p>
        <p className="mb-4">
          Estimated Pickup Time:{" "}
          <span className="font-medium">
            {pickupTime.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
          <span className="text-sm text-gray-500 block">
            (Approximately {order.pickupTime} minutes from now)
          </span>
        </p>
      </div>

      <div className="space-y-3">
        <Link to="/menu">
          <Button className="w-full ">Order More Food</Button>
        </Link>

        <Link to={`/orders/history/${order.customer?.phone}`}>
          <Button className="w-full bg-gray-600 hover:bg-gray-700">
            <FaHistory className="mr-2 inline" /> View Order History
          </Button>
        </Link>
      </div>
    </Card>
  );
}
