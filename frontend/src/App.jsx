import "./styles.css";
import { useAxios } from "./server";
import { NavLink, Link, Route, Routes } from "react-router-dom";
import { useState } from "react";
import {
  getFilteredMenuList,
  ScrollToTop,
  menuList,
  setupAuthHeaderForServerCalls,
} from "./utils";
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
  Toast,
  Logout,
  Avatar,
} from "./components";

function App() {
  const [showMenu, setShowMenu] = useState(false);
  const token = JSON.parse(localStorage.getItem("isUserLoggedIn"));
  setupAuthHeaderForServerCalls(token);
  const handleSideMenuClick = () => {
    setShowMenu(!showMenu);
  };
  const { loadingStatus: videoStatus } = useAxios("videos", "videoList", false);
  const { loadingStatus: playlistStatus } = useAxios(
    "playlists",
    "playlists",
    true
  );
  useAxios("likes", "likedVideos", true);
  useAxios("saves", "savedVideos", true);
  const { loadingStatus: historyStatus } = useAxios("history", "history", true);

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
              <Avatar />
            </li>
          </ul>
        </nav>
      </div>
      <div className="main-content">
        <div className={`side-bar ${showMenu ? "show" : "side-bar--desktop"}`}>
          <div
            className={`side-menu ${showMenu ? "view" : "side-menu--desktop"}`}
          >
            <ul className="list__group li--border sidebar--scroll">
              {getFilteredMenuList(menuList, token).map(
                ({ name, icon, path }) => (
                  <li key={name} className="list__item li--border spacing--sm">
                    <NavLink
                      end
                      onClick={handleSideMenuClick}
                      to={`${path}`}
                      className="active"
                    >
                      <span className="padding--right-md">
                        <i className={`fas ${icon} icon--md`}></i>
                      </span>
                      <span className="subtitle--sm">{name}</span>
                    </NavLink>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
        <div className="video__display">
          <Toast />
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Video loading={videoStatus} />} />
            <Route path="/videos" element={<Video />} />
            <Route path="/videos/:videoId" element={<VideoDetail />} />
            <Route
              path="/playlists"
              element={
                <PrivateRoute>
                  <PlayLists loading={playlistStatus} />
                </PrivateRoute>
              }
            />
            <Route
              path="/playlists/:playlistId"
              element={
                <PrivateRoute>
                  <PlayListDetail />
                </PrivateRoute>
              }
            />
            <Route
              path="/liked"
              element={
                <PrivateRoute>
                  <Like />
                </PrivateRoute>
              }
            />
            <Route
              path="/saved"
              element={
                <PrivateRoute>
                  <Saved />
                </PrivateRoute>
              }
            />
            <Route
              path="/history"
              element={
                <PrivateRoute>
                  <History loading={historyStatus} />
                </PrivateRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
