import { validate, errors } from "com"

import { Mongoose, Schema, Types } from "mongoose"
import { NotFoundError } from "com/errors.ts"
import { Cat, ICat } from "../../models/Cat.ts"
import { User } from "../../models/User.ts"

const { SystemError } = errors

async function createCat(userId: string, name: string, color: string, breed: string, birthdate: Date, avatar: string, description: string): Promise<ICat> {
     validate.text(userId, 'name')
    validate.text(name, 'name')
    validate.text(color, 'color')
     validate.text(breed, 'breed')
     validate.text(avatar,'avatar')
     validate.text(description, 'description')

    let user = null
    try {
        user = User.findById(new Types.ObjectId(userId))
        if (!user) {
            throw new NotFoundError("user not found")
        }
    } catch (error) {
        throw new SystemError(error.message)
    }

    const cat: any = {
        name: name.trim(),
        color: color,
        breed: breed,
        birthdate: birthdate,
        avatar: avatar,
        description: description,
        user: new Types.ObjectId(userId)
    }
    try {
        return await Cat.create(cat)
    } catch (error) {
        throw new SystemError(error.message);
    }

   


}

export default createCat