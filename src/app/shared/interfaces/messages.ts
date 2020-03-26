export interface SendMessage {
  content: string;
  token: string;
  toChannel: string;
}

export interface ReceiveMessage {
  content: string;
  displayname: string;
  date: number;
  avatarId: string;
  userId: string;
}
