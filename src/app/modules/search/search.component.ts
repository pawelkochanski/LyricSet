import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {SearchBarResponse} from '../../shared/interfaces/search-track-response';
import {MysetsService} from '../../core/services/mysets.service';
import {AppSettings} from '../../shared/AppSettings';
import {ErrorService} from '../../core/services/error.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  public searchResult: SearchBarResponse;
  public noArtistResult: boolean;
  public noTitleResult: boolean;
  public isLoading: boolean;

  constructor(private readonly route: ActivatedRoute,
              private readonly mysetsService: MysetsService,
              private readonly errorService: ErrorService) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.isLoading = true;
        this.mysetsService.quickSearch(params.query, 9999999, AppSettings.searchBarPage)
          .subscribe(response => {
              console.log(response);
              this.searchResult = response;
              this.noTitleResult =  this.searchResult.byTitle.track_list.length === 0;
              this.noArtistResult = this.searchResult.byArtist.track_list.length === 0;
              console.log(this.noArtistResult);
              console.log(this.noTitleResult);
              this.isLoading = false;
            },
            error => {
              this.errorService.handleError(error);
              this.isLoading = false;
            });
      }
    );
  }

}
