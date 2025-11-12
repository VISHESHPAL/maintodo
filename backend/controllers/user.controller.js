import asyncHandler from "express-async-handler";
import CustomError from "../utils/customError.util.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import ApiResponse from "../utils/ApiResponse.util.js";
import generateToken from "../utils/token.util.js";

// ✅ Cookie options for both local & production
// const cookieOptions = {
//   httpOnly: true,
//   secure: process.env.NODE_ENV === "production", // ✅ only true on HTTPS
//   sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // ✅ allow cross-origin cookies in prod
//   maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
// };

export const register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(new CustomError("All fields are required", 400));
  }

  const existUser = await User.findOne({ email });
  if (existUser) {
    return next(new CustomError("User already exists", 400));
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ name, email, password: hashedPassword });

  return new ApiResponse(
    201,
    true,
    "User registered successfully",
    newUser
  ).send(res);
});

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new CustomError("All fields are required", 400));
  }

  const user = await User.findOne({ email });
  if (!user) {
    return next(new CustomError("Invalid credentials", 401));
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return next(new CustomError("Invalid credentials", 401));
  }

  const token = generateToken(user._id);

  // ✅ Set cookie that works in both environments
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" ? true : false,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 24 * 60 * 60 * 1000,
  });

  return new ApiResponse(200, true, "User logged in successfully", {
    user,
    token,
  }).send(res);
});

export const logout = asyncHandler(async (req, res, next) => {
  // ✅ Clear cookie safely for both local and production
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" ? true : false,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });

  return new ApiResponse(200, true, "User logged out successfully").send(res);
});

export const isLogged = asyncHandler(async (req, res, next) => {
  const user = req.user;
  if (!user) {
    return next(new CustomError("Not logged in", 401));
  }

  return new ApiResponse(200, true, "User is logged in", user).send(res);
});
