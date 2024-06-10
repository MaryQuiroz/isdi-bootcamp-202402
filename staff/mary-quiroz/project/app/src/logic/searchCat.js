import { validate, errors } from 'com'

function searchCats(searchValue) {
    validate.token(sessionStorage.token)

    return fetch(`${import.meta.env.VITE_API_URL}/cats/search?name=${searchValue}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`
        }
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

export default searchCats
