import mongoose from 'mongoose';

const settingSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    shoppingCost: { type: Number, required: true, default: 0 },
    currency: { type: String, default: "IRT" },
    updatedAt: { type: Date, default: Date.now }
},{ timestamps: true });

export default mongoose.model('Setting', settingSchema);