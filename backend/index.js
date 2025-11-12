import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import error from "./middlewares/error.middleware.js";
import userRouter from "./routes/user.route.js";
import todoRouter from "./routes/todo.route.js";

dotenv.config();
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true,
  })
); 

connectDB();

app.use("/user", userRouter);
app.use("/todo", todoRouter)
app.use(error);

app.get("/", (req, res) => {
  res.send("Backend is Working ");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`App is listening on PORT ${PORT}`);
});
