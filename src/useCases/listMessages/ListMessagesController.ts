import { Server } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { ListMessagesUseCase } from "./ListMessagesUseCase";

class ListMessagesController {
  private listMessageUseCase: ListMessagesUseCase;

  constructor(listMessageUseCase: ListMessagesUseCase) {
    this.listMessageUseCase = listMessageUseCase;
  }

  handle(
    io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
  ): boolean {
    const messages = this.listMessageUseCase.execute();

    return io.emit("message", messages);
  }
}

export { ListMessagesController };
