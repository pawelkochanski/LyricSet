import {ChatService} from '../../../../core/services/chat.service';
import {BandService} from '../../../../core/services/band.service';
import {AuthService} from '../../../../core/authentication/auth.service';
import {ChatComponent} from './chat.component';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AngularMaterialModule} from '../../../../shared/angular-material.module';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../../../../shared/shared.module';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {RouterTestingModule} from '@angular/router/testing';
import {ChatServiceSpecStub} from '../../../../core/services/chat.service.spec.stub';
import {BandServiceSpecStub} from '../../../../core/services/band.service.spec.stub';
import {AuthServiceSpecStub} from '../../../../core/authentication/auth.service.spec.stub';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {User} from '../../../../shared/interfaces/user';
import {Band} from '../../../../shared/interfaces/Band';

describe('ChatComponent', () => {
	let component: ChatComponent;
	let fixture: ComponentFixture<ChatComponent>;
	let chatService: ChatService;
	let bandService: BandService;
	let authService: AuthService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				AngularMaterialModule,
				FormsModule,
				ReactiveFormsModule,
				RouterTestingModule,
				SharedModule,
				DragDropModule
			],
			declarations: [ChatComponent],
			providers: [
				{provide: ChatService, useClass: ChatServiceSpecStub},
				{provide: BandService, useClass: BandServiceSpecStub},
				{provide: AuthService, useClass: AuthServiceSpecStub},
				FormBuilder
			],
			schemas: [NO_ERRORS_SCHEMA]
		}).compileComponents();
	});

	beforeEach(() => {
		chatService = TestBed.get(ChatService);
		bandService = TestBed.get(BandService);
		authService = TestBed.get(AuthService);
		bandService.activeBand = {id: '13'} as Band;
		bandService.user = {token: '1231213', displayname: 'asd', id: '13', avatarId: '13'} as User;
		authService.user.next({token: '1231213', displayname: 'asd', id: '13', avatarId: '13'} as User);
		fixture = TestBed.createComponent(ChatComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	test('should instantiate', () => {
		expect(component).toBeTruthy();
	});

	test('init', () => {
		const spy = jest.spyOn(chatService, 'receiveChat');
		component.ngOnInit();
		expect(spy).toHaveBeenCalled();
	});

	describe('OnSendClick', () => {
		test('should call sendChat if form valid', () => {
			component.messageForm.controls.messageInput.setValue('12314');
			const spy = jest.spyOn(chatService, 'sendChat');
			component.onSendClick();
			expect(spy).toHaveBeenCalled();
		});

		test('should not call sendChat if form invalid', () => {
			component.messageForm.setErrors({error: true});
			const spy = jest.spyOn(chatService, 'sendChat');
			component.onSendClick();
			expect(spy).not.toHaveBeenCalled();
		});
	});
	test('keyDownFunction should call onSendClick()', () => {
		const spy = jest.spyOn(component, 'onSendClick');
		component.keyDownFunction({
			keyCode: 13,
			shiftKey: false,
			preventDefault(): void {
			}
		} as KeyboardEvent);
		expect(spy).toHaveBeenCalled();
	});

	test('getDateFormat should return string', () => {
		expect(typeof component.getDateFormat(13)).toBe('string');

	});
});