const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const postSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true
    },
    propertyName: {
        type: String,
        required: true
    },
    propertyLocation: {
        type: String,
        requred: true
    },
    typeOfDocument: {
        type: String,
        required: true
    },
    youTubeLink: {
        type: String,
        required: true
    },
    brochure: {
        type: String,
        required: true
    },
    flyers: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    propertyDescription: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    photoTwo: {
        type: String,
        required: true
    },
    photoThree: {
        type: String,
        required: true
    },
    photoFour: {
        type: String,
        required: true
    },
    photoFive: {
        type: String,
        required: true
    },
    photoSix: {
        type: String,
        required: true
    },
    likes: [
        {
            type: ObjectId,
            ref: "User"
        }
    ],
    comments: [{
        text:String,
        postedBy:{
            type: ObjectId,
            ref: "User"
        }
    }],
    postedBy: {
        type: ObjectId,
        ref: "Admin"
    }
}, {timestamps: true})

mongoose.model("Post", postSchema)
