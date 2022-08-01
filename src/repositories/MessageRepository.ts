import { Message } from "../model/Message";

interface CreateMessageDTO {
  username: string;
  body: string;
  color: string;
}

interface MessageRepository {
  send({ username, body, color }: CreateMessageDTO): Message[];
  list(): Message[];
}

export { CreateMessageDTO, MessageRepository };
