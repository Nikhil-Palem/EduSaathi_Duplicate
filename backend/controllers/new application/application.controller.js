import ApplicationModel from "../../models/new applliaction/application.model.js";

// import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const applicationController = asyncHandler(async (req, res) => {
    const input = req.body;
    console.log(input);
    const application = await ApplicationModel.create({
        personalInfo: input.personalInfo,
        educationalInfo: input.educationalInfo,
        testScores: input.testScores,
        activitiesInfo: input.activitiesInfo,
        newAward: input.newAward,
        awards: input.awards
    });

    return res.status(200).json(new ApiResponse(200, application, "Application submitted successfully"));
})


// const getApplication = asyncHandler(async (req, res) => {
//     const application = await ApplicationModel.find();
//     if (!application) {
//         return res.status(404).json(new ApiError(404, "Application not found"));
//     }
//     return res.status(200).json(new ApiResponse(200, application, "Application fetched successfully"));
// });

export { applicationController };