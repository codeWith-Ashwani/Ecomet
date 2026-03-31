import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product name is required"],
        trim: true
    },
    slug: {
        type: String,
        lowercase: true,
        unique: true
    },
    description: String,
    price: {
        type: Number,
        required: [true, "Product price is required"]
    },
    discount: {
        type: Number,
        default: 0
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    // brand: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Brand',
    //     required: true
    // },
    stock: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: String,
            url: String
        }
    ],
    ratings: {
        type: Number,
        default: 0
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
            name: String,
            rating: Number,
            comment: String
        }
    ],
    isFeatured: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });


const Products = mongoose.model('Products',productSchema);
export default Products;