import {Router} from "express"
import {verifyJWT}  from "../middleware/auth.js";
import {application, examAPI, getStateWiseApplications} from "../controllers/application.controller.js";
import {upload} from "../middleware/multer.middleware.js";
import { submitApplication, getApplicationsForUniversity, updateApplicationStatus } from "../controllers/application.controller.js";
const router = Router();

router.route("/application").post(verifyJWT, upload.fields([
    {name: 'markSheet_12', maxCount: 1},
    {name: 'markSheet_11', maxCount: 1},
    {name: 'markSheet_10', maxCount: 1},
    {name: 'markSheet_9', maxCount: 1},
    {name: 'bitSatFile', maxCount: 1}
]),application);

router.route('/examApi').post(examAPI);

router.post("/submit", verifyJWT, upload.fields([
    { name: 'markSheet_12', maxCount: 1 },
    { name: 'markSheet_11', maxCount: 1 },
    { name: 'markSheet_10', maxCount: 1 },
    { name: 'markSheet_9', maxCount: 1 },
    { name: 'bitSatFile', maxCount: 1 }
]), submitApplication);

// University views applications
router.get('/university', verifyJWT, getApplicationsForUniversity);

// University updates application status
router.patch('/status/:applicationId', verifyJWT, updateApplicationStatus);

router.get('/state-wise', verifyJWT);


export default router;