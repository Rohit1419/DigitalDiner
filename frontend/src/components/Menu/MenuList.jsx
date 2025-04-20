import { useState, useEffect } from "react";
import { getAllMenuItems } from "../../services/menuService";
import MenuItem from "./MenuItem";
import MenuCategories from "./MenuCategories";
import Loading from "../UI/Loading";

export default function MenuList({ searchTerm = "" }) {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        setLoading(true);
        const response = await getAllMenuItems();
        if (response.success) {
          setMenuItems(response.data);

          // Extract unique categories
          const uniqueCategories = [
            ...new Set(response.data.map((item) => item.category)),
          ];
          setCategories(uniqueCategories);
        } else {
          setError("Failed to fetch menu items");
        }
      } catch (error) {
        setError("Error fetching menu items: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  // Filter items by category and search term
  const filteredItems = menuItems.filter((item) => {
    // Filter by category if active
    const categoryMatch = activeCategory
      ? item.category === activeCategory
      : true;

    // Filter by search term if provided
    const searchMatch = searchTerm
      ? item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      : true;

    return categoryMatch && searchMatch;
  });

  if (loading) return <Loading />;

  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div>
      <MenuCategories
        categories={categories}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
      />

      {filteredItems.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 text-lg">
            {searchTerm
              ? `No menu items found matching "${searchTerm}"`
              : "No menu items available in this category."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <MenuItem
              key={item._id}
              item={{
                ...item,
                id: item._id, // Ensure id is available for cart operations
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
