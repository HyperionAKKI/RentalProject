import mongoose, { Schema, Document } from 'mongoose';

export interface IMaintenanceTask extends Document {
  title: string;
  description: string;
  status: string;
  reporterId?: mongoose.Types.ObjectId;
}

const MaintenanceTaskSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, default: 'PENDING' },
  reporterId: { type: Schema.Types.ObjectId, ref: 'User' }
}, {
  timestamps: true
});

MaintenanceTaskSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) { delete ret._id }
});

export const MaintenanceTask = mongoose.model<IMaintenanceTask>('MaintenanceTask', MaintenanceTaskSchema);
