"use strict"

//CRUD create read update and delete allows us to manage our data successfully. 

const command = 'Users/ludwig/development/mongodb/bin/mongod --dbpath=/Users/ludwig/development/mongodb_data'

const { MongoClient, ObjectID } = require('mongodb')
//const MongoClient = mongodb.MongoClient // gives us the possiblity to connect 

const connectionURL = 'mongodb://127.0.0.1:27017' //localhost typed out IP. IP is more stable than writing localhost 
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (error, client) => { //callback gets called, when connected to the database. this is an asynchro operation

    if (error) {
        return console.log('Unable to connect to database')
    }

    const db = client.db(databaseName)

    // db.collection('users').insertMany([
    //     {name: 'Christina',
    //     age :30},
    //     {name: 'Klaus-Bärbel',
    // age: 28}
    // ], (error, result) => {
    //     if (error) {
    //       return  console.log('Unable to insert documents')
    //     }
    //     // ops is the only property that we will use, when using result 
    //     console.log(result.ops)
    // })

    // db.collection('users').findOne({ _id: new ObjectID("5ee7c31764ad6e4c72526e5f") }, (error, user) => {
    //     if (error) { return console.log('User could not be found') }
    //     console.log(user)
    // }) 
    //findOne only grabs the first Document 

    // db.collection('users').find({ age: {$gt: 10 } }).toArray((error, users) => {
    //     console.log(users)
    // }) 
    //find returns a cursor to the documents 

    // db.collection('tasks').findOne({ _id: new ObjectID('5ee7c9f04e53e24db8b683d9') }, (error, task) => {
    //     console.log(task)
    // })

    // db.collection('tasks').find({ completed: true }).toArray((error, tasks) => {
    //     console.log(tasks)
    // })

    // db.collection('tasks').updateMany({
    //     completed: true
    // }, {
    //     $set: {
    //         completed: false
    //     }
    // })
    //     .then(result => console.log(result.modifiedCount))
    //     .catch(e => console.log(e))

    db.collection('users').deleteMany({
        age: { $gt: 15 }
    })
        .then(result => console.log(result))
        .catch(e => console.log(e))
})