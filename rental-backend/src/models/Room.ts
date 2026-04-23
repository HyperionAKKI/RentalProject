import mongoose, { Schema, Document } from 'mongoose';

export interface IRoom extends Document {
  number: string;
  status: string;
}

const RoomSchema: Schema = new Schema({
  number: { type: String, required: true, unique: true },
  status: { type: String, default: 'AVAILABLE' }
}, {
  timestamps: true
});

RoomSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) { delete ret._id }
});

export const Room = mongoose.model<IRoom>('Room', RoomSchema);
