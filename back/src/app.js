import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { ENV } from "./config/env.js";
import authRoutes from "./routes/auth.route.js";
import uploadRoutes from "./routes/upload.route.js";
import productRoutes from './routes/product.route.js';
import addressRoutes from './routes/address.route.js';
import commentRoutes from './routes/comment.route.js';
import categoryRoutes from './routes/category.route.js';
import navbarItemRoutes from './routes/navbarItem.route.js';
import orderRoutes from './routes/order.route.js';
import userRoutes from './routes/user.route.js'
import paymentRoutes from './routes/payment.route.js'
import settingRoutes from './routes/setting.route.js'
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.join(__dirname, "..");
export function createApp() {
    const app = express();

    app.use(express.json());
    app.use(cookieParser());
    app.use(express.urlencoded({extended: true}));

    app.use(cors({
        origin: function (origin, callback) {
            if (!origin) {
                return callback(null, false); // بلاک کن مگر عمداً بخوای باز باشه
            }

            if (ENV.CLIENT_ORIGINS.includes(origin)) {
                return callback(null, true);
            }

            return callback(new Error("Not allowed by CORS"));
        },
        credentials: true
    }));

    if (process.env.RUN_MODE!=='host'){
        app.use(
            "/uploads",
            express.static(path.join(rootDir, "uploads"))
        );
    }

    console.log( path.join(rootDir, "uploads"))
    app.use("/api/upload", uploadRoutes);
    app.use("/api/product", productRoutes);
    app.use("/api/address", addressRoutes);
    app.use("/api/comment", commentRoutes);
    app.use("/api/category", categoryRoutes);
    app.use("/api/navbar", navbarItemRoutes);
    app.use("/api/order", orderRoutes);
    app.use("/api/user", userRoutes);
    app.use("/api/setting",settingRoutes );
    app.use("/api/payment",paymentRoutes);
    app.use("/api/auth", authRoutes);

    app.get("/health", (_req, res) => res.json({ok: true}));

    app.use((err, req, res, next) => {
        console.error(err.message)
        if (err) {
            res.status(500).json({error: err.message})
        }
    })

    app.use((_req, res) => res.status(404).json({message: "Not found"}));

    return app;
}
