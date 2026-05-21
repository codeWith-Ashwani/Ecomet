import Wishlist from "../models/wishlistModel.js";


// Add To Wishlist
export const addToWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;

    // Check already exists
    const existingItem = await Wishlist.findOne({
      user: userId,
      product: productId,
    });

    if (existingItem) {
      return res.status(400).json({
        success: false,
        message: "Product already in wishlist",
      });
    }

    // Create wishlist item
    const wishlistItem = await Wishlist.create({
      user: userId,
      product: productId,
    });

    res.status(201).json({
      success: true,
      message: "Added to wishlist",
      wishlistItem,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Remove From Wishlist
export const removeFromWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;

    const deletedItem = await Wishlist.findOneAndDelete({
      user: userId,
      product: productId,
    });

    if (!deletedItem) {
      return res.status(404).json({
        success: false,
        message: "Wishlist item not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Removed from wishlist",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Get User Wishlist
export const getWishlist = async (req, res) => {
  try {
    const userId = req.user.id;

    const wishlist = await Wishlist.find({ user: userId })
      .populate("product");

    res.status(200).json({
      success: true,
      wishlist,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
