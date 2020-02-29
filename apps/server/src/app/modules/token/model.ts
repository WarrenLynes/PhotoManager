import * as mongoose from 'mongoose';
import Token from './interface';

const tokenSchema = new mongoose.Schema({
  token: String,
  expiresIn: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const tokenModel = mongoose.model<Token & mongoose.Document>('Token', tokenSchema);

export default tokenModel;
