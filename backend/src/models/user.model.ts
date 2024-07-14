import mongoose from "mongoose"; 
// import { bcrypt } from 'bcrypt';
import { compareValue, hashValue } from '../utils/bcrypt';

export interface UserDocument extends mongoose.Document {
    email: string;
    password: string;
    verified: boolean;
    createAt: Date;
    updatedAt: Date;
    comparePassword(val: string): Promise<boolean>;
    omitPassword(): Pick<UserDocument, "_id" | "email" | "verified">;
}

const userSchema = new mongoose.Schema<UserDocument>(
    {
        email: {type: String, unique: true, required: true},
        password: {type: String, required: true},
        verified: {type: Boolean,required: true, default: true},
    },
    {
        timestamps: true,
    }
);

userSchema.pre<UserDocument>('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await hashValue(this.password, 10);
    }
    next();
});

userSchema.methods.comparePassword = async function(val: string): Promise<boolean> {
    return await compareValue(val, this.password);
};

userSchema.methods.omitPassword = function() {
    const user = this.toObject();
}

const UserModel = mongoose.model<UserDocument>("User", userSchema);
export default UserModel;