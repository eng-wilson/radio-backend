import { Message } from "../../model/Message";
import { MessageRepositoryFactory } from "../../repositories/factory";

interface Request {
  username: string;
  body: string;
  color: string;
}

class SendMessageUseCase {
  private messageRepositoryFactory: MessageRepositoryFactory;

  constructor(messageRepositoryFactory: MessageRepositoryFactory) {
    this.messageRepositoryFactory = messageRepositoryFactory;
  }

  execute({ username, body, color }: Request): Message[] {
    const messages = this.messageRepositoryFactory.send({
      username,
      body,
      color,
    });

    return messages;
  }
}

export { SendMessageUseCase };
