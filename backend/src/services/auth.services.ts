import { JWT_REFRESH_SECRET } from "../constants/env";
import { CONFLICT } from "../constants/http";
import VerificationCodeType from "../constants/verificationCodeType";
import sessionModel from "../models/session.model";
import UserModel from "../models/user.model";
import VerificationCodeModel from "../models/verificationCode.model";
import appAssert from "../utils/appAssert";
import { oneYearFromNow } from "../utils/date";
// import { Jwt } from "jsonwebtoken";
import jwt from "jsonwebtoken";


type CreateAccountParams = {
  email: string;
  password: string;
  userAgent?: string;
};

export const createAccount = async (data: CreateAccountParams) => {
  const { email, password, userAgent } = data;

  // verify existing user exists
  const existingUser = await UserModel.exists({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }
  // appAssert(!existingUser, CONFLICT, "Email already in use")


  // Create user
  const user = await UserModel.create({ email, password });

  // create verification code
  const verificationCode = await VerificationCodeModel.create({
    userId: user._id,
    code: Math.floor(100000 + Math.random() * 900000),
    type: VerificationCodeType.EmailVerification,
    expiresAt: oneYearFromNow(),
})
    // send verification email


    // create session

    const session = await sessionModel.create({
      userId: user._id,
      userAgent,
    })

    // sign access token & refresh token
    const refreshToken = jwt.sign(
      { sessionId: session._id,},
      JWT_REFRESH_SECRET,
      { 
        audience: ["user"],
        expiresIn: "30d" 
      }
    );
    const accessToken = jwt.sign(
      {
        userId: user._id, 
        sessionId: session._id,
      },
      JWT_REFRESH_SECRET,
      { 
        audience: ["user"],
        expiresIn: "15m" 
      }
    );

    return {
      user,
      accessToken,
      refreshToken,
    };
  }