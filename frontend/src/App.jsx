import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";

// Import pages
import HomePage from "./pages/HomePage";
import MenuPage from "./pages/MenuPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import OrderHistoryPage from "./pages/OrderHistoryPage";

function App() {
  return (
    <Router>
      <CartProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route
            path="/order-confirmation"
            element={<OrderConfirmationPage />}
          />
          <Route path="/orders" element={<OrderHistoryPage />} />
          <Route path="/orders/history/:phone" element={<OrderHistoryPage />} />
        </Routes>
      </CartProvider>
    </Router>
  );
}

export default App;
