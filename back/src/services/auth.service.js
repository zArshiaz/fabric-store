import {User} from "../models/User.js";
import {signJwt} from "../utils/jwt.js";

export async function registerUser({name, email, password, phone}, env) {
    const userCount = await User.estimatedDocumentCount();
    const exists = await User.findOne({email});
    if (exists) throw new Error("Email already registered");
    let user;
    if (userCount === 0) {
         user = await User.create({name, email, password, phone, role: 'admin'});
    } else {
         user = await User.create({name, email, password, phone});
    }

    const token = signJwt(
        {sub: user._id.toString(), email: user.email, role: user.role},
        env.JWT_SECRET,
        env.JWT_EXPIRES_IN,
    );

    return {user: sanitize(user), token};
}

export async function loginUser({email, password}, env) {
    const user = await User.findOne({email}).select("+password");
    if (!user) throw new Error("کاربر یا این ایمل وجود ندارد");
    const ok = await user.comparePassword(password);
    if (!ok) throw new Error("زمر عبور اشتباه ");

    const token = signJwt(
        {sub: user._id.toString(), email: user.email, role: user.role},
        env.JWT_SECRET,
        env.JWT_EXPIRES_IN,
    );

    return {user: sanitize(user), token};
}

export async function getMe(userId) {
    const user = await User.findByIdAndUpdate(userId, {
        lastAction: Date.now(),
    });
    if (!user) throw new Error("User not found");
    return sanitize(user);
}

export async function sendMassage(phone, message) {


    await fetch(
        `https://rest.payamak-panel.com/api/SendSMS/SendSMS`,
        {
            body: JSON.stringify({username: '9384122776', text: message,to:phone,from:'50002710022776',password:'6c07ba9a-3b23-4243-b239-029e4ff44f99'}),
            headers:{
                'content-type': 'application/json'
            },
            method: 'POST'
        }
    )
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
}

function sanitize(u) {
    return {
        id: u._id.toString(),
        name: u.name,
        email: u.email,
        role: u.role,
        phone: u.phone || 0,
    };
}
