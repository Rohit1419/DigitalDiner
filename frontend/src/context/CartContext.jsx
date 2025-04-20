import { createContext, useContext, useReducer, useEffect } from "react";

const CartContext = createContext();

const initialState = {
  items: [],
  totalAmount: 0,
  totalItems: 0,
};

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      let updatedItems;

      if (existingItemIndex !== -1) {
        // Item already exists, update quantity
        updatedItems = state.items.map((item, index) => {
          if (index === existingItemIndex) {
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          }
          return item;
        });
      } else {
        // Add new item
        updatedItems = [...state.items, { ...action.payload, quantity: 1 }];
      }

      // Calculate new totals
      const totalAmount = updatedItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      const totalItems = updatedItems.reduce(
        (sum, item) => sum + item.quantity,
        0
      );

      return {
        items: updatedItems,
        totalAmount,
        totalItems,
      };
    }

    case "REMOVE_ITEM": {
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload
      );

      if (existingItemIndex === -1) return state;

      const existingItem = state.items[existingItemIndex];
      let updatedItems;

      if (existingItem.quantity === 1) {
        // Remove item completely
        updatedItems = state.items.filter((item) => item.id !== action.payload);
      } else {
        // Decrease quantity
        updatedItems = state.items.map((item) => {
          if (item.id === action.payload) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        });
      }

      // Calculate new totals
      const totalAmount = updatedItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      const totalItems = updatedItems.reduce(
        (sum, item) => sum + item.quantity,
        0
      );

      return {
        items: updatedItems,
        totalAmount,
        totalItems,
      };
    }

    case "CLEAR_CART":
      return initialState;

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        Object.keys(initialState).forEach((key) => {
          if (!(key in parsedCart)) {
            throw new Error(`Invalid cart data: missing ${key}`);
          }
        });
        dispatch({ type: "REPLACE_CART", payload: parsedCart });
      } catch (error) {
        console.error("Failed to parse saved cart:", error);
        localStorage.removeItem("cart");
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state));
  }, [state]);

  const addItem = (item) => {
    dispatch({ type: "ADD_ITEM", payload: item });
  };

  const removeItem = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        addItem,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
