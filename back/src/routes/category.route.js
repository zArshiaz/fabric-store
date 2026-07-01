import { Router } from "express";
import mongoose from "mongoose";
import { requireAdmin } from "../middlewares/auth.middleware.js";
import {validate} from "../middlewares/validate.middleware.js";
import {body} from "express-validator";
import Category from "../models/Category.js";
import Product from "../models/Product.js";

const router = new Router();

router.get('/all', async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/:slug', async (req, res) => {
    try {
        const { slug } = req.params;
        const categoryItem = await Category.findOne({ slug }).select("name");
        if (!categoryItem) return res.status(404).json({ message: "Category not found" });
        res.status(200).json(categoryItem);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.post('/', [
    body('name')
        .exists().notEmpty().isString(),
    body('slug').exists().notEmpty().isString(),
    
    body('description')
        .optional().isString()

],validate, async (req, res) => {
    try {
        const data = req.body;
        const categoryItem = await Category.create(data);
        res.status(201).json({ message: "دسته‌بندی با موفقیت اضافه شد", data: categoryItem });
    } catch (err) {
        res.status(500).json({ message: "خطا در ذخیره دسته‌بندی", error: err.message });
    }
});

router.post('/:id', [
    body('name')
        .exists().notEmpty().isString(),
    body('slug').exists().notEmpty().isString(),
    
    body('description')
        .optional().isString()

],validate, async (req, res) => {
    try {
        const {id}=req.params
        if(!id) throw new Error('id is requier')
        const data = req.body;
        const categoryItem = await Category.findByIdAndUpdate(id,data);
        res.status(201).json({ message: "دسته‌بندی با موفقیت ویرایش شد", data: categoryItem });
    } catch (err) {
        res.status(500).json({ message: "خطا در ویرایش دسته‌بندی", error: err.message });
    }
});

router.delete('/:id', requireAdmin(process.env), async (req, res) => {
    const { id } = req.params;


    if (!id) return res.status(400).json({ message: "id is required" });
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid category id" });
    }

    const objectId = new mongoose.Types.ObjectId(id);

    try {
      
        await Product.updateMany(
            { categories: objectId },
            { $pull: { categories: objectId } }
        );

        const deletedCategory = await Category.findByIdAndDelete(objectId);
        if (!deletedCategory) return res.status(404).json({ message: "Category not found" });

        res.status(200).json({ message: "دسته‌بندی با موفقیت حذف شد", data: deletedCategory });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "خطا در حذف دسته‌بندی", error: err.message });
    }
});

export default router;
