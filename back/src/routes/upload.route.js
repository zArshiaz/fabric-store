import { Router } from "express";
import { uploadImage } from "../middlewares/uploads.js";
import {toSafeFilename,toSafeUploadPath,deleteIfExists} from '../utils/file-utils.js'
const router = Router();

router.post("/images", (req, res, next) => {
  uploadImage(req, res, (err) => {
    if (err) return next(err);
    if (!req.files || req.files.length === 0)
      return res.status(400).json({ error: "No files uploaded" });

    console.log(req.files);
    console.log(req.body.alt); // مثلا ["alt1", "alt2", ...]

    const images = req.files.map((f, i) => ({
      url: `${req.protocol}://${req.get("host")}/uploads/${f.filename}`,
      alt: Array.isArray(req.body.alt) ? req.body.alt[i]?req.body.alt[i]:'null' : req.body.alt
    }));

    return res.json({ images });
  });
});


router.delete("/images", async (req, res, next) => {
  try {
    const files = req.body?.files;
    if (!Array.isArray(files) || files.length === 0) {
      return res.status(400).json({ error: "files array required" });
    }

    // محدودیت منطقی (مثلاً حداکثر 20 مورد در هر درخواست)
    const MAX = 20;
    const uniqueInputs = [...new Set(files)].slice(0, MAX);

    const tasks = uniqueInputs.map(async (input) => {
      try {
        const filename = toSafeFilename(input);
        if (!filename) {
          return { input, status: "bad_request", error: "Invalid input" };
        }

        let absPath;
        try {
          absPath = toSafeUploadPath(filename);
        } catch {
          return { input, filename, status: "bad_request", error: "Invalid path" };
        }

        const removed = await deleteIfExists(absPath);
        return { input, filename, status: removed ? "deleted" : "not_found" };
      } catch (e) {
        return { input, status: "error", error: e.message };
      }
    });

    const results = await Promise.all(tasks);

    const summary = results.reduce(
      (acc, r) => {
        acc[r.status] = (acc[r.status] || 0) + 1;
        return acc;
      },
      {}
    );

    return res.json({ summary, results });
  } catch (err) {
    next(err);
  }
});


export default router;
