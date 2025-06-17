import { Router } from "express"
import { register, loginUser, user, logoutUser, googleUser, editUser, AddColleges, getStudents, sendOtp, verifyOtp, resetPassword } from "../controllers/user.controller.js";
import { verifyGoogle, verifyJWT } from "../middleware/auth.js";
import { saveApplication } from '../controllers/user.controller.js';
import { upload } from '../middleware/multer.middleware.js';
import { authMiddleware } from '../middleware/auth.js';
const router = Router();

router.route("/register").post(register)
router.route("/login").post(loginUser)
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/").get(verifyJWT, user)
router.route("/edit").put(verifyJWT, upload.single('profileImage'), editUser)
router.route("/googleAuth").get(verifyGoogle, googleUser)
router.post('/save-application', authMiddleware, saveApplication);
router.route('/addCollege').post(AddColleges);
router.route('/getStdData').get(getStudents);
router.route('/send-otp').get(sendOtp);
router.route('/verify-otp').get(verifyOtp);
router.route('/reset-password').patch(resetPassword);
export default router;

/*
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');

// @route    POST api/users
// @desc     Register user
// @access   Public
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('school', 'School is required').not().isEmpty(),
    check('class', 'Class is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('phone', 'Phone is required').not().isEmpty(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
  ],
  async (req, res) => {
    console.log(req.cookies.token);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, school, class: className, email, phone, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
      }

      user = new User({
        name,
        school,
        class: className,
        email,
        phone,
        password,
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };
      
      
      jwt.sign(payload,config.get('jwtSecret'),{ expiresIn: 360000 },(err, token) => {
        
        if (err) throw err;
         
          res.json({token});
        }
      );
      
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
*/