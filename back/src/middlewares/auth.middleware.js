import { verifyJwt } from "../utils/jwt.js";

export function requireAuth(env) {
  return (req, res, next) => {
    try {
      const token = req.cookies?.token
      if (!token) return res.status(401).json({ message: "Unauthorized1" });
      const payload = verifyJwt(token, env.JWT_SECRET);
      req.user = { id: payload.sub, email: payload.email };
      next();
    } catch {
      return res.status(401).json({ message: "Unauthorized3" });
    }
  };
}


