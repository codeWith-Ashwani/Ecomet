import mongoose from "mongoose";

const brandSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String
    },
    logo:{
        public_id:{type:String},
        url:{type:String}
    }
},{timestamps:true});


const Brand = mongoose.model('Brand',brandSchema);
export default Brand;