import Comment from "../models/comment.js";
import { Router } from "express";
import { body, matchedData } from "express-validator";
import { validate } from "../middlewares/validate.middleware.js";
import { getUser } from "../middlewares/comment.middleware.js";
import { requireAdmin, requireAuth } from "../middlewares/auth.middleware.js";
const router = new Router();

router.get('/today',requireAdmin(process.env),async(req,res)=>{
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);
     
    const comments=await Comment.find({createdAt:{
      $gte:startOfDay,
      $lte:endOfDay
    }})

    res.status(200).json(comments)
  } catch (error) {
        console.log(error)

    res.status(500).json({message:"Server Error"})
  }
})

router.delete("/:id", requireAdmin(process.env), async (req, res) => {
  try {
    const { id } = req.params;

    const comment = await Comment.findByIdAndDelete(id);
    res.status(200).json(comment);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/active/:id", requireAdmin(process.env), async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findByIdAndUpdate(
      id,
      { status: "active" },
      { new: true }
    );
    res.status(200).json(comment);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

router.post(
  "/answer/active/:id",
  requireAdmin(process.env),
  async (req, res) => {
    try {
      const { id } = req.params;
      const comment = await Comment.findOne({ "answer._id": id });

      if (!comment) {
        return res.status(404).json({ message: "Answer not found" });
      }

      comment.answer = comment.answer.map((a) => {
        if (String(a._id) === id) {
          return { ...a.toObject(), status: "active" };
        }
        return a;
      });

      await comment.save();

      res.status(200).json({ message: "ok" });
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  }
);
router.delete(
  "/answer/delete/:id",
  requireAdmin(process.env),
  async (req, res) => {
    try {
      const { id } = req.params; // این id مربوط به answer است
      const comment = await Comment.findOne({ "answer._id": id });

      if (!comment) {
        return res.status(404).json({ message: "Answer not found" });
      }

      comment.answer = comment.answer.filter((a) => String(a._id) !== id);

      await comment.save();

      res.status(200).json({ message: "Answer deleted", comment });
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  }
);

router.get("/answers/:id", requireAdmin(process.env), async (req, res) => {
  try {
    const { id } = req.params;

    const answers = await Comment.findById(id).select("answer");
    res.status(200).json(answers.answer);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

router.post("/:id/like", requireAuth(process.env), async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ error: "Comment not found" });

    const userId = req.user.id;
    console.log(req.user);
    if (!userId) throw new Error("authorization is requier");

    if (comment.likes.includes(userId)) {
      comment.likes.pull(userId);
    } else {
      comment.likes.push(userId);
    }

    await comment.save();
    res.json({
      likesCount: comment.likes.length,
      liked: comment.likes.includes(userId),
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

router.post(
  "/:id",
  getUser(process.env),
  [
    body("text")
      .isString()
      .trim()
      .isLength({ min: 4 })
      .withMessage("حداقل ۴ کاراکتر"),

    body("stars")
      .exists()
      .withMessage("stars الزامی است")
      .isFloat({ min: 0, max: 5 })
      .withMessage("بازه‌ی معتبر 0..5"),
  ],
  validate,
  async (req, res) => {
    try {
      const data = matchedData(req, { locations: ["body"] });
      data.product = req.params.id;
      data.user = req.user.id;
      if (req.user.role === "admin") {
        data.status = "active";
      }
      const comment = await Comment.create(data);
      res.status(201).json(comment);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  }
);

router.post(
  "/:id/answer",
  getUser(process.env),
  [
    body("text")
      .isString()
      .trim()
      .isLength({ min: 4 })
      .withMessage("حداقل ۴ کاراکتر"),
  ],
  validate,
  async (req, res, next) => {
    try {
      const data = matchedData(req, { locations: ["body"] });
      if (req.user.role === "admin") data.status = "active";
      const productId = req.params.id;
      data.user = req.user.id;
      console.log(data);
      const comment = await Comment.findByIdAndUpdate(
        productId,
        { $push: { answer: data } },
        { new: true }
      );
      res.status(201).json(comment);
    } catch (err) {
      next(err);
    }
  }
);
router.get("/all", requireAdmin(process.env), async (req, res) => {
  try {
    const currentUserId = req.user.id;
    const comments = await Comment.find()
      .sort({ createdAt: -1 })
      .lean({ virtuals: true });

    const result = comments.map((c) => {
      const likes = c.likes;
      const likesCount = likes.length;

      const likedByCurrentUser = currentUserId
        ? likes.some((u) => String(u) === currentUserId)
        : false;

      const hasDraftAnswer = c.answer?.some((a) => a.status === "draft");

      const { likes: _omit, ...rest } = c;

      return {
        ...rest,
        likesCount,
        likedByCurrentUser,
        hasDraftAnswer,
      };
    });

    res.status(200).json(result);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e.message });
  }
});
router.get("/:id", getUser(process.env), async (req, res) => {
  try {
    const productId = req.params.id;
    const currentUserId = req.user ? req.user.id : null;
    const comments = await Comment.find({ product: productId })
      .sort({ createdAt: -1 })
      .lean();

    const result = comments.map((c) => {
      const likes = c.likes;
      const likesCount = likes.length;

      const likedByCurrentUser = currentUserId
        ? likes.some((u) => String(u) === currentUserId)
        : false;

      const { likes: _omit, ...rest } = c;

      return {
        ...rest,
        likesCount,
        likedByCurrentUser,
      };
    });

    res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post(
  "/edit/:id",
  [
    body("text").isString(),
    body("stars").isFloat(),
    body("status").isIn(["active", "draft"]),
  ],
  validate,
  requireAdmin(process.env),
  async (req, res) => {
    try {
      const { id: commentID } = req.params;
      const comment = await Comment.findByIdAndUpdate(commentID, req.body);

      res.status(200).json(comment);
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e.message });
    }
  }
);

export default router;
