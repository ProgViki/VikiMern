import mongoose from "mongoose";
import { thirtyDaysFromNow } from "../utils/date";

export interface SessionDocument extends mongoose.Document {
    userId: mongoose.Types.ObjectId;
    userAgent?: string;
    createdAt: Date;
    expiresAt: Date;
}

const SessionSchema = new mongoose.Schema<SessionDocument>(
    {
        userId: {
            ref: "User",
            type: mongoose.Schema.Types.ObjectId, 
            index: true,
        },
        userAgent: { type: String},
        createdAt: { type: Date, required: true, default: Date.now },
        expiresAt: { type: Date, 
            default: thirtyDaysFromNow,
            required: true },
        })

export default mongoose.model<SessionDocument>("Session", SessionSchema);