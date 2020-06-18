const mongoose = require('mongoose')
const validator = require('validator')
const Schema = mongoose.Schema

const taskScheme = new Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false,
        required: false
    },
    owner: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: 'User'
    }
})

const Task = mongoose.model('Task', taskScheme)

module.exports = Task