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

// app.use((req, res, next) => {
//     res.status(503).send({maintenanceMessage:'Site is under Maintenance'})
// })

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

//when we call res.send JSON.stringify ist called in the background and this calls toJSON?! toJSON gets called whenever to object is converted to a string? sounds good
// const pet = {
//     name: 'hal'
// }

// pet.toJSON = function () {
//     console.log(this)
//     return {} 
// }

// console.log(JSON.stringify(pet))


const main = async () => {
    // const task = await Task.findById("5eeb06d95987c87ac0b81111")
    // await task.populate('owner').execPopulate() //find the user who is associated....owner is now not only the id but the whole profile
    // console.log(task.owner)
    const user = await User.findById('5eeb09b48f49597b34e2eb48')
    await user.populate('tasks').execPopulate()
    console.log(user.tasks)
}

main()
