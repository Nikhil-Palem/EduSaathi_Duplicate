import {Router} from "express"
import {uploadedApplicationController, getUploadedApplicationController} from "../controllers/uploadedApplication.controller.js";


const router = Router();

router.route("/").post(uploadedApplicationController);
router.route('/getApplications').get(getUploadedApplicationController)


export default router;