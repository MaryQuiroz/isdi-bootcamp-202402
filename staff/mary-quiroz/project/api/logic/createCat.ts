import { validate, errors } from "com"

import { CatType, Cat } from "../data"

const {  SystemError } = errors

function createCat(userId:string, name: string, color: string, breed:string, age: number, avatar: string, description: string) : Promise<void> {
    validate.text(userId, 'name')
    validate.text(name, 'name')
    validate.text(color, 'color')
    validate.text(breed, 'breed')
    validate.text(avatar,'avatar')
    validate.text(description, 'description')

        const cat = {
            name: name.trim(),
            color: color,
            breed: breed,
            age: age,
            avatar: avatar,
            description: description,
            user:userId
        }
    return Cat.create(cat)
        .then(cat)
        .catch(error => { throw new SystemError(error.message)})
         


}

export default createCat