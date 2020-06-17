const express = require('express')
const router = express.Router()
const User = require('../models/user')
const auth = require('../middleware/authentication') //now we can add authentification to certain routes. 

//this is the signup and this also creates and sends back an authentification token
router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save() //After the user is saved. gen and send back the token. 
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400)
        res.send(e)
    }
    //everything that comes after the await user, will only be completed once the user is safed (succesfully oder unsuccesfully)
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password) //Static method ;)
        const token = await user.generateAuthToken()
        res.send({ user, token }) //shorthand syntax, client has now the token, but not the server!?
    } catch (error) {
        res.status(400).send()
    }
})

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user) //this route now enables the user to see only his profile. thats smart. 

    /*
    try {
        const users = await User.find({})
        res.send(users)
    } catch (error) {
        res.status(500).send(error)
    }
    */
})

router.get('/users/:id', auth, async (req, res) => {
    const _id = req.params.id //String ID is never converted to an ObjectID...that does mongoose for us

    try {
        const user = await User.findById(_id)
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (error) {
        res.status(500).send()
    }


    console.log(req.params) //params is an object with a single property --> id and the property is the value of id
})

router.patch('/users/:id', async (req, res) => {

    //this makes sure, that only valid keys are updated.

    const updates = Object.keys(req.body)
    const allowedUpdatesArray = ['name', 'age', 'email', 'password']
    const isValidUpdate = updates.every((update) => {
        return allowedUpdatesArray.includes(update)
    })

    if (!isValidUpdate) {
        return res.status(400).send({ error: 'invalid property!!' })
    }

    try {
        //this block gets the middleware running. 
        const user = await User.findById(req.params.id)
        //update contains a string
        updates.forEach((update) => {
            user[update] = req.body[update]
        })

        await user.save()
        //with new: true the user will be the updated user
        // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (!user) {
            return res.status(404).send()
        }
        res.send(user) //the current user data is sent back

    } catch (error) {
        res.status(400).send(error)
    }
})

router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)

        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (error) {
        res.status(500).send()
    }
})


module.exports = router