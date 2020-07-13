const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    phone:{
        type: Number,
        required: true
    },
    bankAccountName:{
        type: String,
        required: true
    },
    bankNumber:{
        type: Number,
        required: true
    },
    bankName:{
        type: String,
        required: true
    },
    referredBy:{
        type: String,
        required: false
    },
    referredById:{
        type: String,
        required: false
    },
    referredByEmail:{
        type: String,
        required: false
    },
    netWorth:{
        type: String,
        required: false
    },
    password:{
        type: String,
        required: true
    }
})

mongoose.model("User", userSchema)
