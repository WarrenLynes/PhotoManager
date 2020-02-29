import { NextFunction, Request, Response, Router } from 'express';
import Controller from '../../interfaces/controller.interface';
import CreateUserDto from '../user/dto';
import LogInDto from './login.dto';
import AuthenticationService from './service';
import validationMiddleware from '../../middleware/validation.middleware';

export default class AuthenticationController implements Controller {
  public path = '/auth';
  public router: Router = Router();
  private service: AuthenticationService = new AuthenticationService();

  constructor() {
    this.router.post(`${this.path}/login`, validationMiddleware(LogInDto), this.login);
    this.router.post(`${this.path}/register`, validationMiddleware(CreateUserDto), this.register);
  }

  private login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const loginData: LogInDto = req.body;
      console.log(req.body);
      const { user, cookieData, tokenData } = await this.service.login(loginData);
      res.setHeader('Set-Cookie', [cookieData]);
      res.send({ user, tokenData });
    } catch (err) {
      next(err);
    }
  }

  private logOut = (req: Request, res: Response) => {
    res.setHeader('Set-Cookie', ['Authorization=;Max-age=0']);
    res.send(200);
  }

  private register = async (req: Request, res: Response, next: NextFunction) => {
    const userData: CreateUserDto = req.body;

    console.log('THE FUCK????');
    try {
      const { cookie, user, tokenData } = await this.service.register(userData);
      res.setHeader('Set-Cookie', [cookie]);
      res.send({ user, tokenData });
    } catch (error) {
      next(error);
    }
  }
}
