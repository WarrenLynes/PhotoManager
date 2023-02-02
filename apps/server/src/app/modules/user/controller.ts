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

  private fetchAll = async (req: any, res: any, next: any) => {
    const users = await this.user.find();
    res.send(users);
  }

  private create = async (req: any, res: any, next: any) => {
    const userData: CreateUserDto = req.body;
    const newUser = new this.user(userData);
    const createdUser = await newUser.save();
    res.send(createdUser);
  }
}
