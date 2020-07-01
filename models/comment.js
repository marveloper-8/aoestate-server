const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const postSchema = new mongoose.Schema({
    propertyLink: {
        type: String,
        required: true
    },
    userLink: {
        type: String,
        required: true
    },
    description: {
        type: String,
        requred: true
    },
    postedBy: {
        type: ObjectId,
        ref: "User"
    }
})

mongoose.model("Comment", postSchema)
