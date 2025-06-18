import { ApiError } from "../utils/ApiError.js";

import validator from 'validator';
import nodemailer from 'nodemailer';
import { ApiResponse } from "../utils/ApiResponse.js";
import { Lead } from "../models/lead.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import axios from "axios";
import { sendMail } from "../helper/mailer.js";
import { CreatedColleges } from "../models/createdcolleges.model.js";
import { StaffRegistration } from "../models/staffRegistration.model.js";
import { Waitlist } from "../models/waitlist.model.js";
import { UserCollege } from '../models/usercolleges.model.js'
import { StudentStaffMapping } from "../models/StudentStaffMapping.model.js";
axios.defaults.withCredentials = true

const generateTokens = async (userId) => {
    try {
        const lead = await Lead.findById(userId);
        const token = await lead.generateToken();

        await lead.save({ validateBeforeSave: false })
        return token;
    } catch (error) {
        return new ApiError(500, "Something went wrong")
    }
}

const signUp = asyncHandler(async (req, res) => {

    const { role, email, password, name } = req.body;
    if (!(role && email && password && name)) {
        return res.status(401).send(new ApiError(400, "All fields are required"))
    }
    if (!email.includes("@")) {
        return res.status(400).send(new ApiError(400, "Email is not valid"))
    }
    if (password.length < 6) {
        return res.status(400).send(new ApiError(400, "Password should be atleast 6 characters"))
    }

    const LeadExist = await Lead.findOne({ email });

    if (LeadExist) {
        if (LeadExist.isVerified) {
            return res.status(400).send(new ApiError(400, "Lead already exists and is verified"));
        } else {
            // Resend verification email
            await sendMail({ email, emailType: "VERIFY", userId: LeadExist._id });
            return res.status(200).json(new ApiResponse(200, null, "Verification email resent. Please verify your email."));
        }
    }

    const lead = await Lead.create({
        name,
        role,
        email,
        password
    });

    const createdLead = await Lead.findById(lead._id).select("-password")

    if (!createdLead) {
        return res.status(500).send(new ApiError(500, "Something went wrong while creating user"))
    }
    let createdCollegeId;
    if (role === 'admin')
        createdCollegeId = await CreatedColleges.findOne({ createdBy: lead._id }).select("_id");

    await sendMail({ email, emailType: "VERIFY", userId: createdLead._id });

    return res.status(200).json(new ApiResponse(200, { lead, createdCollegeId }, "User created successfully"))
})

const signIn = asyncHandler(async (req, res) => {

    const { email, password } = req.body;
    if (!(email && password)) {
        return res.status(400).send(new ApiError(400, "All fields are required"))
    }
    const leadExist = await Lead.findOne({ email });

    if (!leadExist) {
        return res.status(400).send(new ApiError(400, "User does not exist"));
    }

    if (!leadExist.isVerified) {
        return res.status(403).send(new ApiError(403, "Please verify your account first by Signing Up..."));
    }
    const validLead = await leadExist.comparePassword(password);
    if (!validLead) {
        return res.status(400).send(new ApiError(400, "Invalid password"));
    }
    console.log(leadExist._id)
    const token = await generateTokens(leadExist._id);

    const loggedLead = await Lead.findById(leadExist._id).select("-password");
    let createdCollegeId;
    console.log("loggedLead role", loggedLead.role);

    if (loggedLead.role === 'admin') {
        const result = await CreatedColleges.findOne({ createdBy: leadExist._id }).select("_id");
        createdCollegeId = result?._id || null;
    } else if (loggedLead.role === 'staff') {
        const result = await StaffRegistration.findOne({ createdBy: leadExist._id }).select("collegeId");
        createdCollegeId = result?.collegeId || null;
    }
    console.log("loggedLead role", loggedLead.role);
    console.log("createdCollegeId", createdCollegeId);
    const option = {
        httpOnly: false,
        secure: true
    }
    return res.status(200).cookie('token', token, option).json(new ApiResponse(200, { user: loggedLead, createdCollegeId, token }, "User logged in successfully"))

})

