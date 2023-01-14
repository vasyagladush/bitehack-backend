import User from "../models/user.js";
import Consultant from "../models/consultant.js";
import Chat from "../models/chat.js";
import socket from "../utils/socket.js";

const sendMessage = async (req, res, next) => {
  // to do
//   console.log(req.consultant);
  if (req.consultant) {
    
    // return res.status(200).json({
    //   message: "Consultant shit",
    // });
  } else {
    const userSendingMessage = req.userId;
    const consultantId = req.body.consultantId;
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
      await chat.save();
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
        userfirst: true,
      });

      return res.status(200).json({
        _id: chatInDb.messages[chatInDb.messages.length - 1]._id,
        user: user,
        message: message,
        consultant: consultant,
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
      const consultant = await Consultant.findOne({ _id: consultantId }).select(
        "fullname"
      );
      const socket1 = socket.getIo();
      socket1.emit("message", {
        _id: chatInDb.messages[chatInDb.messages.length - 1]._id,
        user: user,
        message: message,
        consultant: consultant,
      });

      return res.status(200).json({
        _id: chatInDb.messages[chatInDb.messages.length - 1]._id,
        user: user,
        message: message,
        consultant: consultant,
      });
    }
  }
};

export {sendMessage};