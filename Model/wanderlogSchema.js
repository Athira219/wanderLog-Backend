//import mongoose
const mongoose = require('mongoose')

const wanderlogSchema = new mongoose.Schema({
    place: {
        type: String,
        require: true
    },
    date: {
        type: String,
        require: true
    },
    wanderlog: {
        type: String,
        require: true
    },
    wanderlogImage: {
        type: String,
        require: true
    },
    userId: {
        type: String,
        require: true
    }
})

const wandercollections = mongoose.model('wandercollections', wanderlogSchema)


module.exports = wandercollections