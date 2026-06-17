"use server"

import bcrypt from "bcryptjs"
import { connectDB } from "../config/db"
import { User } from "../models/User"
import { handleServerError } from "../lib/errorHandler"
import { requestHandler } from "../lib/requestHandler"

export const registerUser = async(formData: any) =>{
    try{
        await connectDB()
        const {name, email, password} = formData
        if(!name || !email || !password){
            return requestHandler(false, 400, "All fields are required")
        }
        let existingUser = await User.findOne(email)
        if(existingUser){
            return requestHandler(false, 400, "Email already registered")
        }
        let encryptedPass = bcrypt.hash(password, 10)
        await User.create({
            name: name,
            email: email, 
            password: encryptedPass
        })

        return requestHandler(true, 201, "User registered successfully")

    }catch(error){
        return handleServerError(error)
    }
}