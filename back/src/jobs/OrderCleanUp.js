import cron from "node-cron";
import Order from "../models/Order.js";
import Product from "../models/Product.js";

cron.schedule("* * * * *", async () => {

    const now = new Date();

    const expiredOrders = await Order.find({
        status: "pending",
        expiresAt: { $lt: now }
    });

    for (const order of expiredOrders) {

        for (const item of order.items) {
            const product = await Product.findById(item.product);

            if (product) {
                product.stockMeters += item.count;
                await product.save();
            }
        }

        order.status = "expired";
        await order.save();
    }

});