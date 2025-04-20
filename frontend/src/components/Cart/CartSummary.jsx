import { useCart } from "../../context/CartContext";
import Button from "../UI/Button";
import { useNavigate } from "react-router-dom";

export default function CartSummary() {
  const { totalAmount, totalItems } = useCart();
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between">
          <span>Items ({totalItems}):</span>
          <span>${totalAmount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-medium text-lg pt-2 border-t">
          <span>Total:</span>
          <span>${totalAmount.toFixed(2)}</span>
        </div>
      </div>

      <Button
        onClick={() => navigate("/checkout")}
        className="w-full"
        disabled={totalItems === 0}
      >
        Proceed to Checkout
      </Button>
    </div>
  );
}
