import "./styles.css";
import { useAxios } from "./server";
import { Routes, Route, Link } from "react-router-dom";
import { Video } from "./components";

function App() {
  useAxios("videos", "videoList");
  useAxios("playlists", "playlists");
  return (
    <div>
      <div className="heading">
        <h1>
          <Link to="/home">Dietify Diaries</Link>
        </h1>
        <nav>
          <ul className="nav nav--right">
            <li></li>
            <li>
              <Link
                className="nav--link text--gray badge__container"
                to="/wish"
              >
                <i className="fas fa-heart fa-lg">
                  <span className="badge__icon text--white badge__icon badge--overlay"></span>
                </i>
              </Link>
            </li>
            <li>
              <Link
                className="nav--link text--gray badge__container"
                to="/cart"
              >
                <i className="fas fa-shopping-cart fa-lg">
                  <span className="badge__icon text--white badge__icon badge--overlay"></span>
                </i>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Video />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
