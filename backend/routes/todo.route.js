import express from "express";
import {
  addTodo,
  allTodo,
  deleteSingleTodo,
  getSingleTodo,
  updateTodo,
} from "../controllers/todo.controller.js";
import Authrization from "../middlewares/auth.middleware.js";

const todoRouter = express.Router();

todoRouter.post("/add", Authrization, addTodo);
todoRouter.get("/all", Authrization, allTodo);
todoRouter.get("/:id", Authrization, getSingleTodo);
todoRouter.patch("/:id", Authrization, updateTodo);
todoRouter.delete("/:id", Authrization, deleteSingleTodo);

export default todoRouter;
