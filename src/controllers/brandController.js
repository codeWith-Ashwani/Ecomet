import Brand from "../models/brandModel.js"

//createBrand
export const createBrand = async(req,res) =>{
    try{
        const {
            name,
            description,
            logo
        } = req.body;
        
        if(!name || !description || !logo){
            throw new Error("Please fill complete data");
        }

        const brand = await Brand.create({
            name,
            description,
            logo
        });

        res.status(201).json({ success: true, message:"Brand created Successfully" , brand });
    }catch(err){
        res.status(500).json({
        success: false,
        message: err.message || "Server error",
        });
    }
}


//getAllBrands
export const getAllBrands = async (req, res) => {
    const brands = await Brand.find();
    res.status(200).json({ success: true, brands });
};