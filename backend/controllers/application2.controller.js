import {asyncHandler} from "../utils/asyncHandler.js";

import {Application2} from "../models/application2.model.js";

import {ApiResponse} from "../utils/ApiResponse.js";
import {uploadOnCloudinary} from "../utils/uploadOnCloudinary.js";





const application2 = asyncHandler(async(req, res)=>{

    const input = req.body;
    let fileUrl1 = [];
    let fileUrl2 = [];

    const marksheets = req.files.marksheets?.map((file) => file.path) || [];
    const testScore = req.files.testScore?.map((file) => file.path) || [];

    if (marksheets.length > 0) {
        for (const file of marksheets) {
            fileUrl1.push(await uploadOnCloudinary(file));
        }
    }

    if (testScore.length > 0) {
        for (const file of testScore) {
            fileUrl2.push(await uploadOnCloudinary(file));
        }
    }

    console.log(fileUrl1)
    console.log(fileUrl2)
    console.log(marksheets, testScore)
    console.log(input.applicationName)
    let eI = JSON.parse(input.educationalInfo);
    let pI=JSON.parse(input.personalInfo);
    let test = JSON.parse(input.testScore)
    console.log(pI, eI)
    const exams = Object.keys(test).map((k,i)=>{
        return k;
    })
    console.log(exams)


    // console.log(test)
    // console.log(input.educationalInfo.percentages[input.educationalInfo.grades[0]])

    const application = await  Application2.create({
        applicationName: input.applicationName,
        name: pI.givenName,
        middleName: pI.middleName,
        lastName: pI.lastName,
        dateOfBirth: pI.dob,
        socialCategory: pI.socialCategory,
        schoolName: eI.schoolName,        // Added this field
        schoolAddress: eI.address,
        schoolCity: eI.city,        // Added this field
        schoolState: eI.state,
        grades: eI.grades,
        percentage: eI.percentages,
        testScoreExam: exams,
        marksheets: fileUrl1,
        testScore: fileUrl2

        //     percentage: input.educationalInfo.percentages[input.educationalInfo.grades[0]]
    //     // percentage_9: input.percentage_9,
    //     // percentage_10: input.percentage_10,
    //     // percentage_11: input.percentage_11,
    //     // percentage_12: input.percentage_12,
    //
    })

    return res.status(200).json(new ApiResponse(200, application, "Application created successfully"))

})

const getApplication2 = asyncHandler(async(req, res)=>{
    const application = await Application2.find()
    return res.status(200).json(new ApiResponse(200, application, "Application created successfully"))
})

export {application2, getApplication2}