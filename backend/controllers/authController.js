const requireAuth = require("../middleware/auth.js")

const roleAuthorization = (allowedRoles) => {
    return requireAuth(allowedRoles)
}

module.exports = {
    roleAuthorization
}