const express = require("express");
const cors = require("cors");
const compression = require("compression");
const dotenv = require("dotenv");

const { initializeDBConnection } = require("./db/db.connect");
const { storeVideos } = require("./utils/storeVideo");
const { createUser } = require("./utils/createUser");

const videoRouter = require("./routes/video.router");
const historyRouter = require("./routes/history.router");
const playlistRouter = require("./routes/playlist.router");
const likedVideoRouter = require("./routes/likedVideo.router");
const savedVideoRouter = require("./routes/savedVideo.rouer");
const dislikedVideoRouter = require("./routes/dislike.router");
const userRouter = require("./routes/user.router");
const createUserRouter = require("./routes/createUser.router");
const loginRouter = require("./routes/login.router");

const { pathNotFoundHandler } = require("./middlewares/pathNotFoundHandler");
const { errorHandler } = require("./middlewares/errorHandler");
const { authHandler } = require("./middlewares/authHandler");

const app = express();

app.use(express.json());
app.use(cors());
app.use(compression());

dotenv.config();

initializeDBConnection();

app.get("/", (req, res) => {
  res.json("Welcome to Dietify Diaries");
});

app.use("/videos", videoRouter);
app.use("/login", loginRouter);
app.use("/users", createUserRouter);

app.use(authHandler);
app.use("/users", userRouter);
app.use("/history", historyRouter);
app.use("/playlists", playlistRouter);
app.use("/likes", likedVideoRouter);
app.use("/saves", savedVideoRouter);
app.use("/dislikes", dislikedVideoRouter);

app.use(pathNotFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("server started on port: ", PORT);
});
