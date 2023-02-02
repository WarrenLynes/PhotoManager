require('dotenv').config();

import AuthenticationController from './app/modules/auth/controller';
import App from './app';
import UserController from './app/modules/user/controller';
import PhotoController from './app/modules/photo/controller';

const app = new App([
  new AuthenticationController(),
  new UserController(),
  new PhotoController()
]);

app.listen();
