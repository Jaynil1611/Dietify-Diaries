import "./styles.css";
import { useAxios } from "./server";
import { Routes, Route, Link } from "react-router-dom";
import {
  PlayListDetail,
  Video,
  VideoDetail,
  Playlists,
  Like,
  Saved,
  History,
} from "./components";
import { useState } from "react";

function App() {
  const [showMenu, setShowMenu] = useState(false);
  const handleSideMenuClick = () => {
    setShowMenu(!showMenu);
  };

  useAxios("videos", "videoList");
  useAxios("playlists", "playlists");
  useAxios("likes", "likedVideos");
  useAxios("saves", "savedVideos");
  useAxios("histories", "history");

  return (
    <>
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
              <Link className="text--gray badge__container" to="/">
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
              {menuList.map(({ name, icon, path }) => (
                <li key={name} className="list__item li--border">
                  <Link onClick={handleSideMenuClick} to={`${path}`}>
                    <span className="padding--right-sm ">
                      <i className={`fas ${icon} icon--md`}></i>
                    </span>
                    <span className="subtitle--sm">{name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Routes>
          <Route path="/" element={<Video />} />
          <Route path="/videos" element={<Video />} />
          <Route path="/videos/:videoId" element={<VideoDetail />} />
          <Route path="/playlists" element={<Playlists />} />
          <Route path="/playlists/:playlistId" element={<PlayListDetail />} />
          <Route path="/liked" element={<Like />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </div>
    </>
  );
}

const menuList = [
  { name: "Home", icon: "fa-home-alt", path: "/" },
  { name: "Playlists", icon: "fa-folder", path: "/playlists" },
  { name: "Liked videos", icon: "fa-thumbs-up", path: "/liked" },
  { name: "Saved", icon: "fa-bookmark", path: "/saved" },
  { name: "History", icon: "fa-history", path: "/history" },
];

export default App;
