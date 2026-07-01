import express from "express";
import { body } from "express-validator";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import { validate } from "../middlewares/validate.middleware.js";
import Address from "../models/Address.js";
import { requireAdmin, requireAuth } from "../middlewares/auth.middleware.js";
import Setting from "../models/Setting.js";


const router = express.Router();

router.get("/", requireAuth(process.env), async (req, res) => {
  try {
    const user = req.user;
    const orders = await Order.find({ user: user.id,status: { $ne: "expired" } })
      .sort({ createdAt: -1 })
      .populate("user");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "خطا در گرفتن سفارش ها" });
  }
});

router.get("/all", requireAdmin(process.env), async (req, res) => {
  try {
    const orders = await Order.find().populate("user");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "خطا در گرفتن سفارش ها" });
  }
});

router.get("/today-orders-count", requireAdmin(process.env), async (req, res) => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const orders = await Order.countDocuments({
      createdAt: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "خطا در گرفتن تعداد سفارش ها" });
  }
});

router.get('/today-revenue',requireAdmin(process.env),async(req,res)=>{
     try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const orders = await Order.find({
      createdAt: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
      status: { $ne: "expired" }
    });
    res.status(200).json(orders.reduce((sum,order)=>order.totalPrice,0));
  } catch (error) {
    res.status(500).json({ message: "خطا در گرفتن تعداد سفارش ها" });
  }
})
router.get("/:id", requireAuth(process.env), async (req, res) => {
  try {
    console.log("run get order by id");
    const { id } = req.params;
    const user = req.user;

    const order = await Order.findById(id).populate("user");

    if (!order) {
      return res.status(404).json({ message: "سفارش یافت نشد" });
    }

    if (order.user._id.toString() === user.id || user.role === "admin") {
      return res.status(200).json(order);
    }

    return res.status(401).json("unauthorized");
  } catch (error) {
    console.error("error", error);
    return res.status(500).json(error);
  }
});



router.delete("/:id", requireAdmin(process.env), async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findByIdAndDelete(id).populate("user");

    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "خطا در حذف سفارش", error });
  }
});


router.post(
  "/changeAddress/:id",
  requireAdmin(process.env),
  [
    body("title").trim().isString().optional(),
    body("phone").trim().isString().optional(),
    body("province").trim().isString(),
    body("city").trim().isString(),
    body("address").trim().isString(),
    body("zipCode").trim().isInt(),
  ],
  validate,
  async (req, res) => {
    try {
      const { id } = req.params;
      const newData = req.body;

      console.log(newData);
      const order = await Order.findByIdAndUpdate(
        id,
        {
          $set: {
            address: {
              title: newData.title,
              phone: newData.phone,
              province: newData.province,
              city: newData.city,
              address: newData.address,
              zipCode: newData.zipCode,
            },
          },
        },
        { new: true },
      ).populate("user");
      if (!order)
        return res.status(404).json({ message: "آدرس مورد نظر یافت نشد." });

      res.status(200).json(order);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "خطا در تغییر سفارش", error });
    }
  },
);
router.post(
  "/changeStatus/:id",
  requireAdmin(process.env),
  [
    body("status")
      .isIn(["confirmed", "shipped", "delivered", "canceled","pending","paid"])
      .withMessage("حالت نامعتبر"),
  ],
  validate,
  async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const order = await Order.findByIdAndUpdate(
        id,
        { status },
        { new: true },
      ).populate("user");

      res.status(200).json(order);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "خطا در تغییر سفارش", error });
    }
  },
);

export default router;
