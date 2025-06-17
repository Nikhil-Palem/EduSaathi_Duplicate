import mongoose from 'mongoose'
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";


const leadSchema = new mongoose.Schema({
    name: { type: String, required: true },
    role: { type: String, required: true },
    email: { type: String, required: true },
    password: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
    },
    otpExpiresAt: {
        type: Date,
    },
    isVerified: { type: Boolean, default: false },
    forgotPasswordToken: { type: String },
    forgotPasswordTokenExpiry: { type: Date },
    verificationToken: { type: String },
    verificationTokenExpiry: { type: Date },


});
leadSchema.pre("save", async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    this.password = await bcryptjs.hash(this.password, 10);
    next();
})
leadSchema.methods.comparePassword = async function (password) {
    return await bcryptjs.compare(password, this.password);
}

leadSchema.methods.generateToken = async function () {
    return jwt.sign(
        { _id: this._id }
        , process.env.SECRET,
        { expiresIn: '1d' })
}

export const Lead = mongoose.model('Lead', leadSchema);