import {Router} from "express";
import {body} from "express-validator";
import {validate} from "../middlewares/validate.middleware.js";
import NavbarItem from "../models/NavbarItem.js";

const router=new Router();

router.get("/", async (req,res)=>{
    try {
        const novItems=await NavbarItem.find().sort('order')
        res.status(200).json(novItems);
    }
    catch(err){
        console.log(err);
        res.status(500).json(err);
    }
})

router.post('/',[
    body('title').exists().notEmpty().isString(),
    body('href').exists().notEmpty().isString(),
    body('dropdownItem.title').exists().notEmpty().isString(),
    body('dropdownItem.href').exists().notEmpty().isString(),
],validate,async (req,res)=>{
    try {
        const data=req.body;
        const navbarItem= await NavbarItem.create(data)
        res.status(201).json({message:"NavbarItem created successfully.",navbarItem})
    }
    catch(err){
        res.status(500).json({message:"NavbarItem created failed",error:err})
    }
})

export default router;
