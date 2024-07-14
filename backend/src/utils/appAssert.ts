

// Assert a condition and throws an AppError if the condition is falsy

import assert from "assert";
import AppErrorCode from "../constants/AppErrorCode";
import { HttpStatusCode } from "../constants/http";
import AppError from "./AppError";

type AppAssert = (
    condition: boolean,
    httpStatusCode: HttpStatusCode,
    message: string, 
    appErrorCode?: AppErrorCode,
) => asserts condition;



const appAssert: AppAssert = (
    condition,
    httpStatusCode,
    message,
    appErrorCode,
    ) => assert (condition, new AppError(httpStatusCode, message, appErrorCode))


export default appAssert;