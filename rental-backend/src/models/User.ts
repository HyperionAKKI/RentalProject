import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  role: string;
  roomNo?: string;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'TENANT' },
  roomNo: { type: String }
}, {
  timestamps: true
});

// Rename _id to id when formatting output to match Prisma expectations
UserSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {   delete ret._id  }
});

export const User = mongoose.model<IUser>('User', UserSchema);
