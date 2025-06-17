import mongoose from "mongoose";

const submitSchema = new mongoose.Schema({
    college_id: {type: mongoose.Schema.ObjectId, ref: "Admin", required: true},
    personalQuestions: { type: [], required: true },
    educationalQuestion: { type: [], required: true },
    testExams: { type: [], required: true },
    earlyDecision: { type: String, required: true },
    regularDecision: { type: String, required: true },
    lateDecision: { type: String, required: true },
    fees: { type: Number, required: true },
    links: { type: [], required: true },
    contacts: { type: [], required: true },
    address: { type: String, required: true },
});


export const Submit = mongoose.model('Submit', submitSchema);
