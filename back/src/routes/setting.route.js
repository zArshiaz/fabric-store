import Setting from "../models/Setting.js";
import Router from "express";
import {requireAdmin} from "../middlewares/auth.middleware.js";

const router = Router();


router.get("/shopping-cost", async (req, res) => {
    try {
        let shopping = await Setting.findById('shopping')
        if(!shopping){
             shopping=await Setting.create({
                _id:'shopping',
                shoppingCost:1000
            })
        }
        res.json(shopping.shoppingCost)
    } catch (err) {
        console.log(err)
        res.status(500).json({message: 'خطا در گرفتن هزینه آدرس'});
    }
})

router.post("/shopping-cost",requireAdmin(process.env) ,async (req, res) => {
    try {
        let {cost} = req.body;
        const shopping = await Setting.findByIdAndUpdate('shopping', {
            shoppingCost: cost,
        }, {new: true, upsert: true})
        res.json(shopping)
    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'خطای سرور.'});
    }
})

export default router;