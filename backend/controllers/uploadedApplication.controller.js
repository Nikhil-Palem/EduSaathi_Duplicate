import { ApiError } from "../utils/ApiError.js";
import { ApiResponse} from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {UploadedApplication} from "../models/uploadedApllication.model.js";





const uploadedApplicationController = asyncHandler(async(req, res)=>{
    const input = req.body;
    console.log(input)
    const upload = await  UploadedApplication.create({
       application: input.uploadApplication,
        collegeQuestions: input.answer
    })

    return res.status(200).json(new ApiResponse(200, upload, "Application uploaded successfully"))

})
const getUploadedApplicationController = asyncHandler(async(req, res)=>{
    const upload = await UploadedApplication.find();
    return res.status(200).json(new ApiResponse(200, upload, "Application fetched successfully"))
})
export {uploadedApplicationController, getUploadedApplicationController}

