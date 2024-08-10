import { NextFunction, Response } from "express";
import { RequestExt } from "../interfaces/req-ext";
import { verifyToken } from "../utils/jwt.handle";
import { handleHttp } from "../utils/http.handle";

const checkJwt = (req: RequestExt, res: Response, next: NextFunction) => {
  try {
    const jwtByUser = req.headers.authorization || "";
    const jwt = jwtByUser.split(" ").pop(); //Bearer: 11111
    const isUser = verifyToken(`${jwt}`) as { username: string, role: string };
    if (!isUser) {
      handleHttp(res, 401);
    } 
    else {
      req.user = isUser;
      next();
    }
  } catch (e) {
    handleHttp(res, 500);
  }
};

const checkAdmin = (req: RequestExt, res: Response, next: NextFunction) => {
  try {
    const jwtByUser = req.headers.authorization || ""; //We get either a JWT or nothing (empty string)
    const jwt = jwtByUser.split(" ").pop(); //"Bearer token" -> We keep the last part
    const isUser = verifyToken(`${jwt}`) as { email: string, role: string };
    if (!isUser) {
      handleHttp(res, 401);
    } 
    else if (isUser.role != "admin") {
      handleHttp(res, 403);
    } 
    else {
      req.user = isUser;
      next();
    }
  } catch (e) {
    handleHttp(res, 500);
  }
};

export { checkJwt, checkAdmin };