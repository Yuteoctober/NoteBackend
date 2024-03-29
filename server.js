const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const userRouter = require('./routes/auth')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const cardRouter = require('./routes/cardroute')
const checklistRouter = require('./routes/checklistRouter')
const visitRouter = require('./routes/visitroute')

const app = express()

const corsOptions ={
    origin: 
    [
        'https://workflow-sticky-note.netlify.app/',
        'https://yuteoctober.github.io/dndPortfolio/',
        'https://opennft.netlify.app/',
        'http://192.168.1.39:5173/',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials:true,    
    origin: true       
}

app.use(cors(corsOptions));

app.use(cookieParser())
app.use(express.json())
dotenv.config()
app.use('/auth', userRouter)
app.use('/card', cardRouter)
app.use('/checklist', checklistRouter)
app.use('/visit', visitRouter)

/// script to keep server alive while hosting
app.get('/keep-alive', (req, res) => {
    res.json({message: 'I am still alive 🐒'})
})


mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Starting on port 8080', 'server connected')
    app.listen(8080)
})