import { Schema, model } from "mongoose"

interface IUser extends Document {
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
    },
}, {
    timestamps: true 
})


const User = model<IUser>('User', userSchema)

export {
    IUser,
    User,
}