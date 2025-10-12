import { model, Schema, Types } from "mongoose";
const answerSchema = new Schema(
  {
    user: { type: Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

const commentSchema = new Schema(
  {
    user: { type: Types.ObjectId, ref: "User", required: true },
    productId: { type: Types.ObjectId, ref: "Product", required: true },
    text: { type: String, required: true },
    stars: { type: Number, required: true, max: 5 },
    likes: {
      type: [Types.ObjectId],
      ref: "User",
      default:[]
    },
    answer: [answerSchema],
  },
  { timestamps: true }
);

// Populate خودکار
commentSchema.pre(/^find/, function (next) {
  this.populate({ path: "user", select: "name" }).populate({
    path: "answer.user",
    select: "name",
  }); // ← کار درست
  next();
});

export default model("Comment", commentSchema);
