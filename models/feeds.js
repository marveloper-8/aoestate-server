const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const postSchema = new mongoose.Schema({
    feedHeadline: {
        type: String,
        required: true
    },
    feedInformation: {
        type: String,
        required: true
    },
    feedLink: {
        type: String,
        requred: true
    },
    postedBy: {
        type: ObjectId,
        ref: "Admin"
    }
})

mongoose.model("Feed", postSchema)