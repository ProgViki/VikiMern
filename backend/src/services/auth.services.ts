import UserModel from "../models/user.model";
import { VerificationCodeModel } from "../models/verificationCode.model";

type CreateAccountParams = {
  email: string;
  password: string;
  userAgent?: string;
};

export const createAccount = async (data: CreateAccountParams) => {
  const { email, password, userAgent } = data;
  const existingUser = await UserModel.exists({ email });

  if (existingUser) {
    throw new Error("User already exists");
  }


  // Check if user already exists
  // Check if user already exists
  const user = await UserModel.create({ email, password });
  if (user) {}
    
  }