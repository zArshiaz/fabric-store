import mongoose, { Schema, Types } from "mongoose";


export const AddressSchema = new Schema(
  {
    title:{type:String,default:'عنوان پیش فرض'},
    userId: { type: Types.ObjectId, ref: "User", required: true },
    province: { type: String, required:true },
    city: { type: String,  required:true },
    zipCode: { type: Number, required:true },
    address: { type: String, required:true },
    phone: { type: String, required:true , default:"09382045830" },
  },
  { timestamps: true }
);


export default mongoose.model('Address',AddressSchema);
