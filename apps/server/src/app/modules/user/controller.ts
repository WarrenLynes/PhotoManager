import * as express from 'express';
import Controller from '../../interfaces/controller.interface';
import authMiddleware from '../../middleware/auth.middleware';
import CreateUserDto from './dto';
import userModel from './model';

export default class UserController implements Controller {
  public path = '/users';
  public router = express.Router();
  private user = userModel;

  constructor() {
    this.router.get(`${this.path}`, authMiddleware(), this.fetchAll);
  }

  private fetchAll = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const users = await this.user.find();
    res.send(users);
  }

  private create = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const userData: CreateUserDto = req.body;
    const newUser = new this.user(userData);
    const createdUser = await newUser.save();
    res.send(createdUser);
  }
}
