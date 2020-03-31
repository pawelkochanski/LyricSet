import {Component, OnInit} from '@angular/core';
import {MysetsService} from '../../core/services/mysets.service';
import {LyricSet} from '../../shared/interfaces/lyric-set';
import {ErrorService} from '../../core/services/error.service';
import {AppSettings} from '../../shared/AppSettings';
import {SerachTrackResponse} from '../../shared/interfaces/search-track-response';

@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.scss']
})
export class PopularComponent implements OnInit {

  public topSets: LyricSet[];
  public topSongs: SerachTrackResponse;
  isLoading: any;

  constructor(private readonly setService: MysetsService,
              private readonly errorService: ErrorService) {
  }

  ngOnInit() {
    this.isLoading = true;
    this.setService.getTopSets(AppSettings.topSetsCount).subscribe(
      response => {
        this.topSets = response;
        this.setService.getTopSongs(AppSettings.topSongsCount).subscribe(
          resp => {
            this.topSongs = resp;
            console.log(resp);
            this.isLoading = false;
          },
          error1 => {
            console.log(error1);
            this.errorService.handleError(error1);
            this.isLoading = false;
          }
        );
      },
      error => {
        this.isLoading = false;
        this.errorService.handleError(error);
      }
    );
  }

}
