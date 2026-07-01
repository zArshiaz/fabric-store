import { verifyJwt } from "../utils/jwt.js";

export function getUser(env) {
  return (req, res, next) => {
      try{
          const token = req.cookies?.token
        console.log('get user',token)
        const payload = verifyJwt(token, env.JWT_SECRET);
        req.user = { id: payload.sub, email: payload.email,role: payload.role };
         next();
      }
      catch(e){
        next();
      }
   
     };
}


