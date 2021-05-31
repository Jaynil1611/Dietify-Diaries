import {
  PlayListDetail,
  Video,
  VideoDetail,
  PlayLists,
  Like,
  Saved,
  History,
  NotFound,
  Login,
  SignUp,
  PrivateRoute,
} from "../components";
import { Routes, Route } from "react-router-dom";

function RouteList() {
  return (
    <Routes>
      <Route path="/" element={<Video />} />
      <Route path="/videos" element={<Video />} />
      <Route path="/videos/:videoId" element={<VideoDetail />} />
      <PrivateRoute path="/playlists" element={<PlayLists />} />
      <PrivateRoute
        path="/playlists/:playlistId"
        element={<PlayListDetail />}
      />
      <PrivateRoute path="/liked" element={<Like />} />
      <PrivateRoute path="/saved" element={<Saved />} />
      <PrivateRoute path="/history" element={<History />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default RouteList;
