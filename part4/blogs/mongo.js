const mongoose = require('mongoose')
const mongoUrl = `mongodb+srv://rrojo:${process.env.PASSWORD}@cluster0.edfy6zh.mongodb.net/?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(mongoUrl)