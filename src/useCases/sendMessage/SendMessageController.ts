import { Server } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { Message } from "../../model/Message";
import { SendMessageUseCase } from "./SendMessageUseCase";

class SendMessageController {
  private sendMessageUseCase: SendMessageUseCase;

  constructor(sendMessageUseCase: SendMessageUseCase) {
    this.sendMessageUseCase = sendMessageUseCase;
  }

  handle(
    { username, body, color }: Message,
    io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
  ): boolean {
    const messages = this.sendMessageUseCase.execute({ username, body, color });

    return io.emit("message", messages);
  }
}

export { SendMessageController };
