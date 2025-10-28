import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import uploadRoutes from "./routes/upload.route.js";
import productRoutes from './routes/product.route.js';
import addressRoutes from './routes/address.route.js';
import commentRoutes from './routes/comment.route.js';
import categoryRoutes from './routes/category.route.js';
import navbarItemRoutes from './routes/navbarItem.route.js';

export function createApp() {
    const app = express();


    app.use(express.json());
    app.use(cookieParser());
    app.use(express.json());
    app.use(express.urlencoded({extended: true})); //

    app.use(
        cors({
            origin: process.env.CLIENT_ORIGIN,
            credentials: true
        })
    );

    app.use('/uploads', express.static('uploads'))

    app.use("/api/upload", uploadRoutes);
    app.use("/api/product", productRoutes);
    app.use("/api/address", addressRoutes);
    app.use("/api/comment", commentRoutes);
    app.use("/api/category", categoryRoutes);
    app.use("/api/navbar", navbarItemRoutes);


    app.get("/health", (_req, res) => res.json({ok: true}));

    app.use("/api/auth", authRoutes);

//error handler
    app.use((err, req, res, next) => {
        console.error(err.message)
        if (err) {
            res.status(500).json({error: err.message})
        }
    })

    // هندل 404
    app.use((_req, res) => res.status(404).json({message: "Not found"}));

    return app;
}
