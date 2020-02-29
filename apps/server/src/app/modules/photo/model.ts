import * as mongoose from 'mongoose';
import Photo from './interface';

const photoSchema = new mongoose.Schema({
  name: String,
  imageUrl: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const photoModel = mongoose.model<Photo & mongoose.Document>('Photo', photoSchema);

export default photoModel;
