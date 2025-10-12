import path from "path";
import fs from "fs/promises";

const UPLOAD_DIR = path.resolve("uploads");

// url یا filename → filename تمیز
export function toSafeFilename(input) {
  if (!input) return null;
  try {
    let filename = input;
    // اگر ورودی URL بود، فقط بخش آخر مسیر را بگیر
    try {
      const u = new URL(input);
      filename = path.basename(u.pathname); // /uploads/xxx.jpg → xxx.jpg
    } catch (_) {
      // input URL نبود → همان filename است
      filename = path.basename(input);
    }
    return filename;
  } catch {
    return null;
  }
}

// مسیر فایل امن داخل uploads
export function toSafeUploadPath(filename) {
  const abs = path.resolve(UPLOAD_DIR, filename);
  // باید با پوشه‌ی uploads شروع شود (ضد traversal)
  if (!abs.startsWith(UPLOAD_DIR + path.sep)) {
    throw new Error("Invalid path");
  }
  return abs;
}

// حذف فایل؛ اگر نبود، false برمی‌گرداند
export async function deleteIfExists(absPath) {
  try {
    await fs.unlink(absPath);
    return true;
  } catch (e) {
    if (e.code === "ENOENT") return false;
    throw e;
  }
}
