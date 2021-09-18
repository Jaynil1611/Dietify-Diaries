const getNormalizedVideo = ({ videoId, ...rest }) => {
  return { ...rest, ...videoId._doc, __v: undefined };
};

const getNormalizedVideoList = (list) => {
  return list.map((video) => {
    return getNormalizedVideo(video._doc);
  });
};

module.exports = { getNormalizedVideo, getNormalizedVideoList };
