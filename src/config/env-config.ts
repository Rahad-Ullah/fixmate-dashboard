import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

export const config = {
  serverURL: process.env.SERVER_URL || "http://10.0.70.50:5003",
  baseURL: process.env.BASE_URL || "http://10.0.70.50:5003/api/v1",
};

export const IMAGE_URL = process.env.NEXT_PUBLIC_SERVER_URL;
