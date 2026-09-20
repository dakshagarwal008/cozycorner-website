"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
export interface CartItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
  stock: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");

    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
function addToCart(item: CartItem) {
  setCart((prev) => {
    const existing = prev.find((p) => p.id === item.id);
    const requestedQuantity = Math.max(1, Math.floor(item.quantity || 1));

    // Product is completely out of stock
    if (item.stock <= 0) {
      return prev;
    }

    // Product already exists in cart
    if (existing) {
      // Already reached maximum stock
      if (existing.quantity >= item.stock) {
        return prev;
      }

      return prev.map((p) =>
        p.id === item.id
          ? {
              ...p,
              quantity: Math.min(
                p.quantity + requestedQuantity,
                item.stock
              ),
              stock: item.stock,
            }
          : p
      );
    }

    // Add product for the first time
    return [
      ...prev,
      {
        ...item,
        quantity: Math.min(requestedQuantity, item.stock),
      },
    ];
  });
}
  function removeFromCart(id: string) {
    setCart((prev) => prev.filter((p) => p.id !== id));
  }

  function increaseQuantity(id: string) {
    setCart((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, quantity: p.quantity + 1 }
          : p
      )
    );
  }

  function decreaseQuantity(id: string) {
    setCart((prev) =>
      prev
        .map((p) =>
          p.id === id
            ? { ...p, quantity: p.quantity - 1 }
            : p
        )
        .filter((p) => p.quantity > 0)
    );
  }

  function clearCart() {
    setCart([]);
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}
