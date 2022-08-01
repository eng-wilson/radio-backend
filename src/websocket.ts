import { Server } from "socket.io";

import { httpServer } from "./http";
import { handlePlaylistData, handleVideoDuration } from "./utils";
import { sendMessageController, listMessagesController, nextVideoController } from "./useCases";
import { Message } from "./model/Message";

const io = new Server(httpServer);

let duration = 0;
let timer = 0;
let videoPosition = 0;
let allVideos = [];
let nowPlaying = "";

const getNowPlaying = async () => {
  try {
    const data = await handlePlaylistData();
    allVideos = data.items;

    if (videoPosition < allVideos.length - 1) {
      const { videoId } = allVideos[videoPosition].contentDetails;

      videoPosition += 1;

      nowPlaying = videoId;
    } else {
      videoPosition = 0;

      const { videoId } = allVideos[videoPosition].contentDetails;

      nowPlaying = videoId;
    }

    getVideoDuration(nowPlaying);
    console.log(nowPlaying);
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
    nextVideoController.handle(io)
    timer = 0;
  });
});

setInterval(() => {
  timer += 1;

  if (timer === duration) {
    nextVideoController.handle(io)
    timer = 0;
    
    getVideoDuration(nowPlaying);
  }
}, 1000);
