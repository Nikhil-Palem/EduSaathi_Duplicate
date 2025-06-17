import mongoose from 'mongoose'
import bcryptjs from 'bcryptjs';
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
  },
  otpExpiresAt: {
    type: Date,
  },
  eduId: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
    default: "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png",
  },

  date: {
    type: Date,
    default: Date.now,
  },

  application: {
    personalInformation: {
      legalName: String,
      middleName: String,
      lastName: String,
      dateOfBirth: Date,
      socialCategory: String,
      otherCategory: String
    }
  }
});

userSchema.pre("save", async function (next) {
  if (!this.isModified('password')) {
    return next();
  }


  this.password = await bcryptjs.hash(this.password, 10);
  next();
})

userSchema.methods.comparePassword = async function (password) {
  return await bcryptjs.compare(password, this.password);
}

userSchema.methods.generateToken = async function () {
  return jwt.sign(
    { _id: this._id }
    , process.env.SECRET,
    { expiresIn: '1d' })
}

export const User = mongoose.model('User', userSchema);
