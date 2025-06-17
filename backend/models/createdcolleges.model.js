import mongoose from "mongoose";

const collegeSchema = new mongoose.Schema({
    collegeName: {
        type: String,
        required: true,
        trim: true,
    },
    branches: {
        type: [String],
        required: true,
    },
    admin_code: {
        type: String,
        required: true,
        unique: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lead",
        required: true,
    }
}, {
    timestamps: true,
});

export const CreatedColleges = mongoose.model("CreatedColleges", collegeSchema, "created_colleges");

