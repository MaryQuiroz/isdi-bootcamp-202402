import { validate, errors } from 'com'

function createCat(name, color, breed, age, avatar, description) {
    validate.text(name, 'name')
    validate.text(color, 'color') 
    validate.text(breed, 'breed')
    validate.text(avatar, 'avatar')
    validate.text(description, 'description')
    validate.token(sessionStorage.token)

    const [, payloadB64] = sessionStorage.token.split('.')

    const cat = { name, color, breed, age, avatar, description }

    return fetch(`${import.meta.env.VITE_API_URL}/cats/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.token}`

        },
        body: JSON.stringify(cat)

    })
        .then(res => {
            if (res.status === 201) return res.json()

            return res.json()
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })



        })
}

export default createCat