import { requestHandler } from "./requestHandler";

export const handleServerError = (error: unknown) => {
  if (error instanceof Error) {
    return requestHandler(false, 400, error.message);
  }
  return requestHandler(false, 500, "An unexpected architectural error occurred");
};