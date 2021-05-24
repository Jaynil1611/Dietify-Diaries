const express = require("express");
const cors = require("cors");
const compression = require("compression");
const dotenv = require("dotenv");

const app = express();
app.use(express.json());
app.use(cors());
app.use(compression());
dotenv.config();

const { initializeDBConnection } = require("./db/db.connect");
const { storeVideos } = require("./utils/storeVideo");
const { createUser } = require("./utils/createUser");

const videoRouter = require("./routes/video.router");
const historyRouter = require("./routes/history.router");
const playlistRouter = require("./routes/playlist.router");
const likedVideoRouter = require("./routes/likedVideo.router");
const savedVideoRouter = require("./routes/savedVideo.rouer");
const dislikedVideoRouter = require("./routes/dislike.router");

const { pathNotFoundHandler } = require("./middlewares/pathNotFoundHandler");
const { errorHandler } = require("./middlewares/errorHandler");

initializeDBConnection();

app.use("/videos", videoRouter);
app.use("/users/:userId/history", historyRouter);
app.use("/users/:userId/playlists", playlistRouter);
app.use("/users/:userId/likes", likedVideoRouter);
app.use("/users/:userId/saves", savedVideoRouter);
app.use("/users/:userId/dislikes", dislikedVideoRouter);

app.get("/", (request, response) => {
  response.json("Welcome to Dietify Diaries");
});

app.use(pathNotFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("server started on port: ", PORT);
});
