import User from "../models/user.js";


const sendMessage = async(req,res,next)=>{ 
    const userSendingMessage = req.userId;
    const consultantId = req.body.id;
    const message = req.body.message;


};