import {SearchComponent} from './search.component';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AngularMaterialModule} from '../../shared/angular-material.module';
import {RouterTestingModule} from '@angular/router/testing';
import {Component} from '@angular/core';
import {MysetsService} from '../../core/services/mysets.service';
import {MysetsServiceSpecStub} from '../../core/services/mysets.service.spec.stub';
import {ErrorService} from '../../core/services/error.service';
import {ActivatedRoute} from '@angular/router';
import {of, throwError} from 'rxjs';

@Component({
	template: ''
})
class DummyComponent {

}


describe('Search Component', () => {

	const mockSearchResult = {
		byTitle: {
			track_list: [{
				track: {
					track_id: 1,
					track_name: 'name',
					artist_id: '1',
					artist_name: 'name'
				}
			}]
		},
		byArtist: {
			track_list: [{
				track: {
					track_id: 1,
					track_name: 'name',
					artist_id: '1',
					artist_name: 'name'
				}
			}]
		},
		users: [
			{
				displayname: 'display',
				bio: '',
				url: '',
				id: '',
				avatarId: ''
			}
		]
	};


	let component: SearchComponent;
	let fixture: ComponentFixture<SearchComponent>;
	let setService: MysetsService;
	let errorService: ErrorService;
	beforeEach(() => {
		TestBed.configureTestingModule(
			{
				imports: [AngularMaterialModule, RouterTestingModule.withRoutes([
					{path: 'song/:id', component: DummyComponent},
					{path: 'user/:id', component: DummyComponent}
				])
				],
				declarations: [SearchComponent, DummyComponent],
				providers: [
					{provide: MysetsService, useClass: MysetsServiceSpecStub},
					{
						provide: ErrorService, useClass: class {
							handleError = jest.fn();
						}
					},
					{
						provide: ActivatedRoute, useValue: {
							params: of({
								query: 'siema'
							})
						}
					}
				]
			}
		).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(SearchComponent);
		component = fixture.componentInstance;
		setService = TestBed.get(MysetsService);
		errorService = TestBed.get(ErrorService);
		fixture.detectChanges();
	});

	test('should instantiate', () => {
		expect(component).toBeTruthy();
	});

	describe('init', () => {

		test('should set searchResult on ok response', () => {
			jest.spyOn(setService, 'quickSearch').mockReturnValue(of(mockSearchResult));
			component.ngOnInit();
			expect(component.searchResult).toEqual(mockSearchResult);
		});

		test('should call handleError on error response', () => {
			jest.spyOn(setService, 'quickSearch').mockReturnValue(throwError(new Error()));
			component.ngOnInit();
			expect(errorService.handleError).toHaveBeenCalled();
		});

	});
});
