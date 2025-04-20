import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import OrderConfirmation from "../components/Order/OrderConfirmation";

export default function OrderConfirmationPage() {
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get order data from localStorage
    const lastOrder = localStorage.getItem("lastOrder");

    if (!lastOrder) {
      // If no order data, redirect to home
      navigate("/");
      return;
    }

    try {
      setOrder(JSON.parse(lastOrder));
    } catch (error) {
      console.error("Failed to parse order data:", error);
      navigate("/");
    }
  }, [navigate]);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-8">
        <OrderConfirmation order={order} />
      </div>
    </Layout>
  );
}
