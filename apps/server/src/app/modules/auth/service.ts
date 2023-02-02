import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import UserWithThatEmailAlreadyExistsException from '../../exceptions/UserWithThatEmailAlreadyExistsException';
import WrongCredentialsException from '../../exceptions/WrongCredentialsException';
import TokenData from '../../interfaces/TokenData';
import tokenModel from '../token/model';
import CreateUserDto from '../user/dto';
import User from '../user/interface';
import userModel from '../user/model';

export default class AuthenticationService {
  private user = userModel;
  private token = tokenModel;

  public async login({ email, password }: {email: string, password: string}) {
    const user = await this.user.findOne({ email });
    if (user) {
      if (await compare(password, user.password)) {
        user.password = undefined;
        const tokenData = await this.createToken(user);
        const cookieData = this.createCookie(tokenData);
        return { user, tokenData, cookieData };
      }
    }
    throw new WrongCredentialsException();
  }

  public async register(userData: CreateUserDto): Promise<{cookie: any, user: any, tokenData: any}> {
    if (await this.user.findOne({ email: userData.email })) {
      throw new UserWithThatEmailAlreadyExistsException(userData.email);
    }
    const hashedPassword = await hash(userData.password, 10);
    const user = await this.user.create({ ...userData, password: hashedPassword });
    user.password = undefined;
    const tokenData = await this.createToken(user);
    const cookie = this.createCookie(tokenData);
    return { cookie, user, tokenData };
  }

  private createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
  }

  private async createToken(user: User) {
    const expiresIn = 24 * 60 * 60;
    const secret = process.env.JWT_SECRET;
    const token = sign({ _id: user._id }, secret, { expiresIn });
    this.token.deleteMany({ user: user._id });
    const newToken = await this.token.create({
      expiresIn,
      token,
      user: user._id,
    });
    return { expiresIn, token, tokenId: newToken._id };
  }
}
