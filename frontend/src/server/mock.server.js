import { createServer, Model, RestSerializer } from "miragejs";
import { videoData, playlists, likedVideos, savedVideos } from "../database";

export default function setupMockServer() {
  createServer({
    serializers: {
      application: RestSerializer,
    },

    models: {
      video: Model,
      playlist: Model,
      like: Model,
      save: Model,
      history: Model,
    },

    routes() {
      this.namespace = "api";
      this.timing = 300;
      this.resource("videos");
      this.resource("playlists");
      this.resource("likes");
      this.resource("saves");
      this.resource("histories");
    },

    seeds(server) {
      videoData.forEach((video) => server.create("video", { ...video }));
      server.create("playlist", {
        ...playlists[0],
      });
      server.create("like", {
        ...likedVideos[0],
      });
      server.create("save", {
        ...savedVideos[0],
      });
      server.create("history", {
        ...likedVideos[0],
      });
    },
  });
}
