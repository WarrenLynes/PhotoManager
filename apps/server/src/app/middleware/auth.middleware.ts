import { NextFunction, Request, RequestHandler, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import AuthenticationTokenMissingException from '../exceptions/AuthenticationTokenMissingException';
import WrongAuthenticationTokenException from '../exceptions/WrongAuthenticationTokenException';
import userModel from '../modules/user/model';

function authMiddleware(): RequestHandler {
  return async (request: any, response: Response, next: NextFunction) => {
    const bearerToken = request.headers.authorization /*? request.cookies*/;
    if (bearerToken) {
      const secret = process.env.JWT_SECRET;
      try {
        const verificationResponse = jwt.verify(bearerToken, secret) as any;
        const { _id } = verificationResponse;
        const user = await userModel.findById(_id);
        if (user) {
          request.user = user;
          next();
        } else {
          next(new WrongAuthenticationTokenException());
        }
      } catch (error) {
        next(new WrongAuthenticationTokenException());
      }
    } else {
      next(new AuthenticationTokenMissingException());
    }
  };
}

export default authMiddleware;