const verifyEmail = asyncHandler(async (req, res) => {
    const { token } = req.body;
    console.log(token)
    const lead = await Lead.findOne({ verificationToken: token, verificationTokenExpiry: { $gt: Date.now() } });
    if (!lead) {
        return res.status(400).send(new ApiError(400, "Invalid user"));
    }
    lead.isVerified = true;
    lead.verificationToken = undefined;
    lead.verificationTokenExpiry = undefined;

    await lead.save();

    return res.status(200).json(new ApiResponse(200, {}, "Email verified successfully"))

})

const signOut = asyncHandler((req, res) => {
    const option = {
        httpOnly: false,
        secure: true,
        sameSite: 'none'
    }
    return res.status(200).clearCookie('token', option).json(new ApiResponse(200, {}, "User logged out successfully"));
})

const verificationMsg = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const user = await Lead.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });

    return res.status(200).json({ isVerified: user.isVerified });
});

const adminRegistration = asyncHandler(async (req, res) => {
    const { collegeName, branches, adminCode, email } = req.body;
    console.log("req.body", req.body);
    if (!(collegeName && branches && adminCode)) {
        return res.status(400).send(new ApiError(400, "All fields are required"))
    }
    const user = await Lead.findOne({ email });
    if (!user) {
        return res.status(401).send(new ApiError(401, "Unauthorized: User not logged in"));
    }

    const admin = await CreatedColleges.create({
        collegeName,
        branches,
        admin_code: adminCode, // Use the correct field name
        createdBy: user._id, // Add the `createdBy` field
    });

    return res.status(200).json(new ApiResponse(200, admin, "Admin registered successfully"))
})

const getColleges = asyncHandler(async (req, res) => {
    const query = req.query.q || "";
    try {
        const collegesdata = await CreatedColleges.find({
            collegeName: { $regex: `^${query}`, $options: "i" }
        }).select("collegeName branches _id").limit(5);

        res.status(200).json(collegesdata);
    } catch (error) {
        res.status(500).json({ error: "Error fetching colleges" });
    }
});

const staffRegistration = asyncHandler(async (req, res) => {
    const { collegeName, branch, staff_email, collegeId } = req.body;
    const user = await Lead.findOne({ email: staff_email });
    if (!user) {
        return res.status(401).send(new ApiError(401, "Unauthorized: User not logged in"));
    }

    const staff = await StaffRegistration.create({
        collegeName,
        collegeId,
        branchName: branch,
        createdBy: user._id,
    });

    return res.status(200).json(new ApiResponse(200, staff, "Staff registered successfully"))
})

const FetchColleges = asyncHandler(async (req, res) => {
    const { search } = req.query;
    console.log("Searching:", search || "No search term, fetching all");

    try {
        const query = search
            ? { collegeName: { $regex: `^${search}`, $options: "i" } }
            : {}; // No filter, return all colleges

        const response = await CreatedColleges.find(query).select("-__v");

        res.status(200).json(response);
    } catch (err) {
        console.error("Error fetching colleges:", err);
        res.status(500).json({ message: "Server error" });
    }
});

const CheckEmail = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const existingUser = await Lead.findOne({ email });

    res.json({ exists: !!existingUser });
});

const AddWaitlist = asyncHandler(async (req, res) => {
    const { name, email, role } = req.body;
    try {
        const existingEntry = await Waitlist.findOne({ email });

        if (existingEntry) {
            return res
                .status(409)
                .json(new ApiError(409, 'This email is already on the waitlist.'));
        }

        const newEntry = await Waitlist.create({ name, email, role });

        return res
            .status(201)
            .json(new ApiResponse(201, newEntry, 'Successfully added to the waitlist.'));
    } catch (error) {
        console.error('Waitlist creation error:', error);
        return res
            .status(500)
            .json(new ApiError(500, 'An error occurred while processing your request.'));
    }
});

