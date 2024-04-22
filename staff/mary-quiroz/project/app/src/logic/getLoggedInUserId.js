import { util, validate } from 'com'

function getLoggedInUserId() {
    validate.token(sessionStorage.token)

    const { sub: userId } = util.extractJwtPayload(sessionStorage.token)ç

    return userId
}

export default getLoggedInUserId
