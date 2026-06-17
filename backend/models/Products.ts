import mongoose, { Schema, Document, Model } from "mongoose";

interface IImage {
  img1: string;
  img2: string;
}

export interface IProduct extends Document {
  title: string;
  gender: "men" | "women" | "kids";
  category: string;
  subcategory: string;
  color: string[];
  size: string[];
  description: string;
  price: number;
  saleStatus: boolean;
  salePercent: number;
  gallery: IImage[];
  stock: number;
  createdAt: Date;
}

const imageSchema = new Schema<IImage>({
  img1: { type: String, required: true },
  img2: { type: String, required: true }
}, { _id: false });

const productSchema = new Schema<IProduct>({
  title: {
    type: String,
    required: true,
    trim: true
  },
  gender: {
    type: String,
    required: true,
    enum: ["men", "women", "kids"]
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  subcategory: {
    type: String,
    required: true,
    trim: true
  },
  color: {
    type: [String],
    default: []
  },
  size: {
    type: [String],
    default: []
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
  },
  saleStatus: {
    type: Boolean,
    default: false
  },
  salePercent: {
    type: Number,
    default: 0
  },
  gallery: [imageSchema],
  stock: {
    type: Number,
    required: true,
    default: 10
  }
}, { timestamps: true });

const Product: Model<IProduct> = mongoose.models.Product || mongoose.model<IProduct>("Product", productSchema);
export default Product;