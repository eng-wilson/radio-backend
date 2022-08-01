import { MessageRepositoryFactory } from "../../repositories/factory";
import { ListMessagesUseCase } from "./ListMessagesUseCase";
import { ListMessagesController } from "./ListMessagesController";

const messageRepositoryFactory = MessageRepositoryFactory.getInstance();
const listMessagesUseCase = new ListMessagesUseCase(messageRepositoryFactory);
const listMessagesController = new ListMessagesController(listMessagesUseCase);

export { listMessagesController };
