import { MessageRepositoryFactory } from "../../repositories/factory";
import { SendMessageUseCase } from "./SendMessageUseCase";
import { SendMessageController } from "./SendMessageController";

const messageRepositoryFactory = MessageRepositoryFactory.getInstance();
const sendMessageUseCase = new SendMessageUseCase(messageRepositoryFactory);
const sendMessageController = new SendMessageController(sendMessageUseCase);

export { sendMessageController };
