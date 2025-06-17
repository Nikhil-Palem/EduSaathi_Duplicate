import { Router } from "express"

import { signUp, signIn, signOut, verifyEmail, verificationMsg, adminRegistration, getColleges, staffRegistration, FetchColleges, CheckEmail, AddWaitlist, resetPassword, verifyOtp, sendOtp, fetchStaff, fetchBranches, assignStudentsToStaff, getStudentsForStaff } from "../controllers/lead.controller.js";
const router = Router();

router.route("/signUp").post(signUp);
router.route("/signIn").post(signIn);
router.route("/signOut").post(signOut);
router.route("/verify").post(verifyEmail);
router.route("/check-verification").post(verificationMsg);
router.route("/admin-registration").post(adminRegistration);
router.route("/search").get(getColleges);
router.route('/staff-registration').post(staffRegistration);
router.route('/colleges').get(FetchColleges);
router.route('/check-email').post(CheckEmail);
router.route('/waitlist').post(AddWaitlist);
router.route('/send-otp').get(sendOtp);
router.route('/verify-otp').get(verifyOtp);
router.route('/reset-password').patch(resetPassword);
router.route('/staffdata').get(fetchStaff);
router.route('/getBranches').get(fetchBranches);
router.route('/mapStudentsToStaff').post(assignStudentsToStaff);
router.route('/MyStudents').get(getStudentsForStaff);
export default router;