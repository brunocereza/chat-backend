import { Schema } from 'mongoose';
import { model } from 'mongoose';
import { IUser } from '../../shared/types/user';

export const userSchema = new Schema<IUser>({
  name: String,
  username: String,
  password: String,
  status: Boolean,
});

export const UserModel = model<IUser>('User', userSchema);
