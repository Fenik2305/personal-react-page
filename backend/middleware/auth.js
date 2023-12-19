const jwt = require('jsonwebtoken');
const roles = require('../models/roles.js');

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
    
            const {role: userRole} = jwt.verify(token, process.env.SECRET)

            let hasRole = roles.includes(userRole) ? true : false;

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