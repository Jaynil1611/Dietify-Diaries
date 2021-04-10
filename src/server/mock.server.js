import { createServer, Model, RestSerializer } from "miragejs";
import { videoData, playlists } from "../database";

export default function setupMockServer() {
  createServer({
    serializers: {
      application: RestSerializer,
    },

    models: {
      video: Model,
      playlist: Model,
    },

    routes() {
      this.namespace = "api";
      this.timing = 300;
      this.resource("videos");
      this.resource("playlists");
    },

    seeds(server) {
      videoData.forEach((video) => server.create("video", { ...video }));
      server.create("playlist", {
        ...playlists[0],
      });
    },
  });
}
