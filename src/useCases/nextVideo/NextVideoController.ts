import { Server } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { NextVideoUseCase } from './NextVideoUseCase';

class NextVideoController {
  private nextVideoUseCase: NextVideoUseCase

  constructor(nextVideoUseCase: NextVideoUseCase) {
    this.nextVideoUseCase = nextVideoUseCase
  }

  handle(io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>): boolean {
    const nextVideo = this.nextVideoUseCase.execute()

    return io.emit("nowPlaying", nextVideo)
  }
}

export { NextVideoController }