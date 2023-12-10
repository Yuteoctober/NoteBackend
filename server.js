const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const userRouter = require('./routes/auth')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const cardRouter = require('./routes/cardroute')
const checklistRouter = require('./routes/checklistRouter')

const app = express()

const corsOptions ={
    origin:['http://localhost:5173/'], 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

app.use(cors(corsOptions));

app.use(cookieParser())
app.use(express.json())
dotenv.config()
app.use('/auth', userRouter)
app.use('/card', cardRouter)
app.use('/checklist', checklistRouter)




mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Starting on port 8080', 'server connected')
    app.listen(8080)
})