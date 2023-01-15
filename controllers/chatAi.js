import User from "../models/user.js";
import Chat from "../models/chat.js";
import socket from "../utils/socket.js";
import { ChatGPTAPIBrowser } from 'chatgpt'
import dotenv from "dotenv";

dotenv.config();

const sendMessage = async(req,res,next)=>{ 
    await api.initSession();
    const result = await api.sendMessage("Hello World!");
    console.log(result.response);   
};

const getChat = async(req,res,next)=> {


};

export {sendMessage,getChat};