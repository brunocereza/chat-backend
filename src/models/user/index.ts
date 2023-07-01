import { model } from 'mongoose';
import { userSchema } from '../../schema/user';
import { IUser } from '../../shared/types/user';

export const User = model<IUser>('User', userSchema);
