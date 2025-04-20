import { useCart } from "../../context/CartContext";
import Card from "../UI/Card";
import Button from "../UI/Button";

export default function MenuItem({ item }) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(item);
  };

  return (
    <Card className="h-full flex flex-col">
      <div className="flex-grow">
        <h3 className="text-lg font-semibold">{item.name}</h3>
        <p className="text-gray-600 mt-1">{item.description}</p>
        <div className="flex items-center mt-2 space-x-2">
          <span className="text-blue-600 font-bold">
            ${item.price.toFixed(2)}
          </span>
          {item.isVegetarian && (
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
              Vegetarian
            </span>
          )}
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Prep time: {item.prepTime} mins
        </p>
      </div>
      <Button onClick={handleAddToCart} className="w-full mt-4">
        Add to Cart
      </Button>
    </Card>
  );
}
