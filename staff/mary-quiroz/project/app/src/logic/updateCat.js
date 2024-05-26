import { validate, errors } from 'com'

async function updateCat(catUpdateData) {
    const catId = catUpdateData._id
    validate.token(sessionStorage.token)

    const response = await fetch(`${import.meta.env.VITE_API_URL}/cats/${catId}`,

        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.token}`
            },
            body: JSON.stringify(catUpdateData)

        })
    const catUpdated = await response.json()
    if (response.status === 200) return catUpdated

    const { error, message } = catUpdated

    const constructor = errors[error]

    throw new constructor(message)



}

export default updateCat
