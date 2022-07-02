import { Server } from 'socket.io';

import { httpServer } from './http';

const io = new Server(httpServer);

interface Message {
  username: string;
  body: string;
}

const history: Message[] = [];

io.on('connection', (socket) => {
  io.emit('message', history);

  socket.on('message', (message: Message) => {
    history.push(message);

    io.emit('message', history);
  });
});
