import {Component, OnInit} from '@angular/core';
import {debounceTime} from 'rxjs/operators';
import {MysetsService} from '../services/mysets.service';
import {SearchBarResponse} from '../../shared/interfaces/search-track-response';
import {ErrorService} from '../services/error.service';
import {AppSettings} from '../../shared/AppSettings';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';

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

  constructor(private readonly  mysetsService: MysetsService,
              private readonly errorService: ErrorService,
              private readonly router: Router,
              private readonly fb: FormBuilder) {
  }

  onOptionSelect(value: string) {
    this.router.navigate(['/song', value]);
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
          this.handleValueChange(value);
        }
      );
  }

  handleValueChange(value: string): void {
    this.mysetsService.quickSearch(value, AppSettings.searchBarPageSize, AppSettings.searchBarPage)
      .subscribe(response => {
          console.log(response);
          this.searchResult = response;
          this.noResult = this.searchResult.byArtist.track_list.length === 0 && this.searchResult.byTitle.track_list.length === 0;
          this.isLoading = false;
        },
        error => {
          this.errorService.handleError(error);
          this.isLoading = false;
        });
  }

  onSearchClick() {
    if (this.searchFrom.controls.searchInput.value) {
      this.router.navigate(['/search', this.searchFrom.controls.searchInput.value]);
    }

  }
}
