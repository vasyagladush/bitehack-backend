import mongoose from "mongoose";
const consultantSchema = new mongoose.Schema({
   name: {
    type: String,
    required: true
   },
   surname: {
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