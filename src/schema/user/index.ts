import { Schema } from 'mongoose';
import { IUser } from '../../shared/types/user';

export const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  username: String,
  password: { type: String, required: true },
  status: { type: Boolean },
});
