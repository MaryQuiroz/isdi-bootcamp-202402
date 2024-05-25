import { validate, errors } from 'com'

async function createCat(catData) {
    const { name, color, breed, birthdate, avatar, description } = catData
    validate.text(name, 'name')
    validate.text(color, 'color') 
    validate.text(breed, 'breed')
    validate.text(birthdate, '21/01/2023')
    validate.text(avatar, 'avatar')
    validate.text(description, 'description')
    validate.token(sessionStorage.token)

    const response = await fetch(`${import.meta.env.VITE_API_URL}/cats`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.token}`

        },
        body: JSON.stringify(catData)

    })
    const cat = await response.json()
    if(response.status !== 201) {
        const {error, message } = cat
        const constructor = errors[error]
        throw new constructor(message)
    }
    return cat
}

export default createCat