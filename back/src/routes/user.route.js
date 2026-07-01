import { Router } from "express";
import { requireAdmin } from "../middlewares/auth.middleware.js";
import { User } from "../models/User.js";
import Comment from "../models/comment.js";
import { body } from "express-validator";

const router = Router();
router.use(requireAdmin(process.env));

router.get('/recent-visit',async(req,res)=>{
  try {
    const recentUsers=await User.find().sort({lastAction:-1}).limit(5)
    
    res.status(200).json(recentUsers)
  } catch (error) {
    res.status(500).json({message:'server error'})
  }
})

router.get('/today-users',async(req,res)=>{
  try {
     const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);
    const users = await User.find({
      createdAt:{
        $gte:startOfDay,
        $lte:endOfDay
      }
    });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
})

router.get("/count", async (req, res) => {
  try {
    const users = await User.estimatedDocumentCount();

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/all", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post(
  "/edit/:id",
  [
    body("name").trim().isString(),
    body("emial").trim().isString(),
    body("phone").trim().isString(),
    body("role").trim().isIn(["admin", "user"]),
  ],
  async (req, res) => {
    try {
      const { id } = req.params;
      const users = await User.findByIdAndUpdate(id, req.body);

      res.status(200).json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const users = await User.findById(id);

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/comments/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const commnets = await Comment.find({ user: id }).populate(
      "product",
      "name"
    );

    res.status(200).json(commnets);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

export default router;
