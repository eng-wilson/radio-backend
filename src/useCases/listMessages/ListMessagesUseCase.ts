import { Message } from "../../model/Message";
import { MessageRepositoryFactory } from "../../repositories/factory";

class ListMessagesUseCase {
  private messageRepositoryFactory: MessageRepositoryFactory;

  constructor(messageRepositoryFactory: MessageRepositoryFactory) {
    this.messageRepositoryFactory = messageRepositoryFactory;
  }

  execute(): Message[] {
    const messages = this.messageRepositoryFactory.list();

    return messages;
  }
}

export { ListMessagesUseCase };
