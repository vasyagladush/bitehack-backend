import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    fullname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    dateBirth: {
        type: Date,
        required: true
    },
    subjects: [
    {
        name: {
            type: String,
            required: true
        } ,
        percent: {
            type: String,
            required: true
        } ,
        level: {
            type: String,
            required: true
        }
    }
    ]
});

const model = mongoose.model('User',userSchema);
export default model;