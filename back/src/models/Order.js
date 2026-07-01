import mongoose, {Schema} from "mongoose";
import {AddressSchema} from "./Address.js";

const OrderItemSchema = new Schema({
    product: {type: Schema.Types.ObjectId, ref: "Product", required: true},
    name: {type: String, required: true},
    price: {type: Number, required: true},
    count: {type: Number, required: true, min: 0.4},
    image: {type: String},
    discountPrice: {type: Number, required: true},
}, {_id: false});

const OrderSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: "User", required: true},

    items: [OrderItemSchema],
    address: AddressSchema,

    addressCost: {type: Number, required: true, min: 0},
    productsCost: {type: Number, required: true, min: 0},
    totalPrice: {type: Number, required: true, min: 0},

    status: {
        type: String,
        enum: [
            'pending',
            'paid',
            'confirmed',
            'shipped',
            'delivered',
            'canceled',
            'expired'
        ],
        default: 'pending'
    },
    paymentInfo: {type: {transactionId: String}},
    paymentCode: {type: String},
    refid: {type: String},
    payedDate: {type: Date},
    expiresAt: {type: Date,default: () => new Date(Date.now() + 10 * 60 * 1000)},
    orderNumber: {type: String, unique: true}
}, {timestamps: true});

OrderSchema.pre("save", function (next) {
    this.totalPrice = this.addressCost + this.productsCost;
    // اگر شماره سفارش هنوز ست نشده، تولید کن
    if (!this.orderNumber) {
        this.orderNumber = `ORD-${Date.now().toString(25)}-${Math.floor(Math.random() * 1000)}`;
    }
    next();
});


export default mongoose.model("Order", OrderSchema);
