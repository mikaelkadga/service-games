const express = require('express')
const app = express()
const { PORT = 8000 } = process.env



app.use(express.urlencoded({ extended: false }))


app.set('view engine', 'ejs')

const router = require('./routes/index')

var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

const bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

app.use(router)

app.listen(PORT, () => {
    console.log(`Server nyala di port ${PORT}`)
})
