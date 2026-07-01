import { Router } from "express";
import fs from "fs";
import { body, matchedData, validationResult } from "express-validator";
import Product from "../models/Product.js";
import { requireAdmin } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { uploadImage } from "../middlewares/uploads.js";
import { parseJsonFields } from "../middlewares/parse-json-fields.js";
import { getAddress } from "../utils/get-addres-file.js";
import { getUser } from "../middlewares/comment.middleware.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    let { category, page = 1, limit = 10, search = "" } = req.query;

    if (typeof category === "string") category = [category];
    if (!category) category = ["all"];

    page = parseInt(page);
    limit = parseInt(limit);

    const matchStage = {};
    if (search.trim() !== "") {
      matchStage["$or"] = [
        { name: { $regex: search, $options: "i" } },
        { shortDescription: { $regex: search, $options: "i" } },
      ];
    }


    const pipeline = [
      {
        $lookup: {
          from: "categories",
          localField: "categories",
          foreignField: "_id",
          as: "categories",
        }
      }
    ];

    if (!category.includes("all")) {
      pipeline.push({
        $match: {
          categories: { $elemMatch: { slug: { $in: category } } },
        },
      });
    }

    if (Object.keys(matchStage).length > 0) {
      pipeline.push({ $match: matchStage });
    }

    pipeline.push(
        { $sort: { createdAt: -1 } },
        { $skip: (page - 1) * limit },
        { $limit: limit }
    );

    const products = await Product.aggregate(pipeline);

    const withVirtuals = products.map((p) => {
      const doc = new Product(p);
      return doc.toObject({ virtuals: true });
    });

    // pipeline شمارش
    const countPipeline = [
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      },
    ];

    if (!category.includes("all")) {
      countPipeline.push({
        $match: {
          category: { $elemMatch: { slug: { $in: category } } },
        },
      });
    }

    if (Object.keys(matchStage).length > 0) {
      countPipeline.push({ $match: matchStage });
    }

    countPipeline.push({ $count: "total" });

    const totalCount = await Product.aggregate(countPipeline);
    const total = totalCount[0]?.total || 0;

    res.status(200).json({
      products: withVirtuals,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/all", async (req, res) => {
  try {
    const products = await Product.find().populate('categories');
    res.status(200).json(products);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/last", async (req, res) => {
  try {
    const products = await Product.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "categories",
          foreignField: "_id",
          as: "categories",
        },
      },
      { $sort: { createdAt: -1 } },
      { $limit: 10 },
    ]);
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.get("/count", async (req, res) => {
  try {
    const product = await Product.estimatedDocumentCount();

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
});
router.get("/:slug", getUser(process.env), async (req, res) => {
  try {
    const { slug } = req.params;
    const userId = req.user?.id || null;

    const product =
      (await Product.findOne({ slug })) ||
      (await Product.findById(slug));

    if (!product)
      return res.status(404).json({ message: "Product not found" });

    await product.populate("categories");
    await product.populate("comments");



    const processedComments = product.comments.map((c) => {
      const obj = c.toObject();

      obj.answer = obj.answer?.filter((a) => a.status === "active") || [];

      const likesCount = obj.likes?.length || 0;
      const likedByCurrentUser = userId
        ? obj.likes?.some((u) => String(u) === userId)
        : false;

      delete obj.likes;

      return {
        ...obj,
        likesCount,
        likedByCurrentUser,
      };
    });

    const response = {
      ...product.toObject(),
      comments: processedComments,
    };

    res.status(200).json(response);
  } catch (error) {
    console.log(error);

    res.status(400).json({ message: error.message });
  }
});

router.delete("/delete/:id", requireAdmin(process.env), async (req, res) => {
  try {
    const { id } = req.params;
    const p1 = await Product.findById(id);
    const { images } = p1;

    if (images.length) {
      images.forEach((img) => {
        let address = getAddress(img.url);
        fs.unlink(address, (err) => {
          if (err) console.log("delet file", err.message);
        });
      });
    }
    const p2 = await Product.findByIdAndDelete(id);
    res.status(200).json(p2);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.post(
  "/add",
  requireAdmin(process.env),
  uploadImage,
  parseJsonFields(["seo", "discount"]),
  [
    body("name")
      .trim()
      .isLength({ min: 2 })
      .withMessage("name حداقل 2 کاراکتر"),
    body("slug").optional().trim().isString().isLength({ min: 2 }),
    body("shortDescription").trim().isString(),
    body("description").trim().isString(),
    body("pricePerMeter")
      .isFloat({ min: 0 })
      .withMessage("pricePerMeter باید عدد >=0 باشد"),
    body("stockMeters").optional().isFloat({ min: 0 }),
    body("categories")
      .exists()
      .isArray({ min: 1 })
      .withMessage("categories باید آرایه غیرخالی باشد"),
    body("categories.*")
      .isMongoId()
      .withMessage("هر category باید MongoId معتبر باشد"),
    body("brand").optional().isString(),
    body("colorName").optional().isString(),
    body("pattern").optional().isString(),
    body("composition").optional().isString(),
    body("widthCm").optional().isFloat({ min: 0 }),
    body("finish").optional().isArray(),
    body("finish.*").optional().isString(),
    body("status").optional().isIn(["draft", "active", "archived"]),
    body("seo").optional().isObject(),
    body("seo.metaTitle").optional().isString().isLength({ max: 70 }),
    body("seo.metaDescription").optional().isString().isLength({ max: 160 }),
    body("discount").optional().isObject(),
    body("discount.active").optional().isBoolean(),
    body("discount.percent").optional().isNumeric({ min: 0, max: 100 }),
  ],
  validate,
  async (req, res) => {
    const files = Object.values(req.files || {}).flat();

    try {
      const data = matchedData(req, {
        locations: ["body"],
        includeOptionals: true,
      });


      console.log("data", req.protocol);
      if (files.length > 0) {
        data.images = files.map((file) => ({
          url: `${req.protocol}://${req.get("host")}/${file.path.replace(/\\/g, "/")}`,
          alt: data.name || "Product image",
        }));
      }

      const product = await Product.create(data);
      return res
        .status(201)
        .json({ message: "محصول با موفقیت اضافه شد", product });
    } catch (err) {
      if (files.length > 0) {
        files.forEach((file) => {
          fs.unlink(file.path, (e) => {
            if (e) console.error(e);
          });
        });
      }

      if (err && err.code === 11000) {
        const fields = Object.keys(err.keyPattern || {});
        return res.status(409).json({ error: "Duplicate key", fields });
      }
      return res.status(500).json({ error: "Server error" });
    }
  }
);

router.post(
  "/edit/:id",
  requireAdmin(process.env),
  uploadImage,
  parseJsonFields(["seo", "discount"]),
  [
    body("name")
      .trim()
      .isLength({ min: 2 })
      .withMessage("name حداقل 2 کاراکتر"),
    body("slug").optional().trim().isString().isLength({ min: 2 }),
    body("shortDescription").trim().isString(),
    body("description").trim().isString(),
    body("pricePerMeter")
      .isFloat({ min: 0 })
      .withMessage("pricePerMeter باید عدد >=0 باشد"),
    body("stockMeters").optional().isFloat({ min: 0 }),
    body("categories")
      .exists()
      .isArray({ min: 1 })
      .withMessage("categories باید آرایه غیرخالی باشد"),
    body("categories.*")
      .isMongoId()
      .withMessage("هر category باید MongoId معتبر باشد"),
    body("brand").optional().isString(),
    body("colorName").optional().isString(),
    body("pattern").optional().isString(),
    body("composition").optional().isString(),
    body("widthCm").optional().isFloat({ min: 0 }),
    body("finish").optional().isArray(),
    body("finish.*").optional().isString(),
    body("status").optional().isIn(["draft", "active", "archived"]),
    body("seo").optional().isObject(),
    body("seo.metaTitle").optional().isString().isLength({ max: 70 }),
    body("seo.metaDescription").optional().isString().isLength({ max: 160 }),
    body("discount").optional().isObject(),
    body("discount.active").optional().isBoolean(),
    body("discount.percent").optional().isNumeric({ min: 0, max: 100 }),
    body("prevImages").optional().isArray(),
  ],
  validate,
  async (req, res) => {
    const files = Object.values(req.files || {}).flat();
    const { id } = req.params;

    try {
      const data = matchedData(req, {
        locations: ["body"],
        includeOptionals: true,
      });
      if (files.length > 0) {
        if (data.prevImages?.length) {
          data.prevImages.forEach((img) => {
            let address = getAddress(JSON.parse(img).url);
            fs.unlink(address, (err) => {
              if (err) console.log("delet file", err.message);
            });
          });
        }
        console.log('pp',req.protocol);

        data.images = files.map((file) => ({
          url: `${req.protocol}://${req.get("host")}/${file.path.replace(/\\/g, "/")}`,

          alt: data.name || "Product image",
        }));
      } else {
        data.images = data.prevImages.map((img) => JSON.parse(img));
      }
      let { prewImage, ...editedProduct } = data;

      const product = await Product.findByIdAndUpdate(id, editedProduct);
      return res
        .status(201)
        .json({ message: "محصول با موفقیت تغییر یافت", product });
    } catch (err) {
      if (files.length > 0) {
        files.forEach((file) => {
          fs.unlink(file.path, (e) => {
            if (e) console.error(e);
          });
        });
      }
      if (err && err.code === 11000) {
        const fields = Object.keys(err.keyPattern || {});
        return res.status(409).json({ error: "Duplicate key", fields });
      }

      return res.status(500).json({ error: "Server error" });
    }
  }
);

export default router;
