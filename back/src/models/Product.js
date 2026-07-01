import mongoose, { Schema } from "mongoose";

const ImageSchema = new Schema({
  url: { type: String, required: true },
  alt: { type: String }
}, { _id: false });

const DiscountSchema = new Schema({
  active:    { type: Boolean, default: false },
  percent:   { type: Number,default:1, min: 0, max: 100 },
}, { _id: false });

export const ProductSchema = new Schema({
  name:        { type: String, required: true, trim: true },
  slug:        { type: String, required: true, unique: true, index: true },
  shortDescription:{type:String},
  description: { type: String },

  categories: [{ type: Schema.Types.ObjectId, ref:"Category", index: true }],
  brand:    { type: String },

  colorName:   { type: String },
  pattern:     { type: String },
  composition: {type:String},
  widthCm:     { type: Number, min: 0 },
  finish:      [{ type: String }],

  pricePerMeter: { type: Number, min: 0, required: true },
  stockMeters:   { type: Number, min: 0, default: 0 },

  images: [ImageSchema],

  status:      { type: String, enum: ['draft', 'active', 'archived'], default: 'active', index: true },
  publishedAt: { type: Date,default:Date.now },

  seo: {
    metaTitle:       { type: String },
    metaDescription: { type: String }
  },

  discount: DiscountSchema

}, { timestamps: true,toJSON:{virtuals:true},toObject:{virtuals:true} });

ProductSchema.virtual('price').get(function() {
  const d = this.discount;
  if (d && d.active) {
    if (d.percent) return this.pricePerMeter * (1 - d.percent / 100);
  }
  return this.pricePerMeter;
});
ProductSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "product",
  match:{
    status:'active'
  },
  options: {
    sort:{createdAt:-1}
  }
});

ProductSchema.virtual("ratingCount").get(function () {
  if (!this.comments) return 0;
  return this.comments.length;
});

ProductSchema.virtual("ratingAvg").get(function () {
  if (!this.comments || this.comments.length === 0) return 0;

  const sum = this.comments.reduce((s, c) => s + c.stars, 0);
  return Math.round((sum / this.comments.length) * 10) / 10;
});


ProductSchema.index(
  { name: 'text', tags: 'text', shortDescription: 'text' },
  { name: 'text_search' }
);

export default mongoose.model('Product', ProductSchema);
