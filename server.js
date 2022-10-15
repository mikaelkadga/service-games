const express = require('express')
const app = express()
const PORT = process.env.PORT || 8000
const path = require('path');
const cors = require("cors");
const leaderboardRouter = require('./src/leaderboard/leaderboard.route');
const userRouter = require("./src/user/user.route");
const authRouter = require("./src/auth/auth.route");
const roomRouter = require("./src/room/room.route");
const gameRouter = require("./src/game/game.route");
const emailRouter = require("./src/email/email.route");

app.use(express.urlencoded({ extended: false }))

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./src/config/swagger');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, 'public')));

const bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.get('/', (req, res) => {
  res.send('hi there')
})

app.use(userRouter);
app.use(authRouter);
app.use(leaderboardRouter);
app.use(roomRouter);
app.use(gameRouter);
app.use(emailRouter);

app.listen(PORT, () => {
  console.log(`Server is up and running on port : ${PORT}`);
});
