import "./styles.css";
import { useAxios } from "./server";
import { NavLink, Link } from "react-router-dom";
import { ScrollToTop, Toast } from "./components";
import { RouteList } from "./routes";
import { useState } from "react";
import { useCleaner } from "./utils";

function App() {
  const [showMenu, setShowMenu] = useState(false);
  const handleSideMenuClick = () => {
    setShowMenu(!showMenu);
  };

  useAxios("videos", "videoList");
  useAxios("playlists", "playlists");
  useAxios("likes", "likedVideos");
  useAxios("saves", "savedVideos");
  useAxios("history", "history");
  useCleaner();

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
                  className="img--xs"
                  src={`https://ui-avatars.com/api/?name=Jaynil+Gaglani&rounded=true&background=fd7014&color=fff&size=32`}
                  alt=""
                />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="main-content" >
        <div className={`side-bar ${showMenu ? "show" : "side-bar--desktop"}`}>
          <div
            className={`side-menu ${showMenu ? "view" : "side-menu--desktop"}`}
          >
            <ul className="list__group li--border sidebar--scroll">
              {menuList.map(({ name, icon, path }) => (
                <li key={name} className="list__item li--border spacing--sm">
                  <NavLink
                    end
                    onClick={handleSideMenuClick}
                    to={`${path}`}
                    className="active"
                    activeClassName="active"
                  >
                    <span className="padding--right-md">
                      <i className={`fas ${icon} icon--md`}></i>
                    </span>
                    <span className="subtitle--sm">{name}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="video__display">
          <Toast />
          <ScrollToTop />
          <RouteList />
        </div>
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
