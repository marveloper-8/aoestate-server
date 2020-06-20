const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const postSchema = new mongoose.Schema({
    eventName: {
        type: String,
        required: true
    },
    eventLocation: {
        type: String,
        required: true
    },
    eventDate: {
        type: String,
        requred: true
    },
    eventTime: {
        type: String,
        requred: true
    },
    eventVideo: {
        type: String,
        required: true
    },
    eventDescription: {
        type: String,
        required: true
    },
    postedBy: {
        type: ObjectId,
        ref: "Admin"
    },
    photo: {
        type: String,
        required: true
    }
})

mongoose.model("Event", postSchema)