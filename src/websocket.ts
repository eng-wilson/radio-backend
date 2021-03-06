import { Server } from 'socket.io';

import { httpServer } from './http';
import { handlePlaylistData, handleVideoDuration } from './utils';

const io = new Server(httpServer);

interface Message {
  username: string;
  body: string;
  color: string;
}

let duration = 0;
let timer = 0;
let videoPosition = 0;
let allVideos = [];
let nowPlaying = '';

const history: Message[] = [];

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

io.on('connection', async (socket) => {
  io.emit('message', history);

  socket.emit('nowPlaying', nowPlaying, timer);

  socket.on('message', (message: Message) => {
    history.push(message);
    if (history.length > 100) {
      history.shift();
    }

    io.emit('message', history);
  });

  socket.on('next', () => {
    videoPosition += 1;

    const { videoId } = allVideos[videoPosition].contentDetails;

    nowPlaying = videoId;
    timer = 0;

    io.emit('nowPlaying', nowPlaying);
  });
});

setInterval(() => {
  timer += 1;

  if (timer === duration) {
    videoPosition += 1;

    if (videoPosition === allVideos.length - 1) {
      videoPosition = 0;
    }

    const { videoId } = allVideos[videoPosition].contentDetails;

    nowPlaying = videoId;
    timer = 0;

    getVideoDuration(nowPlaying);

    io.emit('nowPlaying', nowPlaying);
  }
}, 1000);
