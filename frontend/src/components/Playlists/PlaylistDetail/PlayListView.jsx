const PlayListView = ({ name, videoList }) => (
  <>
    {videoList.length > 0 ? (
      <div className="playlist--details">
        <div className="playlist__thumbnail">
          <img
            className="img--responsive"
            src={videoList[0].thumbnailUrl}
            alt=""
          />
          <div className="playlist--overlay">
            <div>{videoList.length}</div>
            <img
              className="img--xs"
              src="https://img.icons8.com/fluent-systems-filled/48/ffffff/video-playlist.png"
              alt=""
            />
          </div>
        </div>
        <div className="playlist__name">
          <p>{name}</p>
          <p className="text--gray body--md">{videoList.length} videos</p>
        </div>
      </div>
    ) : (
      <></>
    )}
  </>
);

export default PlayListView;
