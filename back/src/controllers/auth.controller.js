import {loginUser, registerUser, getMe, sendMassage} from "../services/auth.service.js";
import {User} from "../models/User.js";
import crypto from "crypto";



function setAuthCookie(res, token, env) {
    let maxAge=Number(process.env.JWT_EXPIRES_IN) || 7
    if(process.env.RUN_MODE ==='host'){
        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "none",
            secure:  true,
            domain:'nakhshin.shop',
            maxAge: maxAge * 24 * 60 * 60 * 1000, // 7 روز
        });
    }else {
        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "lax",
            secure:  false,
            maxAge: maxAge * 24 * 60 * 60 * 1000, // 7 روز
        });
    }
}

export const AuthController = {
    register: async (req, res) => {
        try {

            const {user, token} = await registerUser(req.body, process.env);

            setAuthCookie(res, token, process.env);
            res.status(201).json({user});
        } catch (e) {
            console.log(e);
            res.status(401).json({message: e});
        }
    },

    login: async (req, res) => {
        try {
            const {user, token} = await loginUser(req.body, process.env);
            setAuthCookie(res, token, process.env);
            res.json({user});
        } catch (e) {
            res.status(400).json({message: e.message});
        }
    },
    adLogin: async (req, res) => {
        try {
            const {user, token} = await loginUser(req.body, process.env);
            if (user.role !== 'admin') throw new Error("User is not admin");
            setAuthCookie(res, token, process.env);
            res.json({user});
        } catch (e) {
            res.status(400).json({message: e.message});
        }
    },
    requestReset: async (req, res) => {
        const { email } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "کاربر یافت نشد" });

        // generate OTP length 5
        const otp = String(Math.floor(10000 + Math.random() * 90000));

        user.resetCode = otp;
        user.resetCodeExpires =new Date( Date.now() + 3.5 * 60 * 1000) // 3.5 min

        await user.save();

        console.log("OTP:", otp);
        let message='کد تایید سایت نخشین : '+otp;
        await sendMassage(user.phone,message);

        return res.status(201).json({ message: "کد یکبار مصرف برای شماره شما ارسال شد." });
    },
    verifyReset: async (req, res) => {
        const { email, code } = req.body;

        const user = await User.findOne({ email });

        if (!user) return res.status(404).json({ message: "کاربری با این ایمیل وجود ندارد." });

        if (!user.resetCode || !user.resetCodeExpires)
            return res.status(400).json({ message: "کد منقضی شده است." });

        if (user.resetCode !== code)
            return res.status(400).json({ message: "کد نامعتبر." });

        if (user.resetCodeExpires < Date.now())
            return res.status(400).json({ message: "کد  منقضی شده است." });

        // generate token ---10 min
        const tempToken = crypto.randomBytes(32).toString("hex");

        user.resetToken = tempToken;
        user.resetTokenExpires = Date.now() + 10 * 60 * 1000; //10 min

        await user.save();

        return res.status(200).json({ message: "Code verified", token: tempToken });
    },
    resetPassword: async (req, res) => {
        try {
            const { email, token, password } = req.body;
            console.log(email,'email')

            const user = await User.findOne({ email });
            if (!user) return res.status(404).json({ message: "کاربر یافت نشد." });

            if (
                !user.resetToken ||
                user.resetToken !== token ||
                user.resetTokenExpires < Date.now()
            ) {
                return res.status(400).json({ message: "لینک نامعتبر یا منقضی شده است." });
            }

            user.password = password;

            user.resetCode = undefined;
            user.resetCodeExpires = undefined;
            user.resetToken = undefined;
            user.resetTokenExpires = undefined;

            await user.save();

            return res.json({ message: "پسور شما با موفقیت تغییر یافت" });

        } catch (err) {
            console.log(err);
            return res.status(500).json({
                message: 'خطای سرور'
            });
        }
    },

    me: async (req, res) => {
        try {
            const user = await getMe(req.user.id);
            res.json({user});
        } catch (e) {
            console.log(e);
            return res.status(500).json({
                message: 'خطای سرور'
            });
        }
    },


    logout: async (_req, res) => {
        if(process.env.RUN_MODE==='host'){
            res.clearCookie("token", {
                path: "/",
                domain: "nakhshin.shop",
                httpOnly: true,
                secure: true,
                sameSite: "None",
            });
        }
        res.clearCookie("token");

  res.json({ message: "Logged out" });
}
,

    checkEmail: async (req, res) => {
        let email = req.body.email;
        if (!email) res.status(400).json({error: "email required"});

        const user = await User.findOne({email});
        if (user) res.status(200).json({exist: true});

        res.status(200).json({exist: false});
    },
    editUser: async (req, res) => {
        console.log('body', req.body)
        try {
            const {_id, email, name, phone, createdAt, updatedAt} = await User.findByIdAndUpdate(
                req.params.id,
                {$set: req.body},
                {new: true, runValidators: true}
            )
            res.json({id: _id, email, name, phone, updatedAt, createdAt})
        } catch (err) {
            res.status(500).json({error: err.message})
        }
    }
};
