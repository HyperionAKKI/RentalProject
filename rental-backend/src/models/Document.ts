import mongoose, { Schema, Document as MongooseDocument } from 'mongoose';

export interface IDocument extends MongooseDocument {
  tenantName: string;
  roomNo: string;
  contact: string;
  idProof: string;
  agreement: string;
  tenantId?: mongoose.Types.ObjectId;
}

const DocumentSchema: Schema = new Schema({
  tenantName: { type: String, required: true },
  roomNo: { type: String, required: true },
  contact: { type: String, required: true },
  idProof: { type: String, required: true },
  agreement: { type: String, required: true },
  tenantId: { type: Schema.Types.ObjectId, ref: 'User' }
}, {
  timestamps: true
});

DocumentSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) { delete ret._id }
});

export const DocumentModel = mongoose.model<IDocument>('Document', DocumentSchema);
