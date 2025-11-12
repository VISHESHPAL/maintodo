import expressAsyncHandler from "express-async-handler";
import CustomError from "../utils/customError.util.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const Authrization = expressAsyncHandler(async (req, res, next) => {
  const token = req.cookies?.token;
  // console.log(token);

  if (!token) {
    return next(new CustomError("Not Authorized , Token Missing ", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) { 
      return next(new CustomError("User not found, authorization failed", 404));
    }

    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    return next(new CustomError("Not Authorized , Token Failed ", 403))
  }
});

export default Authrization;
