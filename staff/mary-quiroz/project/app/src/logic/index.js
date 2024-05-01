import registerUser from './registerUser'
import loginUser from './loginuser'
import retrieveUser  from './retrieveUser'
import logoutUser from './logoutUser'
import getLoggedInUserId from './getLoggedInUserId'
import isUserLoggedIn from './isUserLoggedIn'
import cleanUpLoggedInUserId from './cleanUpLoggedInUserId'
import createCat from './createCat'
import retrieveCat from './retrieveCat'
import retrieveCats from './retrieveCats'


const logic = {
    registerUser,
    loginUser,
    retrieveUser,
    logoutUser,
    getLoggedInUserId,
    isUserLoggedIn,
    cleanUpLoggedInUserId,
    createCat,
    retrieveCat,
    retrieveCats,
}

export default logic