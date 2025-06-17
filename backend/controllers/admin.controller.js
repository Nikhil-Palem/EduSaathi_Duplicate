import { ApiError } from "../utils/ApiError.js";
import { ApiResponse} from "../utils/ApiResponse.js";
import {Admin} from "../models/admin.model.js"
import { asyncHandler } from "../utils/asyncHandler.js";
import {uploadOnCloudinary} from "../utils/uploadOnCloudinary.js";
import {Submit} from "../models/submit.model.js";

const generateTokens= async(userId)=>{
    try {
        const admin = await Admin.findById(userId);
        const token = await admin.generateToken();
        await admin.save({validateBeforeSave: false})
        return token;
    } catch (error) {
        return new ApiError(500, "Something went wrong")
    }
}

let count = 0;
const register = asyncHandler(async(req, res)=>{
const {username, name, email,address, collegeType, city, state, acronym, password, number,college_link} = req.body
    let fileURL = '';
    const filePath = req.file.path

    if (!(username&&name && collegeType && state && acronym && city && password && email && number && address)) {
        return res.status(401).send(new ApiError(402, "All fields are required"))
    }
    if (password.length<6) {
        return res.status(400).send(new ApiError(400, "Password should be at least 6 characters"))
    }

    const adminExist = await Admin.findOne({email});

    if (adminExist) {
        return res.status(400).send(new ApiError(400, "User already exist"));
    }
    if (filePath){
        fileURL = await uploadOnCloudinary(filePath)
    }
    console.log(fileURL)
    if (!fileURL) {
        return res.status(400).send(new ApiError(400, "No Post Image uploaded"));
    }
    const url = fileURL.url;
    count++;
    const admin = await Admin.create({
        username,
        name,
        collegeType,
        state,
        email,
        address,
        acronym,
        college_logo: url||'',
        college_link: ''||college_link,
        position: 'Admin',
        city,
        contactNumber: number,
        eduId: "E"+acronym+count,
        password,
    });

    const createdAdmin = await Admin.findById(admin._id).select("-password")
    if (!createdAdmin) {
        return res.status(500).send(new ApiError(500, "Something went wrong while creating user"))
    }




    return res.status(200).json(new ApiResponse(200, createdAdmin, "User created successfully"))
})

const loginUser = asyncHandler(async(req, res)=>{

    const { email, password } = req.body;
    if (!(email && password)) {
        return res.status(400).send(new ApiError(400, "All fields are required"))
    }
    const adminExist = await Admin.findOne({ email });

    if (!adminExist) {
        return res.status(400).send(new ApiError(400, "User does not exist"));
    }
    const validAdmin = await adminExist.comparePassword(password);
    if (!validAdmin) {
        return res.status(400).send(new ApiError(400, "Invalid password"));
    }
    const adminToken = await generateTokens(adminExist._id);

    const loggedAdmin = await Admin.findById(adminExist._id).select("-password");

    const option = {
        httpOnly: false,
        secure: true
    }
    return res.status(200).cookie('adminToken', adminToken, option).json(new ApiResponse(200, {admin: loggedAdmin, adminToken}, "User logged in successfully"))

})

const logoutUser = asyncHandler((req, res)=>{

    const option = {
        httpOnly: false,
        secure: true,
        sameSite: 'none'
    }
    return res.status(200).clearCookie('adminToken', option).json(new ApiResponse(200, {}, "User logged out successfully"));
})

const updateAdmin = asyncHandler(async(req, res)=>{
    let fileURL = '';
    const { id } = req.params;
    const filePath = req.file.path
    // Fetch the current admin data from the database
    const admin = await Admin.findById(id); // Assuming you have a Mongoose model called AdminModel

    // Check if the admin exists
    if (!admin) {
        return res.status(404).json(new ApiResponse(404, null, 'Admin not found'));
    }
    if (filePath){
        fileURL = await uploadOnCloudinary(filePath)
    }
    console.log(fileURL)
    if (!fileURL) {
        return res.status(400).send(new ApiError(400, "No Post Image uploaded"));
    }
    const url = fileURL.url;
    // Update the admin data with the new data from the request body
    const updatedAdminData = {
        // name: req.body.name || admin.name,
        username: req.body.username || admin.username,
        name: req.body.name || admin.name,
        collegeType: req.body.collegeType|| admin.collegeType,
        state: req.body.state || admin.state,
        email: req.body.email || admin.email,
        address: req.body.address || admin.address,
        acronym: req.body.acronym || admin.acronym,
        college_logo: url||'',
        college_link: req.body.college_link||admin.college_link,
        city: req.body.city || admin.city,
        contactNumber: req.body.contactNumber||admin.number,
    };

    // Update the admin in the database
    const updatedAdmin = await Admin.findByIdAndUpdate(id, updatedAdminData, { new: true });

    // Return the updated admin data in the response
    res.status(200).json(new ApiResponse(200, updatedAdmin, 'Admin updated successfully'));
})
const adminToken = asyncHandler(async(req, res)=>{

    res.status(200).json(new ApiResponse(200, req.admin));
})
const admin = asyncHandler(async(req, res)=>{

    const allAdmin = await Admin.find();

    res.status(200).json(new ApiResponse(200, allAdmin));
})
//



//
const submit = asyncHandler(async (req, res) => {
    const value=req.body;

    console.log(value)
    const submitted = await Submit.create({
        college_id: req.admin._id,
        personalQuestions: value.value1.personalQuestions, // Assuming value1 contains personal questions
        educationalQuestion: value.value2.educationalQuestions, // Assuming value2 contains educational questions
        testExams: value.value3.testExams, // Assuming value3 contains test exams
        earlyDecision: value.value4.deadlines.earlyDecision, // Assuming value4 contains decision dates
        regularDecision: value.value4.deadlines.regularDecision,
        lateDecision: value.value4.deadlines.lateDecision,
        fees: value.value5.fees, // Assuming value5 contains fees
        links: value.value6.links, // Assuming value6 contains links
        contacts: value.value7.contacts, // Assuming value7 contains contacts
        address: value.value8.address // Assuming value8 contains address
    });
    res.status(200).json(new ApiResponse(200, submitted, "Success"));
})
const getCollegeSubmit = asyncHandler(async (req, res)=>{
    console.log(req.body.id)
    const allSubmit = await Submit.findOne({
             college_id: req.body.id

        });
    console.log(allSubmit)
    res.status(200).json(new ApiResponse(200, allSubmit));
})
const getAllSubmit = asyncHandler(async (req, res)=>{
    console.log(req.admin._id)
    const allSubmit = await Submit.find({});
    console.log(allSubmit)
    res.status(200).json(new ApiResponse(200, allSubmit));

})

const applicationCount = asyncHandler(async (req, res) => {
    const count = await Submit.collection.countDocuments(); // Fetches document count asynchronously
    res.status(200).json(new ApiResponse(200, count));
});


/*
const saveApplication = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { personalInformation } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json(new ApiError(404, "User not found"));
        }

        user.application.personalInformation = personalInformation;
        await user.save();

        res.status(200).json(new ApiResponse(200, user, "Application details saved successfully"));
    } catch (error) {
        res.status(500).json(new ApiError(500, error.message));
    }
});

 */
export {register, loginUser, admin, logoutUser, updateAdmin, adminToken, submit, applicationCount, getAllSubmit, getCollegeSubmit}
