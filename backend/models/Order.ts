import mongoose, { Schema, Document } from "mongoose";


interface IOrderItem {
  productId: Schema.Types.ObjectId;
  quantity: number;
  size?: string;
  color?: string;
}

export interface IOrder extends Document {
  userId: mongoose.Types.ObjectId;
  productId: mongoose.Types.ObjectId;
  items: IOrderItem[];
  firstName: string;
  lastName: string;
  streetAddress: string;
  city: string;
  phoneNo: string;
  trackingId?: string;
  status: "processing" | "shipped" | "delivered";
  subtotal: number;
  shippingCost: number;
  totalPrice: number; 
}

const OrderSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User'},
    items: [
      {
        productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, required: true, default: 1 },
        size: { type: String },
        color: { type: String },
      }
    ],

    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    streetAddress: { type: String, required: true },
    city: { type: String, required: true },
    phoneNo: { type: String, required: true },

    trackingId: { type: String, default: "" },
    status: {
      type: String,
      required: true,
      enum: ["processing", "shipped", "delivered"],
      default: "processing",
    },

    subtotal: { type: Number, required: true },
    shippingCost: { type: Number, required: true, default: 0 },
    totalPrice: { type: Number, required: true },
  },
  { timestamps: true } 
);

export const Order = mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);