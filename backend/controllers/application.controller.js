import { ApiError } from "../utils/ApiError.js";
import { ApiResponse} from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {Application} from "../models/application.model.js";
import {Admin} from "../models/admin.model.js";
// import { Application } from "../models/application.model.js";
import { uploadOnCloudinary } from "../utils/uploadOnCloudinary.js";
import {ObjectId} from "mongodb";
// import {app} from "../app.js";

const application = asyncHandler(async(req, res)=>{
        const input = req.body;
        const bitsatLocalFilePath = req.files['bitSatFile'];
        const markSheet_12LocalFilePath = req.files['markSheet_12'];
    const markSheet_11LocalFilePath = req.files['markSheet_11'];
    const markSheet_10LocalFilePath = req.files['markSheet_10'];
    const markSheet_9LocalFilePath = req.files['markSheet_9'];
    // console.log(bitsatLocalFilePath)
    // console.log(markSheet_12LocalFilePath[0])
    // console.log(bitsatLocalFilePath[0])
    //     if (!markSheet_9LocalFilePath){
    //     return res.status(400).send(new ApiError(400, "Please enter a valid 9th mark sheet Image Local Path"));
    //     }
    //      if (!markSheet_10LocalFilePath){
    //     return res.status(400).send(new ApiError(400, "Please enter a valid 10th mark sheet Image Local Path"));
    //     }
    //     if (!markSheet_11LocalFilePath){
    //         return res.status(400).send(new ApiError(400, "Please enter a valid 11th mark sheet Image Local Path"));
    //     }
    let markSheet_9_Image ='';
    let markSheet_10_Image ='';
    let markSheet_11_Image ='';
        if (!markSheet_12LocalFilePath){
            return res.status(400).send(new ApiError(400, "Please enter a valid 12th mark sheet Image Local Path"));
        }
        if (markSheet_9LocalFilePath){
             markSheet_9_Image = await uploadOnCloudinary(markSheet_9LocalFilePath[0].path);
        }
    if (markSheet_10LocalFilePath){
        markSheet_10_Image = await uploadOnCloudinary(markSheet_10LocalFilePath[0].path);
    }
    if (markSheet_11LocalFilePath){
        markSheet_11_Image = await uploadOnCloudinary(markSheet_11LocalFilePath[0].path);
    }


    const markSheet_12_Image = await uploadOnCloudinary(markSheet_12LocalFilePath[0].path);
    if (!markSheet_12_Image){
        return res.status(400).send(new ApiError(400, "No 12th mark sheet was uploaded"));
    }
    if (markSheet_11LocalFilePath){
        if (!markSheet_11_Image){
            return res.status(400).send(new ApiError(400, "No 11th mark sheet was uploaded"));
        }
    }
    if (markSheet_10LocalFilePath){
        if (!markSheet_10_Image){
            return res.status(400).send(new ApiError(400, "No 10th mark sheet was uploaded"));
        }
    }
    if(markSheet_9LocalFilePath){
        if (!markSheet_9_Image){
            return res.status(400).send(new ApiError(400, "No 9th mark sheet was uploaded"));
        }
    }


    // console.log(bitsatLocalFilePath.path)
        if (!bitsatLocalFilePath) {
                return res.status(400).send(new ApiError(400, "Please enter a valid Bit Sat Score Image Local Path"));
            }
            const bitSatImage = await uploadOnCloudinary(bitsatLocalFilePath[0].path);
            if (!bitSatImage) {
                return res.status(400).send(new ApiError(400, "No Post Image uploaded"));
            }
            const publicId = bitSatImage.public_id;

            if (!bitSatImage) {
                return res.status(400).send(new ApiError(400, "No post uploaded"));
            }
        

        const application = await  Application.create({
                name: input.name,
                middleName: input.middleName,
                lastName: input.lastName,
                dateOfBirth: input.dateOfBirth,
                socialCategory: input.socialCategory,
                schoolName: input.schoolName,        // Added this field
                schoolAddress: input.schoolAddress,
                schoolCity: input.schoolCity,        // Added this field
                schoolState: input.schoolState,
                grade: input.grade,                  // Added this field
                bitSatFile: bitSatImage.url,
                percentage_9: input.percentage_9,
                percentage_10: input.percentage_10,
                percentage_11: input.percentage_11,
                percentage_12: input.percentage_12,
                markSheet_12: markSheet_12_Image.url,
                markSheet_11: markSheet_11_Image.url,
                markSheet_10: markSheet_10_Image.url,
                markSheet_9: markSheet_9_Image.url,
                publicId
            // Added this field
                         // Added this field
                /*
                contactInformation: input.contactInformation,
                familyInformation: input.familyInformation,
                academicInformation: input.academicInformation,
                entranceExamInformation: input.entranceExamInformation,
                extracurricularActivities: input.extracurricularActivities,
                achievementsAndAwards: input.achievementsAndAwards,
                additionalInformation: input.additionalInformation,
                otherDocuments: input.otherDocuments,
                */
        })
    const id = new ObjectId('670a2cf80ffe1187d2d7940a');

    const updateAdmin = await Admin.findByIdAndUpdate(id,{
        $addToSet:{
            applications: application._id
        }
    });

        return res.status(200).json(new ApiResponse(200, application, "Application created successfully"))

})

