import Category from "../models/categoryModel.js"

//createCategory
export const createCategory = async (req, res) => {
    try {
        const { name, slug, parentId, description } = req.body;

        if (!name || !slug || !description) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required fields",
            });
        }

        const existingCategory = await Category.findOne({ slug });

        if (existingCategory) {
            return res.status(400).json({
                success: false,
                message: "Category with this slug already exists",
            });
        }

        const category = await Category.create({
            name,
            slug,
            parentId: parentId || null,
            description,
        });

        res.status(201).json({
            success: true,
            message: "Category created successfully",
            category,
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || "Server error",
        });
    }
};


//getAllCategories
export const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json({
            success: true,
            categories,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || "Server error",
        });
    }
};