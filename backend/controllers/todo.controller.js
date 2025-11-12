import asyncHandler from "express-async-handler";
import CustomError from "../utils/customError.util.js";
import Todo from "../models/todo.model.js";
import ApiResponse from "../utils/ApiResponse.util.js";

export const addTodo = asyncHandler(async (req, res, next) => {
  const { title, description } = req.body;
  if (!title) {
    return next(new CustomError("Title is Rrequired !", 401));
  }

  const todo = await Todo.create({ user: req.user._id, title, description });

  new ApiResponse(201, true, "Todo created successfully ! ", todo).send(res);
});

export const allTodo = asyncHandler(async (req, res, next) => {
  const todos = await Todo.find({ user: req.user._id }).sort({
    createdAt: -1,
  });

  new ApiResponse(200, true, "All Todo Fetched ! ", todos).send(res);
});

export const getSingleTodo = asyncHandler(async (req, res, next) => {
  const todo = await Todo.findOne({ _id: req.params.id, user: req.user._id });

  if (!todo) {
    return next(new CustomError("Todo Not Found !", 404));
  }

  new ApiResponse(200, true, "Todo Fetched ! ", todo).send(res);
});

export const updateTodo = asyncHandler(async (req, res, next) => {
  const todo = await Todo.findOne({ _id: req.params.id, user: req.user._id });

  if (!todo) {
    return next(new CustomError("Todo Not Found !", 404));
  }

  const updatedTodo = await Todo.findByIdAndUpdate(req.params.id , req.body, {
    new : true ,
  }) 


  new ApiResponse(200 , true , "Todo Updated Successfully !" , updatedTodo).send(res )
});

export const deleteSingleTodo = asyncHandler(async (req, res, next) => {
  const todo = await Todo.findOne({ _id: req.params.id, user: req.user._id });
  if (!todo) {
    return next(new CustomError("Todo Not Found !", 404));
  }
  await todo.deleteOne();
  new ApiResponse(201, true, "Todo Deleted Succesfully  ! ").send(res);
});
