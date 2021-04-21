import "./styles.css";
import { useAxios } from "./server";
import { Routes, Route, Link } from "react-router-dom";
import {
  PlayListDetail,
  Video,
  VideoDetail,
  PlayLists,
  Like,
} from "./components";
import { useState } from "react";

function App() {
  const [showMenu, setShowMenu] = useState(false);

  const handleSideMenuClick = () => {
    setShowMenu(!showMenu);
  };

  useAxios("videos", "videoList");
  useAxios("likes", "likedVideos");
  useAxios("playlists", "playlists");

  return (
    <div>
      <div className="heading">
        <div className="mobile-menu" onClick={handleSideMenuClick}>
          {showMenu ? (
            <i className="fas fa-times fa-lg spacing--horiz"></i>
          ) : (
            <i className="fas fa-bars fa-lg spacing--horiz"></i>
          )}
        </div>
        <div className="h6 text--bold heading--spacing">
          <Link to="/videos">Dietify Diaries</Link>
        </div>
        <nav className="spacing--top">
          <ul className="nav nav--right">
            <li>
              <Link className="text--gray badge__container" to="/profile">
                <img
                  src={`https://ui-avatars.com/api/?name=Jaynil+Gaglani&rounded=true&background=fd7014&color=fff&size=32`}
                  alt=""
                />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="main-content">
        <div className={`side-bar ${showMenu ? "show" : ""}`}>
          <div className={`side-menu ${showMenu ? "view" : ""}`}>
            <ul className="list__group">
              <li className="list__item">
                <Link onClick={handleSideMenuClick} to="/videos">
                  Home
                </Link>
              </li>
              <li className="list__item">
                <Link onClick={handleSideMenuClick} to="/liked">
                  Liked
                </Link>
              </li>
              <li className="list__item">
                <Link onClick={handleSideMenuClick} to="/playlists">
                  Playlists
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <Routes>
          <Route path="/videos" element={<Video />} />
          <Route path="/videos/:videoId" element={<VideoDetail />} />
          <Route path="/playlists" element={<PlayLists />} />
          <Route path="/playlists" element={<PlayLists />} />
          <Route path="/playlists/:playlistId" element={<PlayListDetail />} />
          <Route path="/liked" element={<Like />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
