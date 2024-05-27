import { Schema, model, Document, Types } from 'mongoose'

 interface ICat extends Document {
    name: string;
    color: string;
    breed: string;
    birthdate: Date;
    avatar: string;
    description: string;
    user: Types.ObjectId;
}
const catSchema = new Schema<ICat>({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: { 
        type: String, 
        required: true 
    },
    color: { 
        type: String, 
        required: true 
    },
    breed: { 
        type: String, 
        required: true 
    },
    birthdate: { 
        type: Date, 
        required: true 
    },
    avatar: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    }, 
    
}, {
    timestamps: true
})

catSchema.set('toJSON', {
    transform: (doc, ret, options) => {
      ret.id = ret._id;
      delete ret._id;
      return ret;
    }
  });


const Cat = model<ICat>('Cat', catSchema)

export { 
        Cat, 
        ICat
    }