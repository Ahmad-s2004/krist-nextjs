import { connectDB } from "../config/db";
import Product, { IProduct } from "../models/Products";
import { handleServerError } from "../lib/errorHandler";

export const getProductsByCategory = async (category: string): Promise<IProduct[] | any> => {
  try {
    await connectDB();
  
    if (!category) {
      return handleServerError(new Error("Category parameter is missing"));
    }
  
    const capitalizedCategory = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
  
    if (!["Men", "Women", "Kids"].includes(capitalizedCategory)) {
      return handleServerError(new Error("Invalid category type"));
    }
  
    const products = await Product.find({ category: capitalizedCategory }).lean();
    return products as unknown as IProduct[];
  } catch (error: any) {
    return handleServerError(error);
  }
};