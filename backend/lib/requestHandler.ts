export const requestHandler = (success: Boolean, code: Number, message: String, data: any = null) => {
    return { sucess: success, code, message, ...(data && { data }) }
}