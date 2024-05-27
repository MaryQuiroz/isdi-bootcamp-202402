import { validate, errors } from 'com'

async function createTask(catId, task) {
   
    validate.token(sessionStorage.token)


    const response = await  fetch(`${import.meta.env.VITE_API_URL}/cats/${catId}/tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.token}`

        },
        body: JSON.stringify(task)

    })

    const taskCreated = await response.json()
    if(response.status===201) return taskCreated
    const { error, message } = body
    const constructor = errors[error]
    throw new constructor(message)
}

export default createTask