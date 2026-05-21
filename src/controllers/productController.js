import Product from "../models/productModel.js";
import slugify from "slugify";
import mongoose from "mongoose";
import Category from "../models/categoryModel.js";

//createProduct
export const createProduct = async (req, res) => {
    try {
        const products = req.body;

        if (!Array.isArray(products) || products.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Please provide an array of products"
            });
        }

        // Validate required fields
        const invalidProduct = products.find(
            (p) =>
                !p.name ||
                !p.description ||
                !p.price ||
                !p.category ||
                // !p.brand ||
                !p.stock ||
                !p.images ||
                p.ratings === undefined
        );

        if (invalidProduct) {
            return res.status(400).json({
                success: false,
                message: "Each product must contain all required fields"
            });
        }

        // Insert products
        const insertedProducts = await Product.insertMany(products);

        // Optional clean response
        const productList = insertedProducts.map((product) => ({
            productId: product._id,
            productName: product.name
        }));

        res.status(201).json({
            success: true,
            message: "Products created successfully",
            products: productList
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || "Server error"
        });
    }
};

//createMultipleProduct
export const createMultipleProduct = async (req, res) => {
    try {
        const products = req.body;

        // 1. Check array
        if (!Array.isArray(products) || products.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Please provide an array of products"
            });
        }

        // 2. Validate each product
        for (let i = 0; i < products.length; i++) {
            const p = products[i];

            if (
                !p.name ||
                !p.description ||
                p.price === undefined ||
                !p.category ||
                p.stock === undefined ||
                !Array.isArray(p.images) ||
                p.images.length === 0
            ) {
                return res.status(400).json({
                    success: false,
                    message: `Invalid product at index ${i}`
                });
            }

            // 3. Generate slug if not provided
            const baseSlug = slugify(p.name, { lower: true });
            const uniqueSlug = `${baseSlug}-${Date.now()}-${i}`;
            p.slug = uniqueSlug;

            // 4. Default values
            p.ratings = p.ratings || 0;
            p.numOfReviews = p.numOfReviews || 0;
            p.isActive = p.isActive ?? true;
            p.discount = p.discount || 0;
        }

        // 5. Insert into DB
        const insertedProducts = await Product.insertMany(products, {
            ordered: false // continue even if some fail
        });

        // 6. Clean response
        const productList = insertedProducts.map((product) => ({
            productId: product._id,
            productName: product.name
        }));

        return res.status(201).json({
            success: true,
            message: `${insertedProducts.length} products created successfully`,
            products: productList
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message || "Server error"
        });
    }
};

//getAllProducts
export const getAllProducts = async (req, res) => {
    const products = await Product.find().populate('category');
    res.status(200).json({ success: true, products });
};

//getProductById
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID format",
      });
    }

    const product = await Product.findById(id).populate("category");

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // ✅ Keep response consistent with frontend
    res.status(200).json({
      success: true,
      data: product,
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const getProductsByCategory = async (req, res) => {

  try {

    const { categoryId } = req.params;

    // FIND SUBCATEGORIES
    const subCategories =
      await Category.find({
        parentId: categoryId
      });

    console.log(subCategories);

    const subCategoryIds =
      subCategories.map(
        (cat) => cat._id
      );



    // RANDOM PRODUCTS
    const products =
      await Product.aggregate([
        {
          $match: {
            category: {
              $in: subCategoryIds
            }
          }
        },
        {
          $sample: {
            size: 20
          }
        }
      ]);


    res.status(200).json({
      success: true,
      products
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

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
    // product.brand = req.body.brand ?? product.brand;
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

// addProductProperties
export const addProductProperties = async (req, res) => {

  try {

    const { id } = req.params;
    const {tags } = req.body;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // update only provided fields
    product.tags = tags ?? product.tags;

    const updatedProduct = await product.save();

    res.status(200).json({
      success: true,
      message: "Product properties updated successfully",
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

// get product related to particular sub-categories
export const getSubCategoryProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Sub-category ID is required",
      });
    }

    // find all products with parentId = sub-category id
    const products = await Product.find({ category: id });

    if (!products || products.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No products found for this sub-category",
      });
    }

    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      data: products,
    });
  } catch (err) {
    console.error("Error fetching sub-category products:", err);
    res.status(500).json({
      success: false,
      message: "Server error while fetching products",
    });
  }
};

export const searchProducts = async (req, res) => {
  try {
    const { q } = req.query;

    const results = await Product.aggregate([
      {
        $search: {
          index: "default",
          compound: {
            should: [
              {
                autocomplete: {
                  query: q,
                  path: "name",
                  fuzzy: { maxEdits: 2 }
                }
              },
              {
                text: {
                  query: q,
                  path: "tags"
                }
              }
            ]
          }
        }
      },
      {
        $limit: 10
      },
      {
        $project: {
          name: 1,
          price: 1,
          images: 1,
          score: { $meta: "searchScore" }
        }
      }
    ]);

    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};