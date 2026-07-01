import { Router } from "express";
import { body } from "express-validator";
import { validate } from "../middlewares/validate.middleware.js";
import NavbarItem from "../models/NavbarItem.js";

const router = new Router();

router.get("/", async (req, res) => {
  try {
    const novItems = await NavbarItem.find().sort("order");
    res.status(200).json(novItems);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post(
  "/",
  [
    body("title").exists().notEmpty().isString(),
    body("href").exists().notEmpty().isString(),
    body("order").exists().notEmpty().isInt(),
    body("dropdownItems").optional().isArray(),
    body("dropdownItems.*.title").exists().notEmpty().isString(),
    body("dropdownItems.*.href").exists().notEmpty().isString(),
  ],
  validate,
  async (req, res) => {
    try {
      const data = req.body;
      const navbarItem = await NavbarItem.create(data);
      res.status(201).json(navbarItem);
    } catch (err) {
      res
        .status(500)
        .json({ message: "NavbarItem created failed", error: err });
    }
  },
);

router.post(
  "/:id",
  [
    body("title").exists().notEmpty().isString(),
    body("href").exists().notEmpty().isString(),
    body("order").exists().notEmpty().isInt(),
    body("dropdownItems").optional().isArray(),
    body("dropdownItems.*.title").exists().notEmpty().isString(),
    body("dropdownItems.*.href").exists().notEmpty().isString(),
  ],
  validate,
  async (req, res) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const navbarItem = await NavbarItem.findByIdAndUpdate(id, data, {
        new: true,
      });
      res.status(201).json(navbarItem);
    } catch (err) {
      res
        .status(500)
        .json({ message: "NavbarItem updated failed", error: err });
    }
  },
);

router.delete("/:id", async (req,res) => {
  try {
    const { id } = req.params;
    const navbar = await NavbarItem.findByIdAndDelete(id);
    res.status(201).json(navbar);
  } catch (err) {
    res.status(500).json({ message: "NavbarItem delete failed", error: err });
  }
});

export default router;
