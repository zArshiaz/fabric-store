import axios from "axios";

const token = process.env.PAYMENT_TOKEN;

export async function createPaymentGateway(amount, returnUrl, email) {
    const response = await axios.post(
        "https://api.payping.ir/new/v2/pay",
        {
            amount,
            returnUrl,
            payerIdentity: email,
            description: "Payment Order"
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }
    );

    return response.data; // {code}
}

export async function verifyPaymentGateway(refid, paymentCode, amount) {
    const response = await axios.post(
        "https://api.payping.ir/new/v2/pay/verify",
        {
            refid,
            paymentCode,
            amount
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }
    ).catch(error => {
        console.log(error);
    })

    return response.data; // شامل amount, payedDate, cardNumber و ...
}
