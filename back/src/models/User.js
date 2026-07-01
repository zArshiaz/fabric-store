import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, minlength: 2, maxlength: 50 },
    email: { type: String, required: true, unique: true, lowercase: true, index: true },
    password: { type: String, required: true, minlength: 8, select: false }, 
     role: {type: String,enum: ['user', 'admin'],  default: 'user'},
    phone:{type:String,default:''},
    lastAction:{type:Date,default:Date.now},
      resetCode: { type: String },
      resetCodeExpires: { type: Date },
      resetToken: { type: String },
      resetTokenExpires: { type: Date },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (candidate) {
  return bcrypt.compare(candidate, this.password);
};

export const User = mongoose.model("User", userSchema);
