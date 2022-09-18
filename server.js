const express = require('express')
const app = express()
const { PORT = 8000 } = process.env

app.use(express.urlencoded({ extended: false }))

app.set('view engine', 'ejs')
const userRouter = require("./src/user/user.route");

var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

const bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

app.use(userRouter);

app.listen(PORT, () => {
    console.log(`Server is up and running on port : ${PORT}`)
})
