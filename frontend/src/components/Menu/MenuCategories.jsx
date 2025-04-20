export default function MenuCategories({
  categories,
  activeCategory,
  onSelectCategory,
}) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <button
        onClick={() => onSelectCategory(null)}
        className={`px-4 py-2 rounded-full ${
          activeCategory === null
            ? "bg-blue-600 text-white"
            : "bg-gray-200 text-gray-800 hover:bg-gray-300"
        }`}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`px-4 py-2 rounded-full ${
            activeCategory === category
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
