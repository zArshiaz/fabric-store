import mongoose, { Schema, Types } from "mongoose";

const AddressSChema = new Schema(
  {
    title:{type:String,default:'عنوان پیش فرض'},
    userId: { type: Types.ObjectId, ref: "User", required: true },
    province: { type: String, required:true },
    city: { type: String,  required:true },
    zipCode: { type: Number, required:true },
    address: { type: String, required:true },
  },
  { timestamps: true }
);


export default mongoose.model('Address',AddressSChema);
