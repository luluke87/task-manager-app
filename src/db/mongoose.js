"use strict"

const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})

// const me = new User({
//     name: '  ludwigPasswordTester',
//     email: '    lkOSOSOSOSOSmeier@posteo.de',
//     password: 'passworTLongEnough'
// })

// me.save().then(() => {
//     console.log(me)
// })
//     .catch(e => console.log('Error!!', e))
