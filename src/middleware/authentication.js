"use strict"
const jwt = require('jsonwebtoken')
const User = require('../models/user')

/*
only if a valid token is provided we can access the route handler

*/

const auth = async (req, res, next) => {
    try {

        const token = req.header('Authorization').replace('Bearer ', '') //removing beginning of the header
        const decoded = jwt.verify(token, 'thisismynewcourse')
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token }) //we ware looking for a user with the certain ID and the token

        if (!user) {
            throw new Error() //this triggers catch down below
        }
        req.token = token //now the other route handlers have access to the token
        req.user = user
        next()

    } catch (error) {
        res.status(401).send({ error: 'Please authenticate' })
    }
}

module.exports = auth