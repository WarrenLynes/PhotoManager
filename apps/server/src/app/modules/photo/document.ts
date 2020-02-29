import { Document } from 'mongoose';

export interface PhotoDocument extends Document {
  readonly name: string;
  readonly imageUrl: string;
}