const examAPI = asyncHandler(async (req, res) => {
    // const input = req.body;
  const results=  {
        exams: [
        {
            exam_name: "Joint Entrance Examination Main",
            short_form: "JEE Main" ,
            short_form_2: 'jee main'
        },
        {
            exam_name: "Graduate Aptitude Test in Engineering",
            short_form: "GATE",
            short_form_2: 'gate'
        },
        {
            exam_name: "National Eligibility cum Entrance Test",
            short_form: "NEET",
            short_form_2: 'neet'
        },
        {
            exam_name: "Common Admission Test",
            short_form: "CAT",
            short_form_2: 'cat'
        },
        {
            exam_name: "All India Law Entrance Test",
            short_form: "AILET",
            short_form_2: 'ailet'
        },
        {
            exam_name: "Indian Administrative Services Exam",
            short_form: "IAS",
            short_form_2: 'ias'
        },
        {
            exam_name: "Common Law Admission Test",
            short_form: "CLAT",
            short_form_2: 'clat'
        },
        {
            exam_name: "Xavier Aptitude Test",
            short_form: "XAT",
            short_form_2: 'xat'
        },
        {
            exam_name: "Symbiosis National Aptitude Test",
            short_form: "SNAP",
            short_form_2: 'snap'
        },
        {
            exam_name: "Birla Institute of Technology and Science Admission Test",
            short_form: "BITSAT",
            short_form_2: 'bitsat'
        }
    ]
    }



    return res.status(200).json(new ApiResponse(200, results, 'You Searched'));
})

export {application, examAPI}

export const submitApplication = asyncHandler(async (req, res) => {
    const { universityId, personalInformation, academicInformation } = req.body;
    const studentId = req.user._id; // Authenticated student's ID

    if (!universityId) {
        return res.status(400).json(new ApiError(400, "University ID is required"));
    }

    const application = await Application.create({
        studentId,
        universityId,
        personalInformation,
        academicInformation,
        status: "Pending"
    });

    res.status(201).json(new ApiResponse(201, application, "Application submitted successfully"));
});

// Get Applications for University
export const getApplicationsForUniversity = asyncHandler(async (req, res) => {
    const universityId = req.user.universityId;

    const applications = await Application.find({ universityId }).populate("studentId", "name email");
    res.status(200).json(new ApiResponse(200, applications, "Applications retrieved successfully"));
});

// Update Application Status
export const updateApplicationStatus = asyncHandler(async (req, res) => {
    const { applicationId } = req.params;
    const { status } = req.body;

    const application = await Application.findByIdAndUpdate(
        applicationId,
        { status },
        { new: true }
    );

    if (!application) {
        return res.status(404).json(new ApiResponse(404, null, "Application not found"));
    }

    res.status(200).json(new ApiResponse(200, application, "Application status updated successfully"));
});

export const getStateWiseApplications = asyncHandler(async (req, res) => {
    const applications = await Application.aggregate([
        {
            $group: {
                _id: "$schoolState", // Group by state
                total: { $sum: 1 }, // Count applications per state
                caste: { $push: "$socialCategory" }, // Collect caste data
                scores: { $push: "$percentage_12" }, // Collect scores
            },
        },
        {
            $project: {
                _id: 1,
                total: 1,
                caste: {
                    General: { $size: { $filter: { input: "$caste", as: "c", cond: { $eq: ["$$c", "General"] } } } },
                    OBC: { $size: { $filter: { input: "$caste", as: "c", cond: { $eq: ["$$c", "OBC"] } } } },
                    SC: { $size: { $filter: { input: "$caste", as: "c", cond: { $eq: ["$$c", "SC"] } } } },
                    ST: { $size: { $filter: { input: "$caste", as: "c", cond: { $eq: ["$$c", "ST"] } } } },
                },
                scores: 1,
            },
        },
    ]);

    res.status(200).json(new ApiResponse(200, applications, "State-wise data retrieved successfully"));
});
