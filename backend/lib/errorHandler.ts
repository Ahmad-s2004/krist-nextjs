export const handleServerError = (error: any) => {
    console.error("Backend Error Trace:", error); 
    return {
      success: false,
      code: 500,
      message: error.message || "An internal server error occurred"
    }
  }