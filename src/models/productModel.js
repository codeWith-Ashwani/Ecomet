import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Product name is required"],
        trim:true
    },
    description:{
        type:String
    },
    price:{
        type: Number,
        required: [true, "Product price is required"]
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
        required: [true, "Product must belong to a category"]
    },
    brand:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Brand',
        required: [true, "Product must belong to a brand"]
    },
    stock:{
        type:Number,
        required: [true, "Stock quantity is required"],
        default:0
    },
    images: [
        {
            public_id: { type: String, required: true },
            url: { type: String, required: true }
        }
    ],
    ratings: {
        type: Number,
        default: 0
    }

},{timestamps:true});


const Products = mongoose.model('Products',productSchema);
export default Products;