const sendOtp = asyncHandler(async (req, res) => {
    const { email } = req.query;

    if (!email || !validator.isEmail(email)) {
        return res.status(400).json(new ApiError(400, "Invalid email address"));
    }

    const user = await Lead.findOne({ email });
    if (!user) {
        return res.status(404).json(new ApiError(404, "User not found with this email lead"));
    }

    // 1. Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiration = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

    // 2. Store hashed OTP and expiration in user doc (or create a separate model)
    user.otp = otp;
    user.otpExpiresAt = otpExpiration;
    await user.save();

    // 3. Send the OTP
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: true,
        port: 465,
        auth: {
            user: process.env.USER,
            pass: process.env.PASS,
        }
    });

    await transporter.sendMail({
        from: process.env.FROM,
        to: email,
        subject: 'Your OTP for Secure Access - EduSaathi',
        html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border-radius: 10px; overflow: hidden; border: 1px solid #dedede; background-color: #ffffff;">
      <div style="background-color: #f3eaff; padding: 30px 20px 10px 20px; text-align: center;">
        <img src="C:\Users\Admin\Desktop\Edu\edusaathi\src\components\Assets\eduSaathiLogo.png" alt="EduSaathi Logo" style="margin-bottom: 10px;">
      </div>
      <div style="padding: 20px 30px;">
        <h2 style="color: #333;">Hi User!</h2>
        <p style="font-size: 16px; color: #444;">Your <strong style="color: #d39e00;">One-Time Password (OTP)</strong> for secure access is:</p>
        <h1 style="font-size: 32px; color: #000; letter-spacing: 2px; margin: 20px 0;">${otp}</h1>
        <p style="color: #666;">This code is valid for <strong>10 minutes</strong>. Please do not share this code with anyone.</p>
        <p style="color: #666;">If you did not request this OTP, please ignore this email or contact our support team immediately.</p>
        <br>
        <p style="color: #444;">Thank you,<br><strong>The EduSaathi Team</strong></p>
      </div>
      <div style="padding: 20px 30px; background-color: #f9f9f9; border-top: 1px solid #eee;">
        <h4 style="margin-bottom: 8px; color: #333;">Stay Connected with EduSaathi!</h4>
        <ul style="padding-left: 20px; color: #555; font-size: 14px;">
          <li>📥 Move this email to your Inbox (if found in Spam/Promotions).</li>
          <li>⭐ Mark it as Starred or Important for quick access in future.</li>
        </ul>
      </div>
      <div style="background-color: #8f83da; color: white; text-align: center; padding: 15px 20px; font-size: 12px;">
        This email and any attachments may contain confidential information intended solely for the recipient. Unauthorized use, sharing, or dissemination is prohibited.<br><br>
        You are receiving this email as part of your association with <strong>EduSaathi</strong>.<br>
        For assistance, contact us at <a href="mailto:support@edusaathi.com" style="color: white; text-decoration: underline;">support@edusaathi.com</a>.
      </div>
    </div>
  `,
    });


    res.status(200).json(new ApiResponse(200, {}, "OTP sent successfully"));
});

const verifyOtp = asyncHandler(async (req, res) => {
    const { email, otp } = req.query;
    console.log(email, otp)
    if (!email || !otp) {
        return res.status(400).json(new ApiError(400, "Email and OTP are required"));
    }

    const user = await Lead.findOne({ email });
    console.log("user", user)
    if (!user || !user.otp || !user.otpExpiresAt) {
        return res.status(404).json(new ApiError(404, "OTP not found or expired"));
    }

    if (user.otp !== otp) {
        return res.status(401).json(new ApiError(401, "Invalid OTP"));
    }

    if (user.otpExpiresAt < Date.now()) {
        return res.status(410).json(new ApiError(410, "OTP has expired"));
    }

    // Clear OTP after successful verification
    user.otp = undefined;
    user.otpExpiresAt = undefined;
    await user.save();

    res.status(200).json(new ApiResponse(200, {}, "OTP verified successfully"));
});

const resetPassword = asyncHandler(async (req, res) => {
    const { email, password } = req.query;

    if (!email || !password) {
        return res.status(400).json(new ApiError(400, "Email and new password are required"));
    }

    const user = await Lead.findOne({ email });
    if (!user) {
        return res.status(404).json(new ApiError(404, "User not found"));
    }

    user.password = password; // Will be hashed in pre-save hook
    await user.save();

    res.status(200).json(new ApiResponse(200, {}, "Password reset successfully"));
});

const fetchStaff = asyncHandler(async (req, res) => {
    const { collegeId } = req.query;
    // console.log("Fetching staff for collegeId:", collegeId);
    try {
        const collegeNameDoc = await CreatedColleges.findById(collegeId).select('collegeName');
        const collegeName = collegeNameDoc.collegeName;
        const college = await StaffRegistration.find({ collegeName });
        // console.log("College Data:", college);
        if (!college) {
            return res.status(404).json({ message: 'College not found' });
        }
        const staffIds = college.map((c) => c.createdBy);

        const staff = await Lead.find({ _id: { $in: staffIds } });
        const studentCount = await UserCollege.countDocuments({ college_id: collegeId });
        console.log("staff count", studentCount)
        // 5. Send response
        res.status(200).json({
            staff,
            studentCount
        });
    } catch (error) {
        console.error('Error fetching staff data:', error);
        res.status(500).json({ message: 'Server error' });
    }
}
);

const fetchBranches = asyncHandler(async (req, res) => {
    const { collegeid } = req.query;
    const collegeNameDoc = await CreatedColleges.findById(collegeid).select('collegeName');
    const collegeName = collegeNameDoc.collegeName;
    try {
        const branchCounts = await StaffRegistration.aggregate([
            { $match: { collegeName: collegeName } }, // Filter by college name (check spelling!)
            {
                $group: {
                    _id: "$branchName",                  // Group by branch name
                    branchCount: { $sum: 1 }             // Count entries
                }
            },
            {
                $project: {
                    _id: 0,
                    branchName: "$_id",                  // Rename _id to branchname
                    branchCount: 1
                }
            }
        ]);
        console.log(branchCounts)
        res.status(200).json({ branchCounts });

    } catch (error) {
        console.error("Error fetching branch data:", error);
        res.status(500).json({ message: 'Server Error' });
    }
});

const assignStudentsToStaff = async (req, res) => {
    const { collegeId } = req.body;
    const students = await UserCollege.find({ college_id: collegeId, status: "new" });
    const staff = await StaffRegistration.find({ collegeId });

    const staffCount = staff.length;
    const studentCount = students.length;
    console.log("satff std", staffCount, studentCount);

    if (staffCount === 0 || studentCount === 0) return;

    const baseCount = Math.floor(studentCount / staffCount);
    let remainder = studentCount % staffCount;

    let studentIndex = 0;

    for (let i = 0; i < staffCount; i++) {
        const count = baseCount + (remainder > 0 ? 1 : 0);
        if (remainder > 0) remainder--;

        const assignedStudents = students.slice(studentIndex, studentIndex + count);

        const mappings = assignedStudents.map(s => ({
            student_id: s.user_id,
            staff_id: staff[i].createdBy,
            college_id: collegeId,
        }));

        console.log("std mappings", mappings);
        await StudentStaffMapping.insertMany(mappings);

        const studentIds = assignedStudents.map(s => s._id);
        await UserCollege.updateMany(
            { _id: { $in: studentIds } },
            { $set: { status: "assigned" } }
        );

        studentIndex += count;
    }
};

const getStudentsForStaff = async (req, res) => {
    const { staffId, collegeId } = req.query;
    console.log("satff id from getstudetnsfor stafff fun",staffId)
    try {

        const mappings = await StudentStaffMapping.find({
            staff_id: staffId,
            college_id: collegeId,
        }).populate('student_id');

        const studentsWithStatus = await Promise.all(mappings.map(async (mapping) => {
            const student = mapping.student_id;
            console.log(student);
            const userCollege = await UserCollege.findOne({
                user_id: student._id,
                college_id: collegeId,
            });

            console.log(userCollege);
            return {
                ...student.toObject(),
                status: userCollege?.status || 'new',
            };
        }));

        return res.status(200).json({ students: studentsWithStatus });
    } catch (err) {
        console.error('Error fetching students for staff:', err);
        return res.status(500).json({ error: 'Server error' });
    }
};

export { signUp, signIn, signOut, verifyEmail, verificationMsg, adminRegistration, getColleges, staffRegistration, FetchColleges, CheckEmail, AddWaitlist, sendOtp, verifyOtp, resetPassword, fetchStaff, fetchBranches, assignStudentsToStaff, getStudentsForStaff };

