import { Router } from "express";
import { body, matchedData, validationResult } from "express-validator";
import Product from "../models/Product.js";

const router = Router();

router.get("/all", async (req, res) => {
  const p = await Product.find().sort({ createdAt: -1 });
  res.status(200).json(p);
});

router.get("/:slug", async (req, res) => {
  const { slug } = req.params;

  const p = await Product.findOne({ slug });
  if (p) return res.status(200).json(p);

  const p1 = await Product.findById(slug);
  if(p1) return res.status(200).json(p1);

  res.status(400).json({error:'not definde'})


});

router.post(
  "/",
  [
    // پایه
    body("name")
      .trim()
      .isLength({ min: 2 })
      .withMessage("name حداقل 2 کاراکتر"),
    body("slug").optional().trim().isString().isLength({ min: 2 }),
    body("shortDescription").trim().isString(),
    body("description").trim().isString(),

    // قیمت و فروش
    body("pricePerMeter")
      .isFloat({ min: 0 })
      .withMessage("pricePerMeter باید عدد >=0 باشد"),
    body("pricePreMeterWhthDiscount")
      .optional()
      .isFloat({ min: 0 })
      .withMessage("pricePerMeter باید عدد >=0 باشد"),
    body("stockMeters").optional().isFloat({ min: 0 }),
    body("minOrderMeters").optional().isFloat({ min: 0 }),

    // دسته‌بندی/شناسه‌ها
    body("category").optional().isString(),
    body("brand").optional().isString(),
    body("tags").optional().isArray(),
    body("tags.*").optional().isString(),
    body("sku").optional().trim().isString(),

    // ظاهر و ترکیب
    body("colorName").optional().isString(),
    body("pattern").optional().isString(),

    body("composition").optional().isArray(),
    body("composition.*.fiber").optional().isString(),
    body("composition.*.percent").optional().isFloat({ min: 0, max: 100 }),

    body("widthCm").optional().isFloat({ min: 0 }),
    body("stretch.warpPct").optional().isFloat({ min: 0 }),
    body("stretch.weftPct").optional().isFloat({ min: 0 }),
    body("finish").optional().isArray(),
    body("finish.*").optional().isString(),

    // رسانه/نمایش
    body("images").optional().isArray(),
    body("images.*.url").optional().isString(),
    body("images.*.alt").optional().isString(),

    body("status").optional().isIn(["draft", "active", "archived"]),
    body("publishedAt").optional().isISO8601().toDate(),

    // SEO
    body("seo").optional().isObject(),
    body("seo.metaTitle").optional().isString().isLength({ max: 70 }),
    body("seo.metaDescription").optional().isString().isLength({ max: 160 }),

    // تخفیف درصدی
    body("discount").optional().isBoolean(),
  ],
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(422).json({ errors: result.array() });
    }

    try {
      const data = matchedData(req, {
        locations: ["body"],
        includeOptionals: true,
      });

      const product = await Product.create(data);

      return res.status(201).json(product);
    } catch (err) {
      // خطای یکتا (slug/sku)
      if (err && err.code === 11000) {
        const fields = Object.keys(err.keyPattern || err.keyValue || {});
        return res.status(409).json({ error: "Duplicate key", fields });
      }
      console.error(err);
      return res.status(500).json({ error: "Server error" });
    }
  }
);

export default router;
