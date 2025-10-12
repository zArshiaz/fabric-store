import { check } from "express-validator";
import { loginUser, registerUser, getMe } from "../services/auth.service.js";
import { User } from "../models/User.js";


function setAuthCookie(res, token, env) {
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: env.COOKIE_SECURE === "true",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 روز
  });
}

export const AuthController = {
  register: async (req, res) => {
    try {
      console.log("body:", req.body);
      const { user, token } = await registerUser(req.body, process.env);

      setAuthCookie(res, token, process.env);
      res.status(201).json({ user });
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  login: async (req, res) => {
    try {
      const { user, token } = await loginUser(req.body, process.env);
      setAuthCookie(res, token, process.env);
      res.json({ user });
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  me: async (req, res) => {
    try {
      const user = await getMe(req.user.id);
      res.json({ user });
    } catch (e) {
      res.status(404).json({ message: e.message });
    }
  },

  logout: async (_req, res) => {
    res.clearCookie("token");
    res.json({ message: "Logged out" });
  },

  checkEmail: async (req, res) => {
    let email = req.body.email;
    if (!email) res.status(400).json({ error: "email required" });

    const user = await User.findOne({ email });
    if (user) res.status(200).json({ exist: true });

    res.status(200).json({ exist: false });
  },
  editUser:async(req,res)=>{
    console.log('body',req.body)
   try {
    const {_id,email,name,phone,createdAt,updatedAt} = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    )
    res.json({id:_id,email,name,phone,updatedAt,createdAt})
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
};
