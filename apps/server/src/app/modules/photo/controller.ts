import * as express from 'express';
import Controller from '../../interfaces/controller.interface';
import authMiddleware from '../../middleware/auth.middleware';
import CreatePhotoDto from './dto';
import photoModel from './model';
import multer from 'multer';
import uuid from 'uuid/v4';
import * as fs from 'fs';

export default class PhotoController implements Controller {
  public path = '/photos';
  public router = express.Router();
  private photo = photoModel;
  private storage = multer.diskStorage({
    destination: 'uploads/',
    filename: function(req, file, callback) {
      console.log(req);
      callback(null, uuid() + '__' + file.originalname);
    }
  });
  private upload = multer({ storage: this.storage });

  constructor() {
    this.router.get(`${this.path}`, authMiddleware(), this.fetchAll);
    this.router.post(`${this.path}`, authMiddleware(), this.upload.single('photo'), this.create);
    this.router.put(`${this.path}/:id`, authMiddleware(), this.edit);
    this.router.delete(`${this.path}/:id`, authMiddleware(), this.delete);
  }

  private fetchAll = async (req: any, res: express.Response, next: express.NextFunction) => {
    const photos = await this.photo.find({userId: req.user._id});
    res.send(photos);
  };

  private create = async (req: any, res: express.Response, next: express.NextFunction) => {

    console.log(req.file);
    const photoData: CreatePhotoDto = {...req.body, imageUrl: req.file.filename, userId: req.user._id};
    const newPhoto = new this.photo(photoData);
    const photo = await newPhoto.save();
    res.send(photo);
  };

  private delete = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const result = await this.photo.findOneAndDelete({_id: req.params.id});
    fs.unlinkSync('uploads/' + result.imageUrl);
    res.send(result);
  };

  private edit = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const photoId = req.params.id;
    const photoData: CreatePhotoDto = req.body;
    await this.photo.findOneAndUpdate({ _id: photoId }, photoData);
    const updatedPhoto = await this.photo.findById(photoId);
    res.send(updatedPhoto);
  }
}
