import { useState } from "react";
import { useCart } from "../../context/CartContext";
import Button from "../UI/Button";
import Card from "../UI/Card";

export default function OrderForm({ onSubmit, isLoading }) {
  const { items, totalAmount } = useCart();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const orderData = {
      name: formData.name,
      phone: formData.phone,
      items: items.map((item) => ({
        id: item.id || item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        prepTime: item.prepTime,
      })),
      totalAmount,
    };

    onSubmit(orderData);
  };

  return (
    <Card>
      <h2 className="text-xl font-semibold mb-4">Contact Information</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your full name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="phone" className="block text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md ${
              errors.phone ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your phone number"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Processing..." : "Place Order"}
        </Button>
      </form>
    </Card>
  );
}
