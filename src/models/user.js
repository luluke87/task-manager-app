const mongoose = require('mongoose')
const validator = require('validator')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userScheme = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true, //creates an index in the mongodb database to garantee uniqueness
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('provide a valid email address')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number')
            } //it is recommended to use a library for validating these values. npm validator
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password contains password')
            }
        }
    },
    tokens: [{
       token: {
           type: String,
           required: true
       } 
    }]
})

userScheme.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({_id: user.id.toString()},'thisismynewcourse') //now we have a token
    user.tokens = user.tokens.concat({token: token})
    await user.save() //now we generate tokens and save them to the database
    return token
}

userScheme.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    if(!user) {
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}

//this middleware allows us to use the hashing for saving and updating users, by implementing it only once
userScheme.pre('save', async function (next) {
    const user = this
    //  this statement will be true if the user is created for the first time or the property is updated
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

const User = mongoose.model('User', userScheme)

module.exports = User