import {Router} from "express";
import {validate} from "../middlewares/validate.middleware.js";
import {body} from "express-validator";
import Category from "../models/Category.js";
import category from "../models/Category.js";


const router = new Router();

router.get("/:slug", async (req, res) => {
    try{
        const slug = req.params.slug;
        const name=await category.find({slug}).select("name");
        if(!name) throw new Error("Category not found");
        res.status(200).json(name)
    }
    catch(err){
        res.status(401).json({message:err.message});
    }

})

router.post('/', [
    body('name')
        .exists().notEmpty().isString(),
    body('slug').optional().isString(),
    body('parent').optional().isMongoId().withMessage('شناسه والد معتبر نیست'),

    body('status')
        .optional()
        .isIn(['active','inactive']).withMessage('وضعیت باید active یا inactive باشد'),

    body('description')
        .optional().isString()

],validate, async (req, res) => {

    try {
        const data=req.body;
        const category =await Category.create(data)
        res.status(201).json({ message: "دسته‌بندی با موفقیت اضافه شد", data: category });
    } catch (err) {
        res.status(500).json({ message: "خطا در ذخیره دسته‌بندی", error: err.message });
    }
});

export default router;