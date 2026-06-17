export const requestHandler = (success: Boolean, code: Number, message: String, data: any = null) => {
    return { success: success, code, message, ...(data && { data }) }
}