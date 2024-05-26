import { validate, errors } from 'com'

async function retrieveTasks(catId){
    validate.token(sessionStorage.token)

    const response = await fetch(`${import.meta.env.VITE_API_URL}/cats/${catId}/tasks`,{
        headers:{
            Authorization: `Bearer ${sessionStorage.token}`
        }
    })
        const tasks = await response.json()
        if (response.status === 200) return tasks
        
            const { error, message } = response

            const constructor = errors[error]

            throw new constructor(message)

        

        
}

export default retrieveTasks
      