import { validate, errors } from "com"

import { TaskType, Task, } from "../data"



const {  SystemError } = errors

function createTask({ catId, title, description, priority, dueDate }) : Promise<void> {
    // validate.text(userId, 'name')
    // validate.text(name, 'name')
    // validate.text(color, 'color')
    // validate.text(breed, 'breed')
    // validate.text(avatar,'avatar')
    // validate.text(description, 'description')

        const task = {
            title,
            description,
            priority,
            dueDate,
            cat: catId

        }
    return Task.create(task)
        .then(task)
        .catch(error => { throw new SystemError(error.message)})
         


}

export default createTask