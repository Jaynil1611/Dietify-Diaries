import { callMockServer } from "../server";
// import { actions } from "../reducers";
// import { videoData } from "./videoDataModel";

async function createDatabase(dispatch) {
  // const { response: playlistResponse, error } = await fetchDataFromURL(
  //   getPlaylistURL("PLEpwurODsrVMtU5aDhkzOwcVFATR6DBsC")
  // );
  // if (!error) {
  //   const videoIds = playlistResponse.data.items.map((item) => {
  //     return {
  //       id: item.contentDetails.videoId,
  //     };
  //   });
  // const videoList = await videoIds.reduce(async (result, { id }) => {
  //   const { response: videoResponse, error } = await fetchDataFromURL(
  //     getVideoURL(id)
  //   );
  //   if (!error) {
  //     const res = await result;
  //     return [...res, getVideoDetails(videoResponse.data.items[0])];
  //   }
  //   return result;
  // }, []);
  // console.log(videoList);
  // dispatch({
  //   type: actions.INITIALIZE_LIST,
  //   payload: {
  //     name: "videoList",
  //     // data: videoList,
  //     data: videoData,
  //   },
  // });
}

// const fetchDataFromURL = (url) => {
//   return callMockServer({ type: "get", url });
// };

// const videoIds = [
//   { id: "yTt8WPRNLco" },
//   { id: "UP4m4d7uje0" },
//   { id: "U_l75ABauHw" },
//   { id: "gNPPpmNEHDY" },
//   { id: "GW7ik6G0uZM" },
//   { id: "yI3oPMZ1ETc" },
//   { id: "eiMZbLiKZZI" },
//   { id: "4Sb_XPECuWw" },
//   { id: "XnagWZ99jpM" },
//   { id: "03f7uqvLrDs" },
//   { id: "7n0vy6bIW8E" },
//   { id: "qH5FpREDao4" },
//   { id: "9f3j_MVDYwg" },
//   { id: "Hmv2eQGX_Rw" },
//   { id: "oxrO-Q0HKWg" },
//   { id: "HUOpkwbDM-c" },
//   { id: "eKrUQFELktk" },
//   { id: "uRIpRAqzVUg" },
//   { id: "af8zzqb4Jnw" },
//   { id: "yAhexTqHgdY" },
//   { id: "gG9BXBb-tew" },
// ];

// const getPlaylistURL = (playlistId) =>
//   `https://youtube.googleapis.com/youtube/v3/playlistItems?part=contentDetails&maxResults=30&playlistId=${playlistId}&key=${process.env.REACT_APP_API_KEY}`;

// const getVideoURL = (videoId) =>
//   `https://youtube.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet,contentDetails,statistics,status&key=${process.env.REACT_APP_API_KEY}`;

// const getVideoDetails = ({ id, snippet, statistics, contentDetails }) => {
//   const {
//     publishedAt,
//     channelId,
//     title,
//     description,
//     thumbnails: {
//       high: { url: thumbnailUrl },
//     },
//     channelTitle,
//     tags,
//   } = snippet;
//   const { duration, dimension, definition } = contentDetails;
//   return {
//     id,
//     publishedAt,
//     channelId,
//     title,
//     description,
//     thumbnailUrl,
//     channelTitle,
//     tags,
//     duration,
//     dimension,
//     definition,
//     ...statistics,
//   };
// };

export default createDatabase;
