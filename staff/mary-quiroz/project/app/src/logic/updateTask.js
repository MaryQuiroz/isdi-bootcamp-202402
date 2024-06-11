import { validate, errors } from 'com'

function updateTask(taskId, taskData) {
    validate.token(sessionStorage.token)

    return fetch(`${import.meta.env.VITE_API_URL}/tasks/${taskId}`,

        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.token}`
            },
            body: JSON.stringify(taskData)

        })
        .then(res => {
            if (res.status === 200) 
                return res.json()
    
            return res.json()
                .then(body => {
                    const { error, message } = body
    
                    const constructor = errors[error]
    
                    throw new constructor(message)
                })
        })

    
}



export default updateTask
