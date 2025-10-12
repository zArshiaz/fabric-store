import { validationResult } from "express-validator";

export function validate(req, res, next) {
  const result = validationResult(req);
  console.log(result)
  if (!result.isEmpty) {
    return res.status(422).json({ errors: result.array() });
  }
  next();
}
