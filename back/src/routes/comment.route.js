import Comment from '../models/comment.js';
import { Router } from 'express';
import { body, matchedData } from 'express-validator';
import { validate } from '../middlewares/validate.middleware.js';
import { getUser } from '../middlewares/comment.middleware.js';
import { requireAuth } from '../middlewares/auth.middleware.js';
const router = new Router();

router.post("/:id/like",getUser(process.env), async (req, res) => {
  try {
   
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ error: "Comment not found" });

    const userId = req.user.id; // از توکن گرفته می‌شود

    // اگر قبلاً لایک کرده بود → آن‌لایک کن
    if (comment.likes.includes(userId)) {
      comment.likes.pull(userId);
    } else {
      comment.likes.push(userId);
    }

    await comment.save();
    res.json({ likesCount: comment.likes.length, liked: comment.likes.includes(userId) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/:id',getUser(process.env),
[
  body('text')
    .isString()
    .trim()
    .isLength({ min: 4 }).withMessage('حداقل ۴ کاراکتر'),

  body('stars')
    .exists().withMessage('stars الزامی است')
    .isFloat({ min: 0, max: 5 }).withMessage('بازه‌ی معتبر 0..5'),   

],
validate,
async (req, res, next) => {
  try {
    const data = matchedData(req, { locations: ['body'] });
    data.productId=req.params.id;
    data.user=req.user.id;
    const comment = await Comment.create(data);
    res.status(201).json(comment);
  } catch (err) {
    next(err);
  }
});

router.post('/:id/answer',getUser(process.env),
[
  body('text')
    .isString()
    .trim()
    .isLength({ min: 4 }).withMessage('حداقل ۴ کاراکتر'),
],
validate,
async (req, res, next) => {
  try {
    const data = matchedData(req, { locations: ['body'] });
    const productId=req.params.id;
    data.user=req.user.id;
    const comment = await Comment.findByIdAndUpdate(productId,
      {$push:{answer:data}},
      {new:true})
    res.status(201).json(comment);
  } catch (err) {
    next(err);
  }
});


router.get("/:id", getUser(process.env), async (req, res) => {
  try {
    console.log('w')
    const productId = req.params.id;
    const currentUserId = req.user ? req.user.id: null;
console.log(productId,'id')
    const comments = await Comment.find({ productId })
      .sort({ createdAt: -1 })
      .lean();

    const result = comments.map(c => {
      const likes =c.likes
      const likesCount = likes.length;

      const likedByCurrentUser = currentUserId
        ? likes.some(u => String(u) === currentUserId)
        : false;

     
      const { likes: _omit, ...rest } = c;

      return {
        ...rest,
        likesCount,
        likedByCurrentUser
      };
    });

    res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
export default router;
