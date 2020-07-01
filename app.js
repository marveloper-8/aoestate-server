const express = require('express')
const mongoose = require('mongoose')
const app = express()
const PORT = process.env.PORT || 5000
const cors = require("cors")
const {MONGOURI} = require('./config/keys')

mongoose.connect(MONGOURI, {
    useNewUrlParser:true,
    useUnifiedTopology:true
})

mongoose.connection.on('connected', () => {
    console.log("Connected to mongo")
})
mongoose.connection.on('error', () => {
    console.log("Error connecting", err)
})

require('./models/user')
require('./models/admin')
require('./models/post')
require('./models/events')
require('./models/feeds')
require('./models/comment')
require('./models/property')

app.use(cors())
app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/admin'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))

app.listen(PORT, () => {
    console.log("server is running on ", PORT)
})

app.get("/", (req, res) => {
    res.send({message: "AO Estate's server is online"})
})
