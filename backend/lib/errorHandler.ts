export let handleServerError = (error: unknown) =>{
if(error instanceof Error){
    return {success: false, message: error.message};
}
return {success: true, message: "An unexpected error occurred"};
}