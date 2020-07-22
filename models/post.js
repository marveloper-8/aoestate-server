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
//     flyers: {
//         type: String,
//         required: true
//     },
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
        required: false
    },
    photoThree: {
        type: String,
        required: false
    },
    photoFour: {
        type: String,
        required: false
    },
    photoFive: {
        type: String,
        required: false
    },
    photoSix: {
        type: String,
        required: false
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
