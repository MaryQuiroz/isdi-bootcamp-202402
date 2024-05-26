import { validate, errors } from 'com'

async function updateTask(taskId, taskData) {
    validate.token(sessionStorage.token)

    const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks/${taskId}`,

        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.token}`
            },
            body: JSON.stringify(taskData)

        })

    const taskUpdated = await response.json()
    if (response.status === 200) return taskUpdated 
        const { error, message } = taskUpdated

        const constructor = errors[error]

        throw new constructor(message)
    }
    


export default updateTask
