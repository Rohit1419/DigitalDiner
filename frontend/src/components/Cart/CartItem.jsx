import { useCart } from "../../context/CartContext";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";

export default function CartItem({ item }) {
  const { addItem, removeItem } = useCart();

  return (
    <div className="flex items-center justify-between py-4 border-b">
      <div className="flex-1">
        <h3 className="font-medium">{item.name}</h3>
        <p className="text-gray-600 text-sm">${item.price.toFixed(2)} each</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center">
          <button
            onClick={() => removeItem(item.id || item._id)}
            className="p-1 text-gray-500 hover:text-red-500"
          >
            <FaMinus size={14} />
          </button>

          <span className="mx-2 w-6 text-center">{item.quantity}</span>

          <button
            onClick={() => addItem(item)}
            className="p-1 text-gray-500 hover:text-green-500"
          >
            <FaPlus size={14} />
          </button>
        </div>

        <span className="font-medium w-20 text-right">
          ${(item.price * item.quantity).toFixed(2)}
        </span>

        <button
          onClick={() => {
            for (let i = 0; i < item.quantity; i++) {
              removeItem(item.id || item._id);
            }
          }}
          className="p-1 text-gray-500 hover:text-red-500"
        >
          <FaTrash size={14} />
        </button>
      </div>
    </div>
  );
}
