import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";

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



mongoose.connect(process.env.DB_URL,{useNewUrlParser: true,useUnifiedTopology:true})
.then(result=>{
    console.log('Connected with database');
    const server=app.listen(process.env.PORT || 3000);
})
.catch(err=>{
    console.log(err);
})