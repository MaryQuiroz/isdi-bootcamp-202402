import { Schema, model, Document, Types } from 'mongoose';

export interface CatType extends Document {
    name: string;
    color: string;
    breed: string;
    birthdate: Date;
    avatar: string;
    description: string;
    user: Types.ObjectId;
}
const catSchema = new Schema<CatType>({
    name: { type: String, required: true },
    color: { type: String, required: true },
    breed: { type: String, required: true },
    birthdate: { type: Date, required: true },
    avatar: { type: String, required: true },
    description: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

catSchema.virtual('id').get(function(this: CatType) {
    return this._id.toHexString();
});

const Cat = model<CatType>('Cat', catSchema);

export default Cat;