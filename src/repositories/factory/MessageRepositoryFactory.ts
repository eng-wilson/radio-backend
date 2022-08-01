import { Message } from "../../model/Message";
import { CreateMessageDTO, MessageRepository } from "../MessageRepository";

class MessageRepositoryFactory implements MessageRepository {
  private messages: Message[];
  private static INSTANCE: MessageRepositoryFactory;

  private constructor() {
    this.messages = [];
  }

  public static getInstance(): MessageRepositoryFactory {
    if (!MessageRepositoryFactory.INSTANCE) {
      MessageRepositoryFactory.INSTANCE = new MessageRepositoryFactory();
    }
    return MessageRepositoryFactory.INSTANCE;
  }

  send({ username, body, color }: CreateMessageDTO): Message[] {
    const message = new Message({ username, body, color });

    this.messages.push(message);

    return this.messages;
  }
  list(): Message[] {
    return this.messages;
  }
}

export { MessageRepositoryFactory };
