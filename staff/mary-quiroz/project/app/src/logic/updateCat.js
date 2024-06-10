import { validate, errors } from 'com'

function updateCat(catUpdateData) {
    const catId = catUpdateData.id
    validate.token(sessionStorage.token)

    return fetch(`${import.meta.env.VITE_API_URL}/cats/${catId}`,

        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.token}`
            },
            body: JSON.stringify(catUpdateData)

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

export default updateCat
