import mongoose, { Schema } from "mongoose";

const CategorySchema = new Schema({
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    description: { type: String },
}, { timestamps: true });

CategorySchema.pre('validate', function(next) {
    if (!this.slug && this.name) {
        this.slug = this.name.trim().toLowerCase().replace(/\s+/g, '-');
    }
    next();
});

export default mongoose.model('Category', CategorySchema);
