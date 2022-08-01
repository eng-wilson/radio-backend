import { v4 as uuidv4 } from "uuid";

class Message {
  id?: string;
  username: string;
  body: string;
  color: string;

  constructor({ username, body, color }: Message) {
    this.id = uuidv4();
    this.username = username;
    this.body = body;
    this.color = color;
  }
}

export { Message };
