import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/user.js";
import Consultant from "../models/consultant.js";

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
    let user = await User.findOne({email: email});
    if (!user)
    {
        const consultant = await Consultant.findOne({login: email});
        if(!consultant){
            const error = new Error();
            error.message = 'Account not exist';
            error.statusCode = 400;
            next(error);
            return error;
        }
        else{ // should be hashing or something when we login but for now i leave it
            if(password == consultant.password){
                const token = await jwt.sign({
                    id: consultant._id.toString()
                },process.env.SECRET_KEY);
                res.status(200).json({
                    message: "Logged as an Consultant",
                    token: token 
                });    
            }
        }
    }
    
    const logged = await bcrypt.compare(password,user.password);
    if(logged)
    {
        const token = await jwt.sign({
            id: user._id.toString()
        },process.env.SECRET_KEY);
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