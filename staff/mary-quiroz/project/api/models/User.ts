import { Schema, model } from "mongoose"

type UserType = {
    name: string
    email: string
    password: string
}

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    }
}, { toJSON: { virtuals: true }, id: false, timeStamp: true });

userSchema.virtual('id').get(function () {
    return this._id.toHexString();
});


const User = model<UserType>('User', userSchema)

export {
    UserType,
    User,
}