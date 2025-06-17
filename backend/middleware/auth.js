
import { ApiError } from '../utils/ApiError.js';
import jwt from "jsonwebtoken";
import { User } from '../models/User.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import {Admin} from "../models/admin.model.js"
import {OAuth2Client} from "google-auth-library";
import {ApiResponse} from "../utils/ApiResponse.js";

const verifyJWT = asyncHandler(async(req, res, next)=>{
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(400).send(new ApiError(400, "No token"))
    }
    const decodeToken = jwt.verify(token, process.env.SECRET)
    const user = await User.findById(decodeToken?._id).select("-password")
    if (!user) {
     return res.send(new ApiError(401, "no user"))
    }
    req.user = user;
    next();
  } catch (error) {
    return res.send(new ApiError(400, "unable to verify"))
  }
})

const verifyGoogle = asyncHandler(async (req, res, next)=>{
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(400).send(new ApiError(400, "No token"))
    }
    const client = new OAuth2Client("210770566906-kts16nk2e04dr7vpoekk8255eqreseuk.apps.googleusercontent.com");
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: "210770566906-kts16nk2e04dr7vpoekk8255eqreseuk.apps.googleusercontent.com",
    });
    // const payload =  // Contains user info
    req.user = ticket.getPayload();
  next();
    // const decodeToken = jwt.verify(token, process.env.SECRET)
    // const user = await User.findById(decodeToken?._id).select("-password")
    // if (!user) {
    //   return res.send(new ApiError(401, "no user"))
    // }
    // req.user = user;
    // return res.send(new ApiResponse(200, payload, "Success"))

  } catch (error) {
    return res.send(new ApiError(400, "unable to verify"))
  }
})

const verifyAdmin = asyncHandler(async(req, res, next)=>{
  try {
    const adminToken = req.cookies.adminToken;

    if (!adminToken) {
      return res.status(400).send(new ApiError(400, "No token"))
    }
    const decodeToken = jwt.verify(adminToken, process.env.SECRET)
    const admin = await Admin.findById(decodeToken?._id).select("-password")
    if (!admin) {
      return res.send(new ApiError(401, "no user"))
    }
    req.admin = admin;
    next();
  } catch (error) {
    return res.send(new ApiError(400, "unable to verify"))
  }
})

const authMiddleware = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json(new ApiError(401, 'Access denied. No token provided.'));
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = await User.findById(decoded._id);
    next();
  } catch (error) {
    res.status(400).json(new ApiError(400, 'Invalid token.'));
  }
});

export { authMiddleware, verifyJWT, verifyAdmin, verifyGoogle };