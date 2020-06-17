"use strict"

const express = require('express')
require('./db/mongoose') //this ensures that the file runs and that we connect to the mongodb
const User = require('./models/user')
const Task = require('./models/task')
const UserRouter = require('./routers/user')
const TaskRouter = require('./routers/task')


const app = express()

//w/o middleware new request --> run route handler
// with middleware new request --> do somethingm can be everything (middleware) --> run route handler

const port = process.env.PORT || 3000


app.use(express.json()) //automatically parses JSON to an object
app.use(UserRouter)
app.use(TaskRouter)

app.listen(port, () => {
    console.log('Server is up on port: ' + port)
})

// const jwt = require('jsonwebtoken')

// const myFunction = async () => {
//     //sign has to params, object and string
//     const token = jwt.sign({ _id: '!abcd1234' }, 'sectretTokenString....signature', {expiresIn: '7 days'})
//     console.log(token)

//     const data = jwt.verify(token,'sectretTokenString....signature')
//     console.log(data)

// }

// myFunction()


