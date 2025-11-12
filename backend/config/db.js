import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log(process.env.MONGO_URI)
    const connect = await mongoose.connect(`${process.env.MONGO_URI}`);
    console.log("Database connected Successfully ! ", connect.connection.host);
  } catch (error) {
     console.log("DataBase Connection Error  " , error);
  }
};

export default connectDB
