import mongoose from "mongoose";

export const ChatStatus = {
  CLOSED: "closed",
  AWAITING_CONSULTANT_RESPONSE: "awaitingConsultantResponse",
  AWAITING_USER_RESPONSE: "awaitingUserResponse",
};

const chatSchema = new mongoose.Schema({
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
  consultant: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Consultant",
  },
  status: {
    type: String,
    enum: [
      ChatStatus.CLOSED,
      ChatStatus.AWAITING_CONSULTANT_RESPONSE,
      ChatStatus.AWAITING_USER_RESPONSE,
    ],
    default: ChatStatus.AWAITING_CONSULTANT_RESPONSE,
  },
  messages: [
    {
      sender: {
        type: mongoose.SchemaTypes.ObjectId,
      },
      message: {
        type: String,
        required: true,
      },
    },
  ],
});

const model = mongoose.model("chat", chatSchema);
export default model;
