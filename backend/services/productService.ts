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
export const getKidsBestSellers = async (): Promise<IProduct[] | any> => {
  try {
    await connectDB();
    
    const products = await Product.find({ category: "Kids" })
      .limit(6)
      .lean();
      
    return products as unknown as IProduct[];
  } catch (error: any) {
    return handleServerError(error);
  }
};
export const getProductById = async (id: string): Promise<IProduct | any> => {
  try {
    await connectDB();
    
    if (!id) {
      return handleServerError(new Error("Product ID is missing"));
    }
    
    const product = await Product.findById(id).lean();
    return product as unknown as IProduct;
  } catch (error: any) {
    return handleServerError(error);
  }
};
export const ProductService = {
  searchProducts: async (query: string) => {
    try {
      await connectDB();
      
      if (!query) {
        return [];
      }

      const searchFilter = {
        $or: [
          { title: { $regex: query, $options: "i" } },
          { category: { $regex: query, $options: "i" } },
          { description: { $regex: query, $options: "i" } }
        ]
      };

      const products = await Product.find(searchFilter).lean();
      
      return JSON.parse(JSON.stringify(products));
    } catch (error) {
      console.error("Error in searchProducts service:", error);
      return [];
    }
  }
};