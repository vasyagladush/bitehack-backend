import mongoose from "mongoose";
const consultantSchema = new mongoose.Schema({
    login: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    fullname: {
        type: String,
        required: true
    },
   universities:[
    {
        name: {
            type: String,
            reuqired: true
        },
        location: {
            type: String,
            required: true
        },
        
    }
   ]

});

const model = mongoose.model("Consultant",consultantSchema);
export default model;