import {ReceiveMessage} from '../../shared/interfaces/messages';
import {of} from 'rxjs';

export class ChatServiceSpecStub {
	sendChat = () => {
	};
	receiveChat = () => of({} as ReceiveMessage);
	getUsers = () => of({});
	getMessages = () => of([] as ReceiveMessage[]);
	joinRoom = () => {
	};
	leaveRoom = () => {
	};

}