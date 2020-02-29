import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as mongoose from 'mongoose';
import * as morgan from 'morgan';
import errorMiddleware from './middleware/error.middleware';
import Controller from './interfaces/controller.interface';
const fetch = require('node-fetch');
const request = require('request');
const querystring = require('querystring');
const path = require('path');
const cors = require('cors');

export default class App {
  public app: express.Application;

  constructor(controllers: Controller[]) {
    this.app = express();

    this.connectToTheDatabase();
    this.initializeMiddleWares();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(process.env.PORT, () => {
      console.log(`-starter-api- ${process.env.PORT}`);
    });

    this.app.use(express.static(path.join(__dirname, '../../../uploads')));
    this.app.use(express.static(path.join(__dirname, '../../../dist/apps/dashboard')));
    this.app.use('/*', express.static(path.join(__dirname, '../../../dist/apps/dashboard/index.html')))
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddleWares() {
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(cookieParser());
    this.app.use('/', morgan('dev'));
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use('/api', controller.router);
    });
  }

  private connectToTheDatabase() {
    mongoose.connect(process.env.MONGO_PATH, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => { console.log('-starter-db -> connected'); });
  }
}
