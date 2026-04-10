import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import transactionRoutes from "./routes/transactionRoutes.js";


dotenv.configDotenv();

const app = express(); // created express application and app is main server

//app.use() use to apply middleware
//eg cors is a middleware-> function that runs between req and res
app.use(cors());
app.use (express.json());

app.use("/api/transactions", transactionRoutes);


mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("Mongodb Connected"))
.catch(err=> console.log(err));


app.listen(process.env.PORT, ()=>{
console.log(`Server running on the port ${process.env.PORT}`);
});





