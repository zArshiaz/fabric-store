import mongoose, { Schema } from "mongoose";

/* -------------------- زیر‌اسکیماها -------------------- */
const CompositionSchema = new Schema({
  fiber:   { type: String, required: true },
  percent: { type: Number, min: 0, max: 100 }
}, { _id: false });

const ImageSchema = new Schema({
  url: { type: String, required: true },
  alt: { type: String }
}, { _id: false });



/* -------------------- اسکیما اصلی محصول -------------------- */
const ProductSchema = new Schema({
  // پایه
  name:        { type: String, required: true, trim: true },
  slug:        { type: String, required: true, unique: true, index: true },
  shortDescription:{type:String},
  description: { type: String },

  // دسته‌بندی/شناسه‌ها
  category: { type: String, index: true },
  brand:    { type: String },
  tags:     [{ type: String, index: true }],
  sku:      { type: String, unique: true, sparse: true, trim: true },

  // ظاهر و ترکیب
  colorName:   { type: String },
  pattern:     { type: String }, // ساده، گلدار، چهارخانه...
  composition: [CompositionSchema],
  widthCm:     { type: Number, min: 0 },
  finish: [{ type: String }],

  // قیمت و فروش «متری»
  pricePerMeter:     { type: Number, min: 0, required: true },
  pricePreMeterWhithDisconunt: { type: Number, min: 0 },
  stockMeters:       { type: Number, min: 0, default: 0 }, // موجودی به متر
  minOrderMeters:    { type: Number, default: 0.5 },

  // رسانه/نمایش
  images:      [ImageSchema],
  status:      { type: String, enum: ['draft', 'active', 'archived'], default: 'active', index: true },
  publishedAt: { type: Date },

  // SEO
  seo: {
    metaTitle:       { type: String },
    metaDescription: { type: String }
  },

  // آمار
  ratingAvg:   { type: Number, min: 0, max: 5, default: 0 },
  ratingCount: { type: Number, min: 0, default: 0 },

  // فقط یک تخفیف درصدی
  discount:{type :Boolean,default:false}
}, { timestamps: true });

/* -------------------- ایندکس‌ها -------------------- */
// جست‌وجوی متن
ProductSchema.index(
  { name: 'text', tags: 'text', shortDescription: 'text' },
  { name: 'text_search' }
);

/* -------------------- اسلاگ خودکار -------------------- */
ProductSchema.pre('validate', function(next) {
  if (!this.slug && this.name) {
    this.slug = this.name
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-') // فاصله → خط تیره
      // فقط حروف/ارقام لاتین + حروف فارسی متداول + خط تیره
      .replace(/[^a-z0-9\-ءاآأإئؤ‌بپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی]/g, '')
      .replace(/\-+/g, '-');
  }
  next();
});


export default mongoose.model('Product', ProductSchema);
