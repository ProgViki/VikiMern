import {z} from "zod";
import catchErrors from "../util/catchErrors";
import { createAccount } from "../services/auth.services";
import { setAuthCookies } from "../utils/cookies";
import { CREATED, OK } from "../constants/http";
import { loginSchema } from "./auth.schema";
// import { Session } from "inspector";
import SessionModel from "../models/session.model";
import { AccessTokenPayload, verifyToken } from "../utils/jwt";

const registerSchema = z
    .object({
        email: z.string().email().min(1).max(255),
        password: z.string().min(6).max(20),
        confirmPassword: z.string().min(6).max(20),
        userAgent: z.string().optional()
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"]
    });

    export const registerHandler = catchErrors(async (req, res) => {

        const request = registerSchema.parse({
            ...req.body,
            userAgent: req.headers['user-agent'],
        })

        // call service
        const { user, accessToken, refreshToken } = await createAccount(request);

        //  return response
        return setAuthCookies({ res, accessToken, refreshToken})
        .status(CREATED).json(user)
    })

export const loginHandler = catchErrors(async (req, res) => {
    // TODO  
    const request = loginSchema.parse(
        ...req.body,
    userAgent: req.headers["user-agent"],
    )
    const {accessToken, refreshToken} = await loginUser(request);

    return setAuthCookies({ res, accessToken, refreshToken })
       .status(OK).json({message: "Login successful"});
    
});

export const logoutHandler = catchErrors(async (req, res) => {
    const accessToken = req.cookies.accessToken;
    const { payload } = verifyToken(accessToken);
 
    if (payload) {
        await SessionModel.findByIdAndDelete(payload.sessionId);
    }

    return clearAuthCookies(res).status(OK).json({
        message: "Logout successful",
    })
})