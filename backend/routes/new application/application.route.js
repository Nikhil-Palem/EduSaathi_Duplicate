import {Router} from "express"
import { applicationController} from '../../controllers/new application/application.controller.js';

const router = Router();

router.route("/").post(applicationController)

export default router;
