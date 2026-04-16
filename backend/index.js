import express from "express"
import dotenv from "dotenv"
import connectDb from "./database/db.js";
import userRoutes from "./routes/userRoute.js"
import chatRoutes from "./routes/chatRoute.js"
import cors from "cors"

const app = express();

dotenv.config();

const PORT = process.env.PORT||5000;

//using Middlewares
app.use(express.json())
app.use(cors())
//using Routes
app.use("/api/User", userRoutes);
app.use("/api/chat", chatRoutes);


app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`);
    connectDb()
})