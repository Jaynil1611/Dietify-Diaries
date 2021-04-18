import "./styles.css";
import { useAxios } from "./server";
import { Routes, Route, Link } from "react-router-dom";
import { Video, VideoDetail } from "./components";
import { useState } from "react";

function App() {
  const [showMenu, setShowMenu] = useState(false);

  const handleSideMenuClick = () => {
    setShowMenu(!showMenu);
  };

  useAxios("videos", "videoList");
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
                <Link to="/videos"> Home </Link>
              </li>
              <li className="list__item">
                <Link to="/liked">Liked</Link>
              </li>
            </ul>
          </div>
        </div>
        <Routes>
          <Route path="/videos" element={<Video />} />
          <Route path="/videos/:videoId" element={<VideoDetail />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
