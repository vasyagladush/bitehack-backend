import mongoose from "mongoose";
const chatSchema = new mongoose.Schema({
    user: {
        type:  mongoose.SchemaTypes.ObjectId,
        ref: "User"
    },
    consultant: { 
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Consultant"
    },
    messages: [
        {
           person: {
            type: mongoose.SchemaTypes.ObjectId
           },
           message: {
            type: String,
            required: true
           }
        }
    ]
});

const model = mongoose.model("chat",chatSchema);
export default model;