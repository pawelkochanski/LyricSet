import {Component, OnInit} from '@angular/core';
import {debounceTime} from 'rxjs/operators';
import {MysetsService} from '../services/mysets.service';
import {SearchBarResponse} from '../../shared/interfaces/search-track-response';
import {ErrorService} from '../services/error.service';
import {AppSettings} from '../../shared/AppSettings';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Track} from '../../shared/interfaces/track';
import {UserResponse} from '../../shared/interfaces/userResponse';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  public searchFrom: FormGroup;
  public searchResult: SearchBarResponse;
  public noResult: boolean;
  public isLoading: boolean;
  isAutocomplete: boolean;

  constructor(private readonly  mysetsService: MysetsService,
              private readonly errorService: ErrorService,
              private readonly router: Router,
              private readonly fb: FormBuilder) {
  }

  ngOnInit() {
    this.searchFrom = this.fb.group({
      searchInput: null
    });
    this.noResult = false;


    this.searchFrom.controls.searchInput.valueChanges
      .pipe(debounceTime(300))
      .subscribe(
        value => {
          this.isLoading = true;
          this.searchResult = null;
          this.handleValueChange(value);
        }
      );
  }

  handleValueChange(value: string): void {
    this.mysetsService.quickSearch(value, AppSettings.searchBarPageSize, AppSettings.searchBarPage)
      .subscribe(response => {
          console.log(response);
          this.searchResult = response;
          this.noResult = this.searchResult.byArtist.track_list.length === 0
            && this.searchResult.byTitle.track_list.length === 0
            && this.searchResult.users.length === 0;
          this.isLoading = false;
        },
        error => {
          this.errorService.handleError(error);
          this.isLoading = false;
        });
  }

  onSearchClick(): void {
    if (this.searchFrom.controls.searchInput.value) {
      this.router.navigate(['/search', this.searchFrom.controls.searchInput.value]);
    }

  }

  onSongClick(track: Track): void {
    this.searchFrom.controls.searchInput.setValue(`${track.track_name}`);
    this.router.navigate(['/song', track.track_id]);
  }

  onUserClick(element: UserResponse): void {
    this.searchFrom.controls.searchInput.setValue(`${element.displayname}`);
    this.router.navigate(['/user', element.id]);
  }

  async onInputFocusIn(): Promise<void> {
    this.isAutocomplete = true;
    this.isLoading = false;
  }

  async onInputFocusOut(): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 500));
    this.isAutocomplete = false;
  }
}
