import { CookieOptions, Response } from "express";
import { fifteenMinutesFromNow, thirtyDaysFromNow} from "./date";


export const REFRESH_PATH = "/auth/refresh";
const secure = process.env.NODE_ENV !== "development";

const defaults: CookieOptions ={
    sameSite: "strict",
    httpOnly: true,
    secure
}

const getAccessTokenCookieOptions = (): CookieOptions => ({ 
    ...defaults, 
    // maxAge, 
    path: "/",
    expires: fifteenMinutesFromNow(),
});

const getRefreshTokenCookieOptions = (): CookieOptions => ({
    ...defaults,
    // maxAge,
    path: "/auth/refresh",
    expires: thirtyDaysFromNow(),
    
})

type Params = {
    res: Response,
    accessToken: string,
    refreshToken: string,
    // maxAge: number
}

export const setAuthCookies = ({ res, accessToken, refreshToken }: Params) => 
    res
    .cookie("access_token", accessToken, getAccessTokenCookieOptions())
    .cookie("refresh_token", refreshToken, getRefreshTokenCookieOptions());

export const clearAuthCookies = (req: Request, res: Response) => {
    // res.clearCookie("access_token", getAccessTokenCookieOptions());
    // res.clearCookie("refresh_token", getRefreshTokenCookieOptions());
    res.clearCookie("access_token").clearCookie("refreshToken", {
        path: "/auth/refresh",
    });
    // res.clearCookie("refresh_token", { path: "/auth/refresh", expires: new Date(0) });
}
// 15 minutes