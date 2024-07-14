export const OK = 200;
export const BAD_REQUEST = 400;
export const CREATED = 201;
export const AUTHORIZED = 401;
export const NOT_FOUND = 404; 
export const FORBIDDEN = 403;
export const CONFLICT = 409;
export const UNPROCESSABLE_CONTENT = 412;
export const TOO_MANY_REQUESTS = 413;
export const INTERNAL_SERVER_ERROR = 500; // 500 Internal Server Error

export type HttpStatusCode = typeof OK | typeof BAD_REQUEST | typeof CREATED | typeof AUTHORIZED | typeof NOT_FOUND | typeof FORBIDDEN | 
typeof CONFLICT | typeof UNPROCESSABLE_CONTENT | typeof TOO_MANY_REQUESTS | typeof INTERNAL_SERVER_ERROR;