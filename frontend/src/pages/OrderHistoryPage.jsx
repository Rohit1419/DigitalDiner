import { useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import OrderHistory from "../components/Order/OrderHistory";
import Button from "../components/UI/Button";
import { FaSearch } from "react-icons/fa";

export default function OrderHistoryPage() {
  const { phone } = useParams();
  const [phoneNumber, setPhoneNumber] = useState(phone || "");
  const [searchPhone, setSearchPhone] = useState(phone || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchPhone(phoneNumber);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Order History</h1>

        {!searchPhone && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Find Your Orders</h2>
            <p className="text-gray-600 mb-4">
              Enter the phone number you used to place your orders.
            </p>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3"
            >
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter your phone number (try:1234567890)"
                className="flex-grow p-2 border border-gray-300 rounded-md"
              />
              <Button type="submit">
                <FaSearch className="mr-2 inline" /> Find Orders
              </Button>
            </form>
          </div>
        )}

        {searchPhone && <OrderHistory phone={searchPhone} />}
      </div>
    </Layout>
  );
}
