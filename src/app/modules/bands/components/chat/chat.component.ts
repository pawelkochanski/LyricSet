import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ChatService} from '../../../../core/services/chat.service';
import {BandService} from '../../../../core/services/band.service';
import {Subscription} from 'rxjs';
import {User} from '../../../../shared/interfaces/user';
import {AuthService} from '../../../../core/authentication/auth.service';
import {ReceiveMessage, SendMessage} from '../../../../shared/interfaces/messages';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
	selector: 'app-chat',
	templateUrl: './chat.component.html',
	styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

	@ViewChild('scrollMe', {static: false}) scroll: ElementRef;
	public messages: ReceiveMessage[] = [];
	public message: string;
	public messageForm: FormGroup;
	private userSub: Subscription;
	private user: User;

	constructor(private readonly chatService: ChatService,
	            private readonly bandService: BandService,
	            private readonly authService: AuthService,
	            private fb: FormBuilder) {
	}


	getDateFormat(date: number): string {
		const d = new Date(date);
		const minutes = d.getMinutes();
		const stringMinutes = minutes > 10 ? `${minutes}` : `0${minutes}`;
		const hours = d.getHours();
		const stringHours = hours > 10 ? `${hours}` : `0${hours}`;
		return `${d.getMonth() + 1}.${d.getDate()}.${d.getFullYear()} ${stringHours}:${stringMinutes}`;
	}

	ngOnInit() {
		this.messageForm = this.fb.group({
			messageInput: ['', [Validators.required]],
		});
		this.messages = [];
		this.userSub = this.authService.user.subscribe(
			res => {
				this.user = res;
			}
		);
		this.chatService.receiveChat().subscribe(
			(mes: ReceiveMessage) => {
				this.messages.push(mes);
			}
		);
		this.chatService.getUsers().subscribe(
			(mes: ReceiveMessage) => {
				this.messages.push(mes);
			}
		);
		this.chatService.joinRoom({
			content: '',
			token: this.bandService.user.token,
			toChannel: this.bandService.activeBand.id
		});
		this.chatService.getMessages().subscribe(
			messages => {
				this.messages = messages;
			}
		);
	}

	onSendClick() {
		if (!this.messageForm.valid) {
			return;
		}
		const message: SendMessage = {
			content: this.messageForm.controls.messageInput.value,
			token: this.bandService.user.token,
			toChannel: this.bandService.activeBand.id
		};
		this.chatService.sendChat(message);
		this.messages.push({
			displayname: this.user.displayname,
			content: message.content,
			userId: this.user.id,
			avatarId: this.user.avatarId,
			date: Date.now()
		});
		this.messageForm.controls.messageInput.setValue('');
	}

	ngOnDestroy(): void {
		this.userSub.unsubscribe();
		this.chatService.leaveRoom({
			content: '',
			token: this.bandService.user.token,
			toChannel: this.bandService.activeBand.id
		});
	}

	keyDownFunction(event: KeyboardEvent): void {
		if (event.keyCode === 13 && !event.shiftKey) {
			event.preventDefault();
			this.onSendClick();
			return;
		}
	}

}
