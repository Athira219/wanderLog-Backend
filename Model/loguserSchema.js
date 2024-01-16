const mongoose = require('mongoose')

const loguserSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    bio: {
        type: String

    },
    profile: {
        type: String
    }

})

//create model
//wanderlogusers---> collection name
//loguserSchema-->model
const wanderlogusers = mongoose.model('wanderlogusers', loguserSchema)

module.exports = wanderlogusers