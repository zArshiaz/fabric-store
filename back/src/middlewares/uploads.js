import multer from "multer";
import path from "path";
import {existsSync,mkdirSync} from "fs"
import crypto from "crypto";

const dir='uploads'
if(!existsSync(dir)){
    mkdirSync(dir,{recursive:true})
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // .jpg
    const safeName = crypto.randomBytes(16).toString("hex");
    cb(null, safeName + ext);
  },
});

const fileFilter = (req, file, cb) => {
  const ok = ["image/jpeg", "image/png", "image/webp", "image/gif"].includes(file.mimetype);
  ok ? cb(null, true) : cb(new Error("Only image files are allowed"), false);
};

export const uploadImage = multer({
  storage,
  fileFilter,
}).array("images",4);
