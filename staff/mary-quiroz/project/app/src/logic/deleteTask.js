import { validate, errors } from 'com'

async function deleteTask(taskId) {
    validate.token(sessionStorage.token)

    const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks/${taskId}`,

        {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${sessionStorage.token}`
            }
        })

    const taskDeleted = await response.json()

    if (response.status === 200) return taskDeleted
    const { error, message } = taskDeleted

    const constructor = errors[error]

    throw new constructor(message)


}

export default deleteTask
