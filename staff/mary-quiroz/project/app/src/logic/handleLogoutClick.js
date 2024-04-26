const handleLogoutClick = () => {
    try {
        logic.logoutUser()
    } catch (error) {
        logic.cleanUpLoggedInUserId()
    } finally {
        onUserLoggedOut()
    }
}