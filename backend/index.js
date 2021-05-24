const express = require('express');
const bodyParser = require('body-parser')
const cors = require("cors");
const compression = require('compression')
const dotenv = require("dotenv");


const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(compression());
dotenv.config();

const { initializeDBConnection } = require("./db/db.connect");
const { storeVideos } = require("./utils/storeVideo");
const { createUser } = require('./utils/createUser');

const videoRouter = require("./routes/video.router");
const historyRouter = require("./routes/history.router");
const playlistRouter = require("./routes/playlist.router");
const likedVideoRouter = require("./routes/likedVideo.router");
const savedVideoRouter = require("./routes/savedVideo.rouer");

initializeDBConnection();

app.use("/videos", videoRouter);
app.use("/user/:userId/history", historyRouter);
app.use("/user/:userId/playlists", playlistRouter);
app.use("/user/:userId/likes", likedVideoRouter);
app.use("/user/:userId/saves", savedVideoRouter);

app.get('/', (request, response) => {
  response.json('Welcome to Dietify Diaries')
});

app.use((req, res) => {
  res.status(404).json({ success: false, message: "route not found on server, please check" })
})

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "error occured, see the error message key for more details", errorMessage: err.message })
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('server started on port: ', PORT);
});
