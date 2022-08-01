import { Server } from "socket.io";

import { httpServer } from "./http";
import { handlePlaylistData, handleVideoDuration } from "./utils";
import {
  sendMessageController,
  listMessagesController,
  nextVideoController,
  setPlaylistController,
} from "./useCases";
import { Message } from "./model/Message";

const io = new Server(httpServer);

let duration = 0;
let timer = 0;
let nowPlaying = "";

const getNowPlaying = async () => {
  try {
    const { items } = await handlePlaylistData();
    const playlist = setPlaylistController.handle(items);

    getVideoDuration(playlist[0].contentDetails.videoId);
  } catch (e) {
    console.log(e);
  }
};

const getVideoDuration = async (videoId) => {
  try {
    const videoDuration = await handleVideoDuration(videoId);
    duration = videoDuration;
  } catch (e) {
    console.log(e);
  }
};

getNowPlaying();

io.on("connection", async (socket) => {
  listMessagesController.handle(io);

  socket.emit("nowPlaying", nowPlaying, timer);

  socket.on("message", (message: Message) => {
    sendMessageController.handle(message, io);
  });

  socket.on("next", () => {
    nextVideoController.handle(io);
    timer = 0;
  });
});

setInterval(() => {
  timer += 1;

  if (timer === duration) {
    nextVideoController.handle(io);
    timer = 0;

    getVideoDuration(nowPlaying);
  }
}, 1000);
