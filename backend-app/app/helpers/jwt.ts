import * as jwt from "jsonwebtoken";
import {Request, Response, NextFunction} from "express";
import {TokenData, DataStoredInToken, User} from "./dataSchema";

export const createToken  = (user: User) : TokenData =>  {
    const expiresIn = 60 * 60; // an hour
    const secret = process.env.JWT_SECRET as string;
    const dataStoredInToken: DataStoredInToken = {
      _id: user._id,
    };
    return {
      expiresIn,
      token: jwt.sign(dataStoredInToken, secret, { expiresIn }),
    };
  }

 export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.TOKEN_SECRET as string, (err: any, user: any) => {
      console.log(err)
  
      if (err) return res.sendStatus(403)
  
      req.body.logged_user = user
  
      next()
    })
  }