import mongoose from 'mongoose';

const WaitlistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    role: {
        type: String,
        trim: true,
    },
}, { timestamps: true });

export const Waitlist = mongoose.model('Waitlist', WaitlistSchema);
