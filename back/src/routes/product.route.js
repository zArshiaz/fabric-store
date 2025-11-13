import {Router} from "express";
import {body, matchedData, validationResult} from "express-validator";
import Product from "../models/Product.js";

const router = Router();

router.get("/", async (req, res) => {
    try {
        let {category, page = 1, limit = 10, search = ""} = req.query;

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
                    localField: "category",
                    foreignField: "_id",
                    as: "category"
                }
            },
            {$unwind: "$category"}, // هر دسته جداگانه بررسی شود
        ];

        // فیلتر بر اساس دسته‌بندی
        if (!category.includes("all")) {
            pipeline.push({
                $match: {"category.slug": {$in: category}}
            });
        }

        // فیلتر بر اساس سرچ (اگر وجود داشته باشد)
        if (Object.keys(matchStage).length > 0) {
            pipeline.push({$match: matchStage});
        }

        pipeline.push(
            {$sort: {createdAt: -1}},
            {$skip: (page - 1) * limit},
            {$limit: limit}
        );

        // گرفتن محصولات
        const products = await Product.aggregate(pipeline);


        // شمارش کل برای pagination
        const countPipeline = pipeline
            .filter(p => !("$skip" in p) && !("$limit" in p))
            .concat([{$count: "total"}]);

        const totalCount = await Product.aggregate(countPipeline);
        const total = totalCount[0]?.total || 0;

        res.status(200).json({
            products,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        res.status(500).json({message: "Server error"});
    }
});

router.get('/all', async (req, res) => {
    try {
        const products = await Product.find()
        res.status(200).json(products);
    }
    catch(error) {
        res.status(500).json({message: "Server error"});
    }
})

router.get("/last", async (req, res) => {
    try {
        const products = await Product.aggregate([
            {
            $lookup: {
                from: "categories",
                localField: 'category',
                foreignField: '_id',
                as: "category"
            },
        },
            {$sort: {createdAt: -1}},
            {$limit: 10}
            ]
        )
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({message: error.message});
    }

})


router.get("/:slug", async (req, res) => {
    try {
        const {slug} = req.params;
        let p = await Product.findOne({slug});

        if (!p) p = await Product.findById(slug)

        res.status(200).json(p);

    } catch (error) {
        res.status(400).json({message: error.message});
    }

});

router.post(
    "/",
    [
        body("name")
            .trim()
            .isLength({min: 2})
            .withMessage("name حداقل 2 کاراکتر"),
        body("slug").optional().trim().isString().isLength({min: 2}),
        body("shortDescription").trim().isString(),
        body("description").trim().isString(),

        body("pricePerMeter")
            .isFloat({min: 0})
            .withMessage("pricePerMeter باید عدد >=0 باشد"),
        body("pricePreMeterWhthDiscount")
            .optional()
            .isFloat({min: 0})
            .withMessage("pricePerMeter باید عدد >=0 باشد"),
        body("stockMeters").optional().isFloat({min: 0}),
        body("minOrderMeters").optional().isFloat({min: 0}),

        body("category")
            .exists().withMessage("category is required")
            .isArray({min: 1}).withMessage("category must be a non-empty array"),
        body("category.*")
            .isMongoId().withMessage("each category must be a valid MongoId"),
        body("brand").optional().isString(),
        body("tags").optional().isArray(),
        body("tags.*").optional().isString(),
        body("sku").optional().trim().isString(),

        body("colorName").optional().isString(),
        body("pattern").optional().isString(),

        body("composition").optional().isArray(),
        body("composition.*.fiber").optional().isString(),
        body("composition.*.percent").optional().isFloat({min: 0, max: 100}),

        body("widthCm").optional().isFloat({min: 0}),
        body("stretch.warpPct").optional().isFloat({min: 0}),
        body("stretch.weftPct").optional().isFloat({min: 0}),
        body("finish").optional().isArray(),
        body("finish.*").optional().isString(),

        body("images").optional().isArray(),
        body("images.*.url").optional().isString(),
        body("images.*.alt").optional().isString(),

        body("status").optional().isIn(["draft", "active", "archived"]),
        body("publishedAt").optional().isISO8601().toDate(),

        body("seo").optional().isObject(),
        body("seo.metaTitle").optional().isString().isLength({max: 70}),
        body("seo.metaDescription").optional().isString().isLength({max: 160}),

        body("discount").optional().isBoolean(),
    ],
    async (req, res) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(422).json({errors: result.array()});
        }

        try {
            const data = matchedData(req, {
                locations: ["body"],
                includeOptionals: true,
            });

            const product = await Product.create(data);

            return res.status(201).json(product);
        } catch (err) {
            if (err && err.code === 11000) {
                const fields = Object.keys(err.keyPattern || err.keyValue || {});
                return res.status(409).json({error: "Duplicate key", fields});
            }
            console.error(err);
            return res.status(500).json({error: "Server error"});
        }
    }
);

export default router;
