const jwt = require('jsonwebtoken');

module.exports = function(roles) {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next()
        }
    
        try {
            const token = req.headers.authorization.split(' ')[1]

            //user is unregistred
            if (!token) {
                return res.status(401).json({message: "User is not authorized"})
            }
    
            const {roles: userRoles} = jwt.verify(token, process.env.SECRET)

            let hasRole = false;

            userRoles.forEach(role => {
                hasRole = roles.includes(role) ? true : false
            });
    
            //user's access level is not high enough
            if (!hasRole) {
                return res.status(403).json({message: "You are not authorized to perform this action"})
            }

            next()
        } catch (e) {
            console.log(e)
            return res.status(401).json({message: "User is not authorized"})
        }
    }
}