import { model, Schema, Types } from "mongoose";
const answerSchema = new Schema(
  {
    user: { type: Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true },
    status: { type: String ,enom:['draft','active'] ,default:'draft'},
  },
  { timestamps: true }
);

const commentSchema = new Schema(
  {
    user: { type: Types.ObjectId, ref: "User", required: true },
    product: { type: Types.ObjectId, ref: "Product", required: true },
    text: { type: String, required: true },
    status: { type: String ,enom:['draft','active'] ,default:'draft'},
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


commentSchema.pre(/^find/, function (next) {
  this.populate({ path: "user", select: "name role email" }).populate({
    path: "answer.user",
    select: "name role email" ,
  }).populate({path:"product",select:"name"})
  next();
});

export default model("Comment", commentSchema);
