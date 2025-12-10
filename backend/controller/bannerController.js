import { Banner } from "../models/bannerModel.js";

// create Banner
export const createBanner = async (req, res) =>{
    try{
        const {title, subtitle, image, link, isActive} = req.body;
        const newBanner = new Banner({title, subtitle, image, link, isActive});
        await newBanner.save();
        res.status(201).json({message: "Banner created successfully", banner: newBanner});
    }catch(error){
        console.log("Error in creating banner", error);
        res.status(500).json({message: "Server Error", error: error.message});
    }
}

export const getBanners = async (req, res) =>{
    try{
        const banners = await Banner.find().sort({createdAt: -1});
        return res.status(200).json({
            success: true,
            total: banners.length,
            banners
        })
    }catch(error){
        console.log("Error in fetching banners", error);
        res.status(500).json({message: "Server Error", error: error.message});
    }
}

export const updateBanner = async (req, res) =>{
    try{
        const {id} = req.params;
        const {title, subtitle, image, link, isActive} = req.body;
        const updatedBanner = await Banner.findByIdAndUpdate(id, {title, subtitle, image, link, isActive}, {new: true});
        if(!updatedBanner){
            return res.status(404).json({message: "Banner not found"});
        }
        res.status(200).json({message: "Banner updated successfully", banner: updatedBanner});
    }catch(error){
        console.log("Error in updating banner", error);
        res.status(500).json({message: "Error in updating banner", error: error.message});
    }
}

export const deleteBanner = async (req, res) =>{
    try{
        const {id} = req.params;
        const deletedBanner = await Banner.findByIdAndDelete(id);
        if(!deletedBanner){
            return res.status(404).json({message: "Banner not found"});
        }
        res.status(200).json({message: "Banner deleted successfully", banner: deletedBanner});
    }catch(error){
        console.log("Error in deleting banner", error);
        res.status(500).json({message: "Error in deleting banner", error: error.message});
    }
}