import * as mongoose from 'mongoose';
import User from './interface';

const userSchema = new mongoose.Schema({
  email: String,
  name: String,
  password: String,
  phone: String,
});

const userModel = mongoose.model<User & mongoose.Document>('User', userSchema);

export default userModel;
