import {Component, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, tap} from 'rxjs/operators';
import {MysetsService} from '../services/mysets.service';
import {TrackResponse} from '../../shared/interfaces/search-track-response';
import {Constants} from '../../shared/constants';
import {error} from 'util';
import {ErrorService} from '../services/error.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  public byTitleSearchResult: TrackResponse[] = [];
  public byArtistSearchResult: TrackResponse[] = [];
  public userQuestion: string;
  userQuestionUpdate = new Subject<string>();
  public isLoading = false;
  public noResult = false;

  constructor(private readonly  mysetsService: MysetsService, private readonly errorService: ErrorService) {
    // Debounce search.
    this.userQuestionUpdate.pipe(
      debounceTime(400),
      tap(res => {
        this.isLoading = true;
        this.byTitleSearchResult = [];
        this.byArtistSearchResult = [];
        this.noResult = false;
      }),
      distinctUntilChanged())
      .subscribe(value => {
        this.mysetsService.quickSearch(this.userQuestion, Constants.searchBarPageSize, Constants.searchBarPage).subscribe(
          response => {
            console.log(response);
            this.isLoading = false;
            const byArtist = response.byArtist.track_list;
            const byTitle = response.byTitle.track_list;
            if (byArtist.length === 0 && byTitle.length === 0) {
              this.noResult = true;
              return;
            }
            byTitle.forEach(element => {
              this.byTitleSearchResult.push(element.track);
            });
            byArtist.forEach(element => {
              this.byArtistSearchResult.push(element.track);
            });
          },
          err => {
            this.isLoading = false;
            this.errorService.handleError(err);
          }
        );
      });
  }

  onInputFocusOut() {
    this.byTitleSearchResult = [];
    this.byArtistSearchResult = [];
  }

  ngOnInit() {
  }

}
