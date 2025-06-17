import {Router} from "express"
import {verifyJWT}  from "../middleware/auth.js";
import {newCollege, allColleges, findCollege} from "../controllers/college.controller.js";
const router = Router();

router.route("/new-college").post(verifyJWT, newCollege);
router.route("/all-college").get(verifyJWT, allColleges);
router.route("/find-college").post(verifyJWT, findCollege);
export default router;