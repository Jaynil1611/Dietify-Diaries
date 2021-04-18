import React from "react";
import "./Video.css";
import { tags } from "../../database";
import { useVideo } from "../../contexts";
import { VideoListing } from "../index";

function Video() {
  const {
    state: { videoList },
  } = useVideo();

  return (
    <div>
      <SearchBar />
      <Tags />
      <div className="video-container">
        <VideoListing videoList={videoList} />
      </div>
    </div>
  );
}

export const SearchBar = () => (
  <div className="input__search">
    <i className="fas fa-search fa-lg search__icon"></i>
    <input
      type="text"
      className="input search-bar"
      placeholder="Search Videos"
    />
  </div>
);

export const Tags = () => (
  <ul className="list--inline display__tags">
    {tags.map((tag) => (
      <li key={tag} className="list__item list__item--border">
        <SecondaryButton>{tag}</SecondaryButton>
      </li>
    ))}
  </ul>
);

export const SecondaryButton = ({ children, onClick }) => (
  <button
    className="button button--outline button--sm subtitle--sm button--border"
    onClick={onClick}
  >
    {children}
  </button>
);

export default Video;
