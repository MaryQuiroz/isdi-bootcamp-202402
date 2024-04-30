import { validate, errors } from 'com'

function retrieveCat(){
    validate.token(sessionStorage.token)

    const [, playloadB64] = sessionStorage.token.split('.')

    const payloadJSON = atob(playloadB64)

    const payload = JSON.parse(payloadJSON)

    const { sub: catId } = payload

    return fetch(`${import.meta.env.VITE_API_URL}/cat/${catId}`,{
        headers:{
            Authorization: `Bearer ${sessionStorage.token}`
        }
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

export default retrieveCat
      