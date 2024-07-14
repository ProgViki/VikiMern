import {z} from "zod";


const email = z.string().email({message: 'Invalid email address'}).min(1).max(255)
const password = z.string().min(6, {message: 'Password must be at least 6 characters long'}).max(255)

export const loginSchema = z.object({
    email,
    password,
    userAgent: z.string().optional(),
})

export const registerSchema = loginSchema
.extend({
     confirmPassword: z.string().min(6, {message: 'Password must be at least 6 characters long'}),   
})
.refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: [ "confirmPassword"],
})