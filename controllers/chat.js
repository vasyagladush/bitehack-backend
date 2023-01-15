import User from "../models/user.js";
import Consultant from "../models/consultant.js";
import Chat from "../models/chat.js";
import socket from "../utils/socket.js";
import { ChatStatus } from "../models/chat.js";

const sendMessage = async (req, res, next) => {
  try {
    if (req.consultant) {
      const consultantSendingMessage = req.userId;
      const userId = req.body.personId;
      const message = req.body.message;
      const chat = await Chat.findOne({
        consultant: consultantSendingMessage,
        user: userId,
      });
      if (!chat) {
        return res.status(500).json({
          message: "You don't have chat with this user!",
        });
      }
      chat.messages.push({
        sender: consultantSendingMessage,
        message: message,
      });

      const chatInDb = await chat.save();
      const user = await User.findOne({ _id: userId }).select("fullname");
      const consultant = await Consultant.findOne({
        _id: consultantSendingMessage,
      }).select("fullname");

      const socket1 = socket.getIo();
      socket1.emit("message", {
        _id: chatInDb.messages[chatInDb.messages.length - 1]._id,
        user: user,
        message: message,
        consultant: consultant,
        userSender: false,
      });
      return res.status(200).json({
        _id: chatInDb.messages[chatInDb.messages.length - 1]._id,
        user: user,
        message: message,
        consultant: consultant,
        userSender: false,
      });
    } else {
      const userSendingMessage = req.userId;
      const consultantId = req.body.personId;
      const message = req.body.message;
      let chat = await Chat.findOne({
        user: userSendingMessage,
        consultant: consultantId,
      });
      if (!chat) {
        chat = new Chat({
          user: userSendingMessage,
          consultant: consultantId,
          messages: [
            {
              sender: userSendingMessage,
              message: message,
            },
          ],
        });
        const chatInDb = await chat.save();
        const socket1 = socket.getIo();
        const user = await User.findOne({
          _id: userSendingMessage,
        }).select("fullname");

        const consultant = await Consultant.findOne({
          _id: consultantId,
        });

        socket1.emit("message", {
          chatId: chat._id,
          user: user,
          message: message,
          consultant: consultant,
          userSender: true,
        });

        return res.status(200).json({
          _id: chatInDb.messages[chatInDb.messages.length - 1]._id,
          user: user,
          message: message,
          consultant: consultant,
          userSender: true,
        });
      } else {
        chat.messages.push({
          sender: userSendingMessage,
          message: message,
        });

        const chatInDb = await chat.save();
        const user = await User.findOne({ _id: userSendingMessage }).select(
          "fullname"
        );
        const consultant = await Consultant.findOne({
          _id: consultantId,
        }).select("fullname");
        const socket1 = socket.getIo();
        socket1.emit("message", {
          _id: chatInDb.messages[chatInDb.messages.length - 1]._id,
          user: user,
          message: message,
          consultant: consultant,
          userSender: true,
        });

        return res.status(200).json({
          _id: chatInDb.messages[chatInDb.messages.length - 1]._id,
          user: user,
          message: message,
          consultant: consultant,
          userSender: true,
        });
      }
    }
  } catch (exception) {
    res.status(500).json(exception);
  }
};

const getChats = async (req, res, next) => {
  try {
    if (req.consultant) {
      const consultantSendingMessage = req.userId;
      const chats = await Chat.find({
        consultant: consultantSendingMessage,
      });

      const chatsResponse = await Promise.all(
        chats.map(async (chat) => {
          const chatResponse = chat.toObject();
          const user = await User.findOne({ _id: chat.user });
          chatResponse.user = user.toObject();
          delete chatResponse.user?.password;
          return chatResponse;
        })
      );
      
      return res.status(200).json(chatsResponse);
    } else {
      const userId = req.userId;
      const chats = await Chat.find({
        user: userId,
      });
      return res.status(200).json(chats);
    }
  } catch (exception) {
    res.status(500).json(exception);
  }
};

const getInfoAboutMe = async(req,res,next)=> {
  try{
    const userId = req.userId;
    const isConsultant = req.consultant;
    if(isConsultant){
      const consultant = await Consultant.findOne({_id: userId});
      const consultantToSend = consultant.toObject();
      delete consultantToSend.password;
      return res.status(200).json(consultantToSend);
    }
    else{
      const user = await User.findOne({_id: userId});
      const userToSend = user.toObject();
      delete userToSend.password;
      return res.status(200).json(userToSend);
    }
  }
  catch(err){
    console.log(err);
  }
};

const getConsultantChat = async(req,res,next)=>{
  const consultantId = req.params.consultantId;
  const userId = req.userId; 

  const chat = await Chat.findOne({consultant: consultantId,user: userId});
  return res.status(200).json({
    ...chat?.toObject()
  });
};

const getUserChat = async(req,res,next)=> { 
  const userId = req.params.userId;
  const consultantId = req.userId;
  const chat = await Chat.findOne({consultant: consultantId,user: userId});
  return res.status(200).json({ 
    ...chat?.toObject()
  })
};

const updateChat = async (req, res, next) => {
  try {
    const chatId = req.params.chatId;
    const newStatus = req.body.status;

    if (Object.values(ChatStatus).indexOf(newStatus) <= -1) {
      return res.status(500).json({
        message: `'status' should be one of ${Object.values(ChatStatus)}`,
      });
    }

    const chat = await Chat.findOneAndUpdate(
      {
        _id: chatId,
      },
      { status: newStatus }
    );

    const updatedChat = await Chat.findOne({
      _id: chatId,
    });

    return res.status(200).json(updatedChat);
  } catch (exception) {
    res.status(500).json(exception);
  }
};

export { sendMessage, getChats, updateChat,getInfoAboutMe,getConsultantChat, getUserChat };
