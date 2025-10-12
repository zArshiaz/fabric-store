import { User } from "../models/User.js";
import { signJwt } from "../utils/jwt.js";

export async function registerUser({ name, email, password }, env) {
  // آیا کاربر وجود دارد؟
  const exists = await User.findOne({ email });
  console.log(exists)
  if (exists) throw new Error("Email already registered");

  const user = await User.create({ name, email, password });

  // ایجاد JWT
  const token = signJwt(
    { sub: user._id.toString(), email: user.email },
    env.JWT_SECRET,
    env.JWT_EXPIRES_IN
  );

  return { user: sanitize(user), token };
}

export async function loginUser({ email, password }, env) {
  const user = await User.findOne({ email }).select("+password");
  if (!user) throw new Error("Invalid credentials");
  const ok = await user.comparePassword(password);
  if (!ok) throw new Error("Invalid credentials");

  const token = signJwt(
    { sub: user._id.toString(), email: user.email },
    env.JWT_SECRET,
    env.JWT_EXPIRES_IN
  );

  return { user: sanitize(user), token };
}

export async function getMe(userId) {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");
  return sanitize(user);
}

function sanitize(u) {
  return {
    id: u._id.toString(),
    name: u.name,
    email: u.email,
    phone:u.phone||0,
    createdAt: u.createdAt,
    updatedAt: u.updatedAt
  };
}
