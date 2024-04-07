import { create } from "zustand";

const useCartStore = create((set) => ({
  total: 0,
  cartItems: [],
  setCarts: (newProduct) => {
    set((state) => {
      const existingCart = state.cartItems.find(
        (item) => item.id === newProduct.id
      );
      if (existingCart) {
        return {
          cartItems: state.cartItems.map((item) =>
            item.id === newProduct.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        return {
          cartItems: [...state.cartItems, { ...newProduct, quantity: 1 }],
        };
      }
    });
  },
  removeFromCart: (productId) => {
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.id !== productId),
    }));
  },
  updateQuantity: (productId, quantityModifier) => {
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.max(item.quantity + quantityModifier, 1) }
          : item
      ),
    }));
  },
  calculateTotal: (state) => {
    const total = state.cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    set({ total });
  },
}));

export default useCartStore;
