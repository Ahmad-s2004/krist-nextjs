import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
  slug?: string;
  description?: string;
  category?: string;
  inStock?: boolean;
}

export interface WishlistState {
  items: WishlistItem[];
}

const loadInitialWishlist = (): WishlistItem[] => {
  if (typeof window !== "undefined") {
    try {
      const savedWishlist = localStorage.getItem("krist_wishlist");
      return savedWishlist ? (JSON.parse(savedWishlist) as WishlistItem[]) : [];
    } catch (error) {
      console.error("Failed to parse wishlist from localStorage:", error);
      return [];
    }
  }
  return [];
};

const initialState: WishlistState = {
  items: loadInitialWishlist(),
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setWishlistFromBackend: (state, action: PayloadAction<WishlistItem[]>) => {
      state.items = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("krist_wishlist", JSON.stringify(state.items));
      }
    },

    addToWishlist: (state, action: PayloadAction<WishlistItem>) => {
      const exists = state.items.some((item) => item.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
      }
      if (typeof window !== "undefined") {
        localStorage.setItem("krist_wishlist", JSON.stringify(state.items));
      }
    },

    removeFromWishlist: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      if (typeof window !== "undefined") {
        localStorage.setItem("krist_wishlist", JSON.stringify(state.items));
      }
    },

    clearWishlist: (state) => {
      state.items = [];
      if (typeof window !== "undefined") {
        localStorage.removeItem("krist_wishlist");
      }
    },
  },
});

export const {
  setWishlistFromBackend,
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;