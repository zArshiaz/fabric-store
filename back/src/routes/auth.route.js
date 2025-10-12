import { Router } from "express";
import { body } from "express-validator";
import { AuthController } from "../controllers/auth.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";

const router = Router();

// POST /api/auth/register
router.post(
  "/register",
  [
    body("name").isString().isLength({ min: 2 }),
    body("email").isEmail(),
    body("password").isString().isLength({ min: 8 }),
  ],
  validate,
  AuthController.register
);

// POST /api/auth/login
router.post(
  "/login",
  [
    body("email").isString(),
    body("password").isString().isLength({ min: 8 }),
  ],
  validate,
  AuthController.login
);

// GET /api/auth/me
router.get("/me", requireAuth(process.env), AuthController.me);

// POST /api/auth/logout
router.post("/logout", AuthController.logout);

router.post("/check-email",AuthController.checkEmail);
router.put('/:id',AuthController.editUser)
export default router;
