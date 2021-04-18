const getDuration = (duration) => {
  const time_extractor = /([0-9]*H)?([0-9]*M)?([0-9]*S)?$/;
  const extracted = time_extractor.exec(duration);
  const hours = parseInt(extracted[1], 10) || 0;
  const minutes = parseInt(extracted[2], 10) || 0;
  const seconds = parseInt(extracted[3], 10) || 0;
  return `${hours > 0 ? hours.toString() + ":" : ""}${
    minutes > 0 ? minutes.toString() + ":" : ""
  }${seconds < 10 ? "0" + seconds.toString() : seconds}`;
};

const getPublishedDate = (date) => {
  date = new Date(date);
  const options = { month: "short", day: "numeric", year: "numeric" };
  return date.toLocaleDateString("en-GB", options).toString();
};

const getVideoDetails = (videoId, videoList) => {
  return videoList.find(({ id }) => id === videoId);
};

export { getDuration, getPublishedDate, getVideoDetails };
