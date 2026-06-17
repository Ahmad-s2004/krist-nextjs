"use server"

import bcrypt from "bcryptjs"
import { connectDB } from "../config/db"
import { User } from "../models/User"
import { handleServerError } from "../lib/errorHandler"
import { requestHandler } from "../lib/requestHandler"
import { cookies } from "next/headers"
import jwt from 'jsonwebtoken'

const JWT_SECRET: string = process.env.JWT_SECRET || ""

export const registerUser = async (formData: any) => {
    try {
        await connectDB()
        const { name, email, password } = formData
        if (!name || !email || !password) {
            return requestHandler(false, 400, "All fields are required")
        }
        let existingUser = await User.findOne({ email })
        if (existingUser) {
            return requestHandler(false, 400, "Email already registered")
        }
        let encryptedPass = await bcrypt.hash(password, 10)
        await User.create({
            name: name,
            email: email,
            password: encryptedPass
        })

        return requestHandler(true, 201, "User registered successfully")

    } catch (error) {
        return handleServerError(error)
    }
}

export const loginUserAction = async (formData: any) => {
    try {
        await connectDB()
        const { email, password } = formData
        if (!email || !password) {
            return requestHandler(false, 400, "All fields are required")
        }
        let user = await User.findOne({ email })
        if (!user) {
            return requestHandler(false, 404, "Invalid credentials")
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (!isPasswordCorrect) {
            return requestHandler(false, 401, "Invalid credentials")
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            JWT_SECRET,
            { expiresIn: "7d" }
        )

        const cookieStore = await cookies()
        cookieStore.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            maxAge: 7 * 24 * 60 * 60
        })

        return requestHandler(true, 200, "Login successful")
    } catch (error) {
        return handleServerError(error)
    }
}


export const logoutUserAction = async () => {
  try {
    const cookieStore = await cookies()
    cookieStore.delete("token")

    return requestHandler(true, 200, "Logged out successfully")
  } catch (error) {
    return handleServerError(error)
  }
}