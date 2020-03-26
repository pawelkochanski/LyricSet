import {Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {ReceiveMessage, SendMessage} from '../../shared/interfaces/messages';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private socket: Socket) {
  }

  sendChat(message: SendMessage) {
    this.socket.emit('chat', message);
  }

  receiveChat(): Observable<ReceiveMessage> {
    return this.socket.fromEvent('chat');
  }

  getUsers() {
    return this.socket.fromEvent('users');
  }

  getMessages(): Observable<ReceiveMessage[]> {
    return this.socket.fromEvent('messages');
  }

  joinRoom(message: SendMessage) {
    return this.socket.emit('joinRoom', message);
  }

  leaveRoom(message: SendMessage) {
    return this.socket.emit('leaveRoom', message);
  }
}
