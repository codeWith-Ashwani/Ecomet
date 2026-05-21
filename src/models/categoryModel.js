import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true, "Category name is required"],
        unique:true
    },
    slug:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    parentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
        default:null
    },
    description:{
        type:String,
    },
    images: [
        {
            public_id: String,
            url: String
        }
    ],
},{timestamps:true});

const Category =  mongoose.model('Category',categorySchema);
export default Category;

