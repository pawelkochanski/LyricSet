import {Component, OnInit} from '@angular/core';
import {MysetsService} from '../../../../core/services/mysets.service';
import {Track} from '../../../../shared/interfaces/track';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.scss']
})
export class SongComponent implements OnInit {
  track: Track;
  playMode: boolean;

  constructor(private readonly mysetsService: MysetsService, private route: ActivatedRoute) {
  }


  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.mysetsService.setActiveSet(this.mysetsService.mysetlist[params.setindex]);
        // this.track = this.set.tracklist[params.songindex];
      }
    );
    this.route.queryParams.subscribe((params: Params) => {
      this.playMode = params.playMode === '1';
      console.log(this.playMode);
    });
  }

  checkIfTrackIsLast() {
    // return this.mysetsService.getTrackIndex(this.track) === this.mysetsService.activeSet.tracklist.length - 1;
  }

  checkIfTrackIsFirst()  {
    // return this.mysetsService.getTrackIndex(this.track) === 0;
  }

  getNextSongIndex() {
    // return this.mysetsService.getTrackIndex(this.track) + 1;
  }

  getPreviousSongIndex() {
    // return this.mysetsService.getTrackIndex(this.track) - 1;
  }

}
