"use server"
import { connectDB } from "@/backend/config/db";
import { handleServerError } from "@/backend/lib/errorHandler";
import { requestHandler } from "@/backend/lib/requestHandler";
import { User } from "@/backend/models/User";

interface LocalCartItem {
    productId: string;
    quantity: number;
    size?: string;
    color?: string;
  }
  
  export const syncWishlistAction = async (userId: string, localWishlistIds: string[]) => {
    try {
      await connectDB();
      
      const user = await User.findById(userId);
      if (!user) return requestHandler(false, 404, "User not found");
  
      const currentWishlist = user.wishlist ? user.wishlist.map((id: any) => id.toString()) : [];
      const mergedWishlist = Array.from(
        new Set([...currentWishlist, ...localWishlistIds])
      );
  
      user.wishlist = mergedWishlist;
      await user.save();
  
      const updatedUser = await User.findById(userId).populate("wishlist");
  
      return requestHandler(true, 200, "Wishlist synchronized successfully", updatedUser.wishlist);
    } catch (error) {
      return handleServerError(error);
    }
  };
  
  export const syncCartAction = async (userId: string, localCart: LocalCartItem[]) => {
    try {
      await connectDB();
  
      const user = await User.findById(userId);
      if (!user) return requestHandler(false, 404, "User not found");
  
      const dbCart = user.cart || [];
  
      localCart.forEach((localItem) => {
        const existingItemIndex = dbCart.findIndex(
          (dbItem: any) => 
            dbItem.productId.toString() === localItem.productId &&
            dbItem.size === (localItem.size || "") &&
            dbItem.color === (localItem.color || "")
        );
  
        if (existingItemIndex > -1) {
          dbCart[existingItemIndex].quantity += localItem.quantity;
        } else {
          dbCart.push({
            productId: localItem.productId,
            quantity: localItem.quantity,
            size: localItem.size || "",
            color: localItem.color || "",
          });
        }
      });
  
      user.cart = dbCart;
      await user.save();
  
      const updatedUser = await User.findById(userId).populate("cart.productId");
  
      return requestHandler(true, 200, "Cart synchronized successfully", updatedUser.cart);
    } catch (error) {
      return handleServerError(error);
    }
  };
  
  export const addToCartAction = async (
    userId: string, 
    productId: string, 
    quantity: number, 
    size: string, 
    color: string
  ) => {
    try {
      await connectDB();
  
      const user = await User.findById(userId);
      if (!user) return requestHandler(false, 404, "User not found");
  
      const dbCart = user.cart || [];
  
      const existingItemIndex = dbCart.findIndex(
        (item: any) => 
          item.productId.toString() === productId &&
          item.size === (size || "") &&
          item.color === (color || "")
      );
  
      if (existingItemIndex > -1) {
        dbCart[existingItemIndex].quantity += quantity;
      } else {
        dbCart.push({ productId, quantity, size, color });
      }
  
      user.cart = dbCart;
      await user.save();
  
      const updatedUser = await User.findById(userId).populate("cart.productId");
  
      return requestHandler(true, 200, "Item added to cart successfully", updatedUser.cart);
    } catch (error) {
      return handleServerError(error);
    }
  };
  export const toggleWishlistAction = async (userId: string, productId: string) => {
  try {
    await connectDB();
    const user = await User.findById(userId);
    if (!user) return requestHandler(false, 404, "User not found");

    const currentWishlist: string[] = user.wishlist ? user.wishlist.map((id: any) => id.toString()) : [];
    
    const itemIndex = currentWishlist.indexOf(productId);

    if (itemIndex > -1) {
      currentWishlist.splice(itemIndex, 1);
    } else {
      currentWishlist.push(productId);
    }

    user.wishlist = currentWishlist;
    await user.save();

    const updatedUser = await User.findById(userId).populate("wishlist");

    return requestHandler(true, 200, "Wishlist updated successfully", updatedUser.wishlist);
  } catch (error) {
    return handleServerError(error);
  }
};