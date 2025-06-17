import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/User.js"
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/uploadOnCloudinary.js";
import { UserCollege } from "../models/usercolleges.model.js";
// import CreatedCollege from '../models/createdcolleges.model.js'
import { CreatedColleges } from '../models/createdcolleges.model.js'
import mongoose from "mongoose";
import validator from 'validator';
import nodemailer from 'nodemailer';
// import EduSaathiLogo from '../../src/components/Assets/edusaathiLogo.png';

const generateTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const token = await user.generateToken();
    await user.save({ validateBeforeSave: false })
    return token;
  } catch (error) {
    return new ApiError(500, "Wrinf went")
  }
}
const generateNumericUUID = (length) => {
  let uuid = '';
  while (uuid.length < length) {
    uuid += Math.floor(Math.random() * 10); // adds a digit (0–9)
  }
  return uuid;
};

const register = asyncHandler(async (req, res) => {
  let { name, email, password } = req.body;

  // Check for missing fields
  if (!(name && email && password)) {
    return res.status(400).send(new ApiError(400, "All fields are required"));
  }

  // Check for existing user
  const userExist = await User.findOne({ email });
  if (userExist) {
    return res.status(409).send(new ApiError(409, "User already exists with current email"));
  }

  // Generate unique Edu ID
  const eduId = generateNumericUUID(10);

  // Create user
  const user = await User.create({
    name,
    email,
    password,
    eduId,
  });

  const createdUser = await User.findById(user._id).select("-password");

  if (!createdUser) {
    return res.status(500).send(new ApiError(500, "Something went wrong while creating user"));
  }

  return res.status(201).json(new ApiResponse(201, createdUser, "User created successfully"));
});

const loginUser = asyncHandler(async (req, res) => {

  const { email, password } = req.body;
  if (!(email && password)) {
    return res.status(400).send(new ApiError(400, "All fields are required"))
  }
  const userExist = await User.findOne({ email });

  if (!userExist) {
    return res.status(400).send(new ApiError(400, "User does not exist"));
  }
  const validUser = await userExist.comparePassword(password);
  if (!validUser) {
    return res.status(400).send(new ApiError(400, "Invalid password"));
  }
  const token = await generateTokens(userExist._id);
  const loggedUser = await User.findById(userExist._id).select("-password");
  const option = {
    httpOnly: false,
    secure: true
  }
  return res.status(200).cookie('token', token, option).json(new ApiResponse(200, { user: loggedUser, token }, "User logged in successfully"))

})

const logoutUser = asyncHandler((req, res) => {

  const option = {
    httpOnly: false,
    secure: true,
    sameSite: 'none'
  }
  return res.status(200).clearCookie('token', option).json(new ApiResponse(200, {}, "User logged out successfully"));
})

const user = asyncHandler(async (req, res) => {
  console.log(req.user);
  const user = await User.findById(req.user._id).select('-password');
  if (!user) {
    return res.status(400).send(new ApiError(400, "No user found"))
  }
  res.status(200).json(new ApiResponse(200, user));
})
const editUser = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const profileImage = req.file;
  const input = req.body;
  console.log(input)
  const { name, email, oldPassword, newPassword, profileImage: profile } = req.body;

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json(new ApiError(404, "User not found"));
  }

  // Update name
  if (name) user.name = name;

  // Update email
  if (email) {
    if (!email.includes("@")) {
      return res.status(400).json(new ApiError(400, "Invalid email format"));
    }
    user.email = email;
  }

  // Update password
  if (oldPassword && newPassword) {
    const isPasswordCorrect = await user.comparePassword(oldPassword);
    if (!isPasswordCorrect) {
      return res.status(401).json(new ApiError(401, "Old password is incorrect"));
    }

    if (newPassword.length < 6) {
      return res.status(400).json(new ApiError(400, "Password must be at least 6 characters"));
    }

    user.password = newPassword; // Will be hashed in pre-save hook
  }

  // Update profile image
  if (profileImage) {
    const profileImagePath = profileImage.path;
    const fileURL = await uploadOnCloudinary(profileImagePath);
    user.profileImage = fileURL.url;
  }
  if (profile) {

    user.profileImage = profile;
  }
  await user.save();

  const updatedUser = await User.findById(userId).select("-password");

  res.status(200).json(new ApiResponse(200, updatedUser, "User profile updated successfully"));
});

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

const googleUser = asyncHandler(async (req, res) => {

  if (!user) {
    return res.status(400).send(new ApiError(400, "No user found"))
  }
  res.status(200).json(new ApiResponse(200, req.user))

})

const AddColleges = asyncHandler(async (req, res) => {
  const { user_id, clg_id } = req.body;
  console.log(user_id, clg_id);
  try {
    // Optional: check if the relation already exists
    const exists = await UserCollege.findOne({ user_id, college_id: clg_id });
    if (exists) {
      return res.status(400).json({ message: "User already added to this college." });
    }

    const newEntry = await UserCollege.create({
      user_id,
      college_id: clg_id
    });

    res.status(201).json({ message: "College added successfully", data: newEntry });
  } catch (err) {
    console.error("Error adding college:", err);
    res.status(500).json({ message: "Server error" });
  }
});

const getStudents = asyncHandler(async (req, res) => {
  try {
    const { collegeId } = req.query;
    console.log("college id", collegeId);

    // if (!mongoose.Types.ObjectId.isValid(collegeId)) {
    //   return res.status(400).json({ message: 'Invalid college ID' });
    // }

    const userCollegeMappings = await UserCollege.find({ college_id: collegeId });

    console.log("userCollegeMappings", userCollegeMappings);

    const userIds = userCollegeMappings.map(entry => entry.user_id);

    console.log("userIds", userIds);

    const users = await User.find({ _id: { $in: userIds } });

    console.log("users", users);
    const college = await CreatedColleges.findById(collegeId);

    const students = users.map(user => {
      const mapping = userCollegeMappings.find((u) => u.user_id.toString() === user._id.toString());
      console.log("mappings stastus",mapping);
      return {
        name: user.name,
        email: user.email,
        eduId: user.eduId,
        collegeName: college.collegeName,
        status: mapping?.status || 'new',
        joinedAt: mapping?.joinedAt || null
      }
    });

    console.log("students data", students);
    res.status(200).json(students);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err });
  }
});

const sendOtp = asyncHandler(async (req, res) => {
  const { email } = req.query;

  if (!email || !validator.isEmail(email)) {
    return res.status(400).json(new ApiError(400, "Invalid email address"));
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json(new ApiError(404, "User not found with this email"));
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

  const user = await User.findOne({ email });
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

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json(new ApiError(404, "User not found"));
  }

  user.password = password; // Will be hashed in pre-save hook
  await user.save();

  res.status(200).json(new ApiResponse(200, {}, "Password reset successfully"));
});

export { register, loginUser, user, logoutUser, saveApplication, googleUser, editUser, AddColleges, getStudents, sendOtp, verifyOtp, resetPassword };
