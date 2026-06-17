import mongoose from "mongoose";
import {handleServerError} from '@/backend/lib/errorHandler'

const MONGO_URI: string = process.env.MONGO_URI || "";
let isConnected: boolean = false;

export const connectDB = async (): Promise<{ success: boolean; message: string } | void> => {
  if (isConnected) {
    return;
  }

  try {
    const db = await mongoose.connect(MONGO_URI);
    isConnected = db.connections[0].readyState === 1;
  } catch (error) {
    return handleServerError(error)
  }
};