import { validate } from 'com'

function isUsserLoggedIn() {
    try{ 
        validate.token(sessionStorage.token)

        return !!sessionStorage.token

    }catch (error) {
        return false
    }

}

export default isUsserLoggedIn