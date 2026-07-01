import Router from "express";
import {PaymentController} from "../controllers/payment.controller.js";
import {requireAuth} from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/create", requireAuth(process.env), PaymentController.createPayment);

router.post("/callback", PaymentController.paymentCallback);

export default router;