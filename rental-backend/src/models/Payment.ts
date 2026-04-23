import mongoose, { Schema, Document } from 'mongoose';

export interface IPayment extends Document {
  amount: number;
  dueDate: string;
  status: string;
  tenantName: string;
  roomNo: string;
  tenantId?: mongoose.Types.ObjectId;
}

const PaymentSchema: Schema = new Schema({
  amount: { type: Number, required: true },
  dueDate: { type: String, required: true },
  status: { type: String, default: 'PENDING' },
  tenantName: { type: String, required: true },
  roomNo: { type: String, required: true },
  tenantId: { type: Schema.Types.ObjectId, ref: 'User' }
}, {
  timestamps: true
});

PaymentSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) { delete ret._id }
});

export const Payment = mongoose.model<IPayment>('Payment', PaymentSchema);
