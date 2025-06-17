import mongoose from "mongoose";

const uploadedApplicationSchema = new mongoose.Schema({
   application:{
       type: [],
       required: true
   },
    collegeQuestions:{
       type: [],
        required: true
    },
    fee:{
       type: Boolean,
        // required: true
    }
});


export const UploadedApplication = mongoose.model('UploadedApplication', uploadedApplicationSchema);
