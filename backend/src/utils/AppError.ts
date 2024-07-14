import AppErrorCode from "../constants/AppErrorCode";
import { HttpStatusCode } from "../constants/http";



class AppError extends Error {
    constructor(
        public statusCode: HttpStatusCode,
        public message: string,
        public errorCode?: AppErrorCode
    )
    {
        super(message);
        // this.statusCode = statusCode;
        // this.message = message;
        // this.details = details;
    }
}

new AppError(
    200,
    "msg",
    AppErrorCode.InvalidAccessToken
)

export default AppError;