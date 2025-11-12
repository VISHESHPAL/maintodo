import express from 'express'
import { isLogged, login, logout, register } from '../controllers/user.controller.js';
import Authrization from '../middlewares/auth.middleware.js';

const userRouter = express.Router();

userRouter.post("/register", register )
userRouter.post("/login", login )
userRouter.post("/logout", Authrization , logout )
userRouter.get("/islogged", Authrization , isLogged )

export default userRouter