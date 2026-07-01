import express from "express";
import { body, validationResult, matchedData } from "express-validator";
import Address from "../models/Address.js";
import { requireAuth } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post(
  "/",
  requireAuth(process.env),
  [
    body("title").trim().isString().optional(),
    body("province").trim().isString(),
    body("city").trim().isString(),
    body("address").trim().isString(),
    body("zipCode").trim().isNumeric(),
  ],
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty())
      return res.status(422).json({ error: result.array() });

    try {
      const data = matchedData(req, { locations: ["body"] });

      data.userId = req.user.id;
      const address = await Address.create(data);

      return res.status(201).json(address);
    } catch (e) {
      return res.status(400).json(e);
    }
  }
);
router.get("/", requireAuth(process.env), async (req, res) => {
  try {
    const address = await Address.find({ userId: req.user.id });

    return res.status(201).json(address);
  } catch (e) {
    return res.status(400).json(e);
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const addresses = await Address.deleteOne({ _id: req.params.id });
    return res.status(200).json(addresses);
  } catch (e) {
    return res.status(400).json(e);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const addresses = await Address.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    return res.status(200).json(addresses);
  } catch (e) { console.log(e)
    return res.status(400).json(e);
   
  }
});

export default router;
