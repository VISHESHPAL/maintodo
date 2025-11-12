import asyncHandler from "express-async-handler";
import CustomError from "../utils/customError.util.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import ApiResponse from "../utils/ApiResponse.util.js";
import generateToken from "../utils/token.util.js";

export const register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(new CustomError("All Field are Required ", 401));
  }

  const existUser = await User.findOne({ email });

  if (existUser) {
    return next(new CustomError("User Already Exist ", 400));
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ name, email, password: hashedPassword });

  new ApiResponse(201, true, "User Created Successfully !", newUser).send(res);
});

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new CustomError("All Field are Required ", 401));
  }

  const user = await User.findOne({ email });

  if (!user) {
    return next(new CustomError("Invalid User Crediantials ", 401));
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return next(new CustomError("Invalid Password ", 401));
  }

  let token = generateToken(user._id);

  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 1 * 24 * 60 * 60 * 1000,
  });

 new ApiResponse(200, true, "User Logged In Successfully!", { user, token }).send(res);

});

export const logout = asyncHandler(async (req, res, next) => {
  res.clearCookie("token", {
    httpOnly: false,
    secure: false,
  });

  new ApiResponse(200, true, "User Logout Successfully ! ").send(res);
});

export const isLogged = asyncHandler(async (req, res, next) => {
  const user =req.user
  return new ApiResponse(200, true, "User is Logged In ", user ).send(res);
});
