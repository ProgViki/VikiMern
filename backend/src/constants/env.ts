const getEnv = (key: string, defaultValue?: string): string => {
    const value = process.env[key] || defaultValue;
    if (value === undefined) {
        console.error(`Missing environment variable: ${key}`);
            throw new Error(`Missing environment variable: ${key}`);
        }
    return value;
};

// export const MONGO_URI = process.env.MONGO_URI
export const NODE_ENV = getEnv('NODE_ENV', 'development');
export const PORT = getEnv('PORT', '4040');
export const MONGO_URI = getEnv('MONGO_URI');
export const APP_ORIGIN = getEnv('APP_ORIGIN')
export const JWT_SECRET = getEnv('JWT_SECRET');
export const JWT_REFRESH_SECRET = getEnv('JWT_REFRESH_SECRET');
export const EMAIL_SENDER = getEnv('EMAIL_SENDER');
export const RESEND_API_KEY = getEnv('JWT_SECRET');

