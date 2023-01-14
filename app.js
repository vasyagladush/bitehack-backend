import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import socket from "./utils/socket.js";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";
const app = express();

dotenv.config();

app.use(bodyParser.json());

app.use((req, res, next) => {//cors policy
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, person2, input, X-Requested-With, Origin, Accept');

    next();
  });

app.use("/auth",authRouter);

app.use("/user",userRouter);

app.use((error,req,res,next)=>{//error handling
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({
      message: message
    });
});




mongoose.connect(process.env.DB_URL,{useNewUrlParser: true,useUnifiedTopology:true})
.then(result=>{
    console.log('Connected with database');
    const server=app.listen(process.env.PORT || 3000);
    const socket1 = socket.init(server);
    socket1.on('connect',socket=>{
        console.log("connected");
    }); 
})
.catch(err=>{
    console.log(err);
})