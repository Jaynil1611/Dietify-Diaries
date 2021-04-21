import { createServer, Model, RestSerializer } from "miragejs";
import { videoData, playlists, likedVideos } from "../database";

export default function setupMockServer() {
  createServer({
    serializers: {
      application: RestSerializer,
    },

    models: {
      video: Model,
      playlist: Model,
      like: Model,
    },

    routes() {
      this.namespace = "api";
      this.timing = 300;
      this.resource("videos");
      this.resource("playlists");
      this.resource("likes");
    },

    seeds(server) {
      videoData.forEach((video) => server.create("video", { ...video }));
      server.create("playlist", {
        ...playlists[0],
      });
      server.create("like", {
        ...likedVideos[0],
      });
    },
  });
}
