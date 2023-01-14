import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/user.js";

const signup =async (req,res,next)=>{
    let existingUser = await User.findOne({email: req.body.email });
    if(existingUser){
        const error = new Error();
        error.message = 'Account already exist';
        error.statusCode = 401;
        next(error);
        return error;
    } 

    const user = await User.create({...req.body,password: await bcrypt.hash(req.body.password,12)});
    const token = await jwt.sign({id: user._id.toString()},process.env.SECRET_KEY);
    await user.save();
    res.status(201).json({
        message: "Succesfully created user",
        token: token
    })
};  

const login = async (req,res,next)=>{ 
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({email: email});
    if (!user)
    {
        const error = new Error();
        error.message = 'Account not exist';
        error.statusCode = 400;
        next(error);
        return error;
    }
    const logged = await bcrypt.compare(password,user.password);
    if(logged)
    {
        const token = await jwt.sign({
            id: user._id.toString()
        },process.env.SECRET_KEY,{
            expiresIn: '1h'
        });
        res.status(200).json({
            message: 'Logged',
            token: token
        });
    }
    else {
        const error = new Error();
        error.message = 'Wrong Password';
        error.statusCode = 401;
        next(error);
        return error;
    }
};

export {signup,login};