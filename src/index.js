const express = require('express')
require('./db/mongoose')
const ytRouter = require('./routers/yt')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json({ extended: true }))
app.use(express.urlencoded({extended: true }))

app.use('/video', ytRouter)
app.get('/', (req,res) => {
    res.send('Welcome to Famtube')
})


app.listen(port, () => {
    console.log('server is up on port ', port)
})
