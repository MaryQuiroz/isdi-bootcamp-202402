import { validate, errors } from 'com'

async function retrieveUser(){
    validate.token(sessionStorage.token)

    const [, payloadB64] = sessionStorage.token.split('.')

    const payloadJSON = atob(payloadB64)

    const payload = JSON.parse(payloadJSON)

    const { sub: userId } = payload

    const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${userId}`,{
        headers:{
            Authorization: `Bearer ${sessionStorage.token}`
        }
    })
        const userRetrieved = await response.json()
            if (response.status === 200) return userRetrieved
                const { error, message } = userRetrieved

                const constructor = errors[error]
                throw new constructor (message)
}
           

export default retrieveUser