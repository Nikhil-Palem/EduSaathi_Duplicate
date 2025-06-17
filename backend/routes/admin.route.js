import {Router} from "express"
import {register, loginUser, admin, logoutUser, updateAdmin, adminToken, submit, applicationCount, getAllSubmit, getCollegeSubmit} from "../controllers/admin.controller.js";
import {verifyAdmin}  from "../middleware/auth.js";
import {upload} from "../middleware/multer.middleware.js"

const router = Router();

router.route("/register").post(upload.single('college_logo'),register)
router.route("/login").post(loginUser)
router.route("/logout").post(verifyAdmin, logoutUser);
router.route("/verify").get(verifyAdmin,adminToken)
router.route("/").get(admin)
router.route("/edit/:id").put(verifyAdmin,upload.single('college_logo') ,updateAdmin)
router.route("/submit").post(verifyAdmin,submit)
router.route("/applicationCount").get(applicationCount)
router.route("/getAllApplication").get(verifyAdmin,getAllSubmit)
router.route("/getCollegeQuestions").post(getCollegeSubmit)

export default router;