import { Server } from 'socket.io';

import { httpServer } from './http';
import { handleData } from './utils';
import fetch from 'node-fetch';

const io = new Server(httpServer);

interface Message {
  username: string;
  body: string;
}

let timer = 0;
let videoPosition = 0;
let nowPlaying = '';

const history: Message[] = [];

io.on('connection', async (socket) => {
  const data = await handleData();
  const { items } = data;

  if (videoPosition < items.length - 1) {
    const { videoId } = items[videoPosition].contentDetails;

    console.log(videoId);

    nowPlaying = videoId;
  } else {
    videoPosition = 0;

    const { videoId } = items[videoPosition].contentDetails;

    nowPlaying = videoId;
  }

  io.emit('message', history);

  socket.emit('nowPlaying', nowPlaying);

  socket.on('message', (message: Message) => {
    history.push(message);

    console.log(message);

    io.emit('message', history);
  });
});
