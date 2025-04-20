export default function Button({
  children,
  onClick,
  type = "button",
  className = "",
  disabled = false,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 m-2.5 rounded-md font-medium transition-colors hover:cursor-pointer ${
        disabled
          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
          : "bg-blue-600 text-white hover:bg-blue-700"
      } ${className}`}
    >
      {children}
    </button>
  );
}
