const express = require('express')
const router = express.Router()
const Task = require('../models/task')

router.post('/tasks', async (req, res) => {
    const task = new Task(req.body)

    try {
        await task.save()
        res.status(201).send(task)
    } catch (error) {
        res.status(400).send(error)
    }
})
router.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id //String ID is never converted to an ObjectID...that does mongoose for us
    try {
        const task = await Task.findById(_id)
        if (!task) {
            return res.status(404).send('no task with this ID could be found')
        }
        res.send(task)
    } catch (error) {
        res.status(500).send(error)
    }
    console.log(req.params) //params is an object with a single property --> id and the property is the value of id
})
router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.patch('/tasks/:id', async (req, res) => {

    //this makes sure, that only valid keys are updated.

    const updates = Object.keys(req.body)
    const allowedUpdatesArray = ['description', 'completed']
    const isValidUpdate = updates.every((update) => {
        return allowedUpdatesArray.includes(update)
    })

    if (!isValidUpdate) {
        return res.status(400).send({ error: 'invalid property!!' })
    }

    try {
        const task = await Task.findById(req.params.id)
        // where to check??
        if (!task) {
            return res.status(404).send()
        }
        updates.forEach((update) => {
            task[update] = req.body[update]
        })
        await task.save()
        //with new: true the user will be the updated user
        //const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }
        res.send(task) //the current user data is sent back

    } catch (error) {
        res.status(400).send(error)
    }
})

router.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)
        //const count = await Task.countDocuments()
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (error) {

        res.status(500).send()
    }
})

module.exports = router