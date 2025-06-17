import mongoose from "mongoose";

const userCollegeSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    college_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Created_Colleges',
        required: true
    },
    status: {
        type: String,
        enum: ['new', 'assigned', 'completed', 'rejected'], // allowed values
        default: 'new' // default when student is created
    },
    joinedAt: {
        type: Date,
        default: Date.now
    }
});

export const UserCollege = mongoose.model('UserCollege', userCollegeSchema);

