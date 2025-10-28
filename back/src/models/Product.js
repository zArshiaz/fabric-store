import mongoose, { Schema } from "mongoose";

const CompositionSchema = new Schema({
  fiber:   { type: String, required: true },
  percent: { type: Number, min: 0, max: 100 }
}, { _id: false });

const ImageSchema = new Schema({
  url: { type: String, required: true },
  alt: { type: String }
}, { _id: false });



const ProductSchema = new Schema({
  name:        { type: String, required: true, trim: true },
  slug:        { type: String, required: true, unique: true, index: true },
  shortDescription:{type:String},
  description: { type: String },

  category: [{ type: Schema.Types.ObjectId,ref:"Category", index: true }],
  brand:    { type: String },
  tags:     [{ type: String, index: true }],
  sku:      { type: String, unique: true, sparse: true, trim: true },

  colorName:   { type: String },
  pattern:     { type: String },
  composition: [CompositionSchema],
  widthCm:     { type: Number, min: 0 },
  finish: [{ type: String }],

  pricePerMeter:     { type: Number, min: 0, required: true },
  pricePreMeterWhithDisconunt: { type: Number, min: 0 },
  stockMeters:       { type: Number, min: 0, default: 0 },
  minOrderMeters:    { type: Number, default: 0.5 },

  images:      [ImageSchema],
  status:      { type: String, enum: ['draft', 'active', 'archived'], default: 'active', index: true },
  publishedAt: { type: Date },

  seo: {
    metaTitle:       { type: String },
    metaDescription: { type: String }
  },

  ratingAvg:   { type: Number, min: 0, max: 5, default: 0 },
  ratingCount: { type: Number, min: 0, default: 0 },

  discount:{type :Boolean,default:false}
}, { timestamps: true });

ProductSchema.index(
  { name: 'text', tags: 'text', shortDescription: 'text' },
  { name: 'text_search' }
);

ProductSchema.pre('validate', function(next) {
  if (!this.slug && this.name) {
    this.slug = this.name
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9\-ءاآأإئؤ‌بپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی]/g, '')
      .replace(/-+/g, '-');
  }
  next();
});
//
// ProductSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: "category.*",
//     select: "name slug",
//   })
//   next();
// });

export default mongoose.model('Product', ProductSchema);
