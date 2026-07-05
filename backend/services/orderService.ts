'use server'
import { Order, IOrder } from '@/backend/models/Order'
import { handleServerError } from "../lib/errorHandler";
import { requestHandler } from '../lib/requestHandler';
import { connectDB } from "../config/db";
import mongoose from 'mongoose'




export const createOrder = async (orderData: IOrder): Promise<any> => {
    try {
        await connectDB();
        const {
            userId,
            items,
            firstName,
            lastName,
            streetAddress,
            city,
            phoneNo,
            subtotal,
            shippingCost
        } = orderData;

        if (!userId || !items || !Array.isArray(items) || items.length === 0 || !firstName || !streetAddress || !phoneNo || subtotal === undefined) {
            return requestHandler(false, 400, "All fields including order items are required.");
        }

        if (!mongoose.Types.ObjectId.isValid(userId)) return requestHandler(false, 400, "Invalid User ID format.");

        const formattedItems = items.map(item => {
            if (!item.productId || !mongoose.Types.ObjectId.isValid(item.productId as any)) {
                return requestHandler(false, 404, "Invalid or missing Product ID in items.")
            }
            return {
                productId: new mongoose.Types.ObjectId(item.productId as any),
                quantity: item.quantity || 1,
                size: item.size || "",
                color: item.color || ""
            };
        });

        const totalPrice = Number(subtotal) + Number(shippingCost);
        const trackingId = "KRIST-" + Math.floor(100000 + Math.random() * 900000);

        const newOrder = new Order({
            userId: new mongoose.Types.ObjectId(userId),
            items: formattedItems,
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
        const cleanOrder = JSON.parse(JSON.stringify(savedOrder));
        return requestHandler(true, 201, "Order saved successfully", cleanOrder);
    } catch (error: any) {
        if (error.message.includes("Product ID")) {
            return requestHandler(false, 400, error.message);
        }
        return handleServerError(error);
    }
};


export const getAllOrder = async (userId: string): Promise<any> => {
    try {
        await connectDB();
        if (!userId) return requestHandler(false, 400, "UserID is required.");
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return requestHandler(false, 400, "Invalid User ID format.");
        }
        const orders = await Order.find({ userId }).sort({ createdAt: -1 });
        const cleanOrder = JSON.parse(JSON.stringify(orders));
        if (cleanOrder.length > 0) {
            return requestHandler(true, 200, "Orders found successfully.", cleanOrder);
        } else {
            return requestHandler(true, 200, "No orders exist for this user.", []);
        }

    } catch (error) {
        return handleServerError(error);
    }
};


export const getSingleOrder = async (userId: string, orderId: string): Promise<any> => {
    try {
        await connectDB();

        if (!userId || !orderId) return requestHandler(false, 400, "UserID and OrderID are required.")

        if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(orderId)) {
            return requestHandler(false, 400, "Invalid UserID or OrderID format.")
        }
        const order = await Order.findOne({ _id: orderId, userId });

        if (!order) return requestHandler(false, 404, "No order found.");
        return requestHandler(true, 200, "Order found successfully.", order);

    } catch (error) {
        return handleServerError(error);
    }
};