import Product from "../models/productModel.js";
import asyncHandler from 'express-async-handler';

//createProduct
export const createProduct = async (req, res) => {
    try{
        const {
            name,
            description,
            price,
            category,
            brand,
            stock,
            images,
            ratings,
        } = req.body;
        
        if(!name || !description || !price || !category || !brand || !stock || !images || !ratings){
            throw new Error("Please fill complete data");
        }

        const product = await Product.create({
            name,
            description,
            price,
            category,
            brand,
            stock,
            images,
            ratings,
        });

        res.status(201).json({ success: true, message:"Products created Successfully" , product });

    }catch(err){
        res.status(500).json({
        success: false,
        message: err.message || "Server error",
        });
    }
};

//getAllProducts
export const getAllProducts = async (req, res) => {
    const products = await Product.find().populate('category brand');
    res.status(200).json({ success: true, products });
};

//getProductById
export const getProductById = async (req,res)=>{
    try{
        const {id}=req.params;
        const product = await Product.findById(id).populate("category brand");


        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        res.status(200).json({
            success: true,
            product,
        });

    }catch(err){
        res.status(400).json({
        success: false,
        message: "Invalid product ID",
        });
    }
}

//updateProduct
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    product.name = req.body.name ?? product.name;
    product.description = req.body.description ?? product.description;
    product.price = req.body.price ?? product.price;
    product.category = req.body.category ?? product.category;
    product.brand = req.body.brand ?? product.brand;
    product.stock = req.body.stock ?? product.stock;
    product.images = req.body.images ?? product.images;
    product.ratings = req.body.ratings ?? product.ratings;

    const updatedProduct = await product.save();

    res.status(200).json({
      success: true,
      message: "Product updated Successfully",
      product: updatedProduct,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Invalid product ID",
    });
  }
};


//deleteProduct
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    await product.deleteOne();

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Invalid product ID",
    });
  }
};

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
export const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    // 1. Check if user already submitted a review
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error('Product already reviewed');
    }

    // 2. Create the review object
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    // 3. Add review to product array
    product.reviews.push(review);

    // 4. Update total number of reviews
    product.numReviews = product.reviews.length;

    // 5. Calculate Average Rating
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: 'Review added' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});