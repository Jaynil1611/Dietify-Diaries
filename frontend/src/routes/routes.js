import {
  PlayListDetail,
  Video,
  VideoDetail,
  PlayLists,
  Like,
  Saved,
  History,
  NotFound,
} from "../components";
import { Routes, Route } from "react-router-dom";

function RouteList() {
  return (
    <Routes>
      <Route path="/" element={<Video />} />
      <Route path="/videos" element={<Video />} />
      <Route path="/videos/:videoId" element={<VideoDetail />} />
      <Route path="/playlists" element={<PlayLists />} />
      <Route path="/playlists/:playlistId" element={<PlayListDetail />} />
      <Route path="/liked" element={<Like />} />
      <Route path="/saved" element={<Saved />} />
      <Route path="/history" element={<History />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default RouteList;
