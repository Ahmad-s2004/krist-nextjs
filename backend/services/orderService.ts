import {Order, IOrder} from '@/backend/models/Order'
import { handleServerError } from "../lib/errorHandler";
import { requestHandler } from '../lib/requestHandler';
import { connectDB } from "../config/db";
import mongoose from 'mongoose'




export const createOrder = async(orderData: IOrder): Promise<any> =>{
    try {
        await connectDB()
        const {productId, quantity, size, color, firstName, lastName, streetAddress, city, phoneNo, subtotal, shippingCost,} = orderData;
        if (!productId || !firstName || !streetAddress || !phoneNo || subtotal === undefined) {
            return requestHandler(false, 404, "All fields are required.")            
          }
        const totalPrice= Number(subtotal) + Number(shippingCost)
        const trackingId = "KRIST-" + Math.floor(100000 + Math.random() * 900000);
        const newOrder = new Order({
            productId: new mongoose.Types.ObjectId(productId),
            quantity,
            size,
            color,
            firstName,
            lastName,
            streetAddress,
            city,
            phoneNo,
            trackingId,
            status: "processing", 
            subtotal,
            shippingCost,
            totalPrice,
          });
        
          let savedOrder = await newOrder.save();
          return requestHandler(true, 201, "Order saved successfully", savedOrder)
    } catch (error) {
        return handleServerError(error)
    }
} 
export const getAllOrder = async (userId: string): Promise<any> => {
    try {
        await connectDB();
        if (!userId) return requestHandler(false, 400, "UserID is required.");
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return requestHandler(false, 400, "Invalid User ID format.");
        }
        const orders = await Order.find({ userId }).sort({ createdAt: -1 });
        if (orders.length > 0) {
            return requestHandler(true, 200, "Orders found successfully.", orders);
        } else {
            return requestHandler(true, 200, "No orders exist for this user.", []);
        }

    } catch (error) {
        return handleServerError(error);
    }
};