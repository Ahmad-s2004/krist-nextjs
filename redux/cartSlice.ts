import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  id: string;
  title: string;
  price: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const getInitialCart = (): CartItem[] => {
  if (typeof window !== "undefined") {
    const savedCart = localStorage.getItem("krist_cart");
    return savedCart ? JSON.parse(savedCart) : [];
  }
  return [];
};

const initialState: CartState = {
  items: getInitialCart(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
reducers: {
  setCartFromBackend: (state, action: PayloadAction<CartItem[]>) => {
    state.items = action.payload;
    if (typeof window !== "undefined") {
      localStorage.setItem("krist_cart", JSON.stringify(state.items));
    }
  },
  addToCart: (state, action: PayloadAction<Omit<CartItem, "quantity"> & { quantity: number }>) => {
    const { id, size, color, quantity } = action.payload;
    const existingItem = state.items.find(
      (item) => item.id === id && item.size === size && item.color === color
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      state.items.push(action.payload);
    }
    localStorage.setItem("krist_cart", JSON.stringify(state.items));
  },
  removeFromCart: (state, action: PayloadAction<{ id: string; size: string; color: string }>) => {
    const { id, size, color } = action.payload;
    state.items = state.items.filter(
      (item) => !(item.id === id && item.size === size && item.color === color)
    );
    localStorage.setItem("krist_cart", JSON.stringify(state.items));
  },
  updateQuantity: (state, action: PayloadAction<{ id: string; size: string; color: string; quantity: number }>) => {
    const { id, size, color, quantity } = action.payload;
    const item = state.items.find(
      (item) => item.id === id && item.size === size && item.color === color
    );
    if (item) {
      item.quantity = Math.max(1, quantity);
    }
    localStorage.setItem("krist_cart", JSON.stringify(state.items));
  },
  clearCart: (state) => {
    state.items = [];
    localStorage.removeItem("krist_cart");
  },
},
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, setCartFromBackend } = cartSlice.actions;
export default cartSlice.reducer;