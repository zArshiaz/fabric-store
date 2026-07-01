import Order from "../models/Order.js";
import { createPaymentGateway, verifyPaymentGateway } from "../services/paymentService.js";
import Address from "../models/Address.js";
import Product from "../models/Product.js";
import Setting from "../models/Setting.js";

export const PaymentController = {

    createPayment: async (req, res) => {
        try {
            const { items, addressId } = req.body;
            const user = req.user;
            let {shoppingCost}=await Setting.findById('shopping')
            const address = await Address.findById(addressId);

            if (!address)
                return res.status(404).json({ message: "آدرس پیدا نشد" });

            const grouped = items.reduce((acc, item) => {
                acc[item._id] = (acc[item._id] || 0) + item.meters;
                return acc;
            }, {});

            const products = await Product.find({
                _id: { $in: Object.keys(grouped) }
            });

            if (products.length !== Object.keys(grouped).length)
                return res.status(404).json({ message: "محصول یافت نشد" });

            for (const product of products) {
                const need = grouped[product._id];
                if (product.stockMeters < need) {
                    return res
                        .status(400)
                        .json({ message: `موجودی ${product.name} کافی نیست` });
                }
            }

            let productsCost = 0;
            const orderItems = items.map((item) => {
                const product = products.find(p => p._id.equals(item._id));
                productsCost += Math.round(product.price * item.meters);

                return {
                    product: product._id,
                    name: product.name,
                    price: product.price,
                    count: item.meters,
                    image: product.images?.[0]?.url || null,
                    discountPrice: (product.pricePerMeter || product.price) - product.price
                };
            });

            const order = new Order({
                user: user.id,
                items: orderItems,
                address,
                addressCost:shoppingCost,
                productsCost,
                totalPrice: productsCost + shoppingCost,
            });
            // await order.save();
            for (let item of order.items) {
                await Product.findByIdAndUpdate(item.product, {
                    $inc: { stockMeters: -item.count }
                });
            }
            const callbackUrl = process.env.RUN_MODE==='host'?`https://nakhshin.shop/api/payment/callback?orderId=${order._id}`:`http://localhost:4000/api/payment/callback?orderId=${order._id}`
            const payment = await createPaymentGateway(order.totalPrice, callbackUrl, user.email);
            order.paymentCode=payment.code
            await order.save();
            res.json({
                paymentUrl: `https://api.payping.ir/new/v2/pay/gotoipg/${payment.code}`
            });

        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'خطا در سرور' });
        }
    },

    // callback and verify
    paymentCallback: async (req, res) => {
        try {
            const { refid, code } = req.body;
            console.log(req.body)
            const { orderId } = req.query;

            if (!refid || !code)
                return res.redirect("https://nakhshin.shop/payment-failed");

            const order = await Order.findById(orderId);
            if (!order)
                return res.redirect("https://nakhshin.shop/payment-failed");


            if (order.status === "paid")
                return res.redirect(`https://nakhshin.shop/payment-success?redirect=/ord/${order.id}`);

            const verify = await verifyPaymentGateway(refid, code, order.totalPrice);

            if (!verify || verify.amount !== order.totalPrice)
                return res.redirect("https://nakhshin.shop/payment-failed");


            order.status = "paid";
            order.refid = refid;
            order.payedDate = verify.payedDate;
            await order.save();

            return res.redirect(`https://nakhshin.shop/payment-success?redirect=/ord/${order.id}`);

        } catch (err) {
            console.log(err);
            return res.redirect("https://nakhshin.shop/payment-failed");
        }
    }

};
