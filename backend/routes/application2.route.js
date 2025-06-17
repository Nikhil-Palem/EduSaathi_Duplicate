
import {Router} from "express"

import {application2, getApplication2} from "../controllers/application2.controller.js";
import {upload} from "../middleware/multer.middleware.js";
const router = Router();

router.route("/application2").post(upload.fields([{name: 'marksheets'}, {name: 'testScore'}]),application2);
router.route("/application2").get(getApplication2);
export default router;