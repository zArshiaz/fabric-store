import { verifyJwt } from "../utils/jwt.js";
 
export function requireAuth(env) {
  return (req, res, next) => {
    try {
      const token = req.cookies?.token
      if (!token) return res.status(401).json({ message: "Unauthorized access token" });
      const payload = verifyJwt(token, env.JWT_SECRET);
      req.user = { id: payload.sub, email: payload.email ,role: payload.role };
      next();
    } catch(e) {
      console.log('requireAuth middleware',e)
      return res.status(401).json({ message: "Unauthorized 3" });
    }
  };
}

export function requireAdmin(env) {
  return (req, res, next) => {
    try {
      const token = req.cookies?.token
      if (!token) return res.status(401).json({ message: "Unauthorized1" });
      const payload = verifyJwt(token, env.JWT_SECRET);
      console.log(payload)
      if(payload.role!=='admin')  res.status(401).json({ message: "user is not admin" });
      req.user = { id: payload.sub, email: payload.email ,role:payload.role};
      console.log('admin')
      next();
    } catch {
      return res.status(401).json({ message: "Unauthorized3" });
    }
  };
}


