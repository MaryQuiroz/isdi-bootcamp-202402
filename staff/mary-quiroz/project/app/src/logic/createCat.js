import { validate, errors } from 'com'

function createCat(catData) {
    const { name, color, breed, birthdate, avatar, description } = catData
    validate.text(name, 'name')
    validate.text(color, 'color') 
    validate.text(breed, 'breed')
    validate.text(birthdate, '21/01/2023')
    validate.text(avatar, 'avatar')
    validate.text(description, 'description')
    validate.token(sessionStorage.token)

    return fetch(`${import.meta.env.VITE_API_URL}/cats`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.token}`

        },
        body: JSON.stringify(catData)

    })
    .then(res => {
        if (res.status === 201) 
            return res.json()

        return res.json()
            .then(body => {
                const { error, message } = body

                const constructor = errors[error]

                throw new constructor(message)
            })
    })
}

export default createCat