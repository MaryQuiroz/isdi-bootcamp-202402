import { validate, errors } from 'com'

async function searchCats(searchValue) {
    validate.token(sessionStorage.token)

    const response = await fetch(`${import.meta.env.VITE_API_URL}/cats/search?name=${searchValue}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`
        }
    })
    const cats = await response.json()
    if (response.status == 200) return cats
    const { error, message } = body
    const constructor = errors[error]
    throw new constructor(message)


}

export default searchCats
