import {Component, OnInit} from '@angular/core';
import {Track} from '../../../../shared/models/Track.model';
import {MysetsService} from '../../../../core/services/mysets.service';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.scss']
})
export class SongComponent implements OnInit {
  track: Track;
  subscription: any;

  constructor(private mysetsService: MysetsService) {
  }

  ngOnInit() {
    this.subscription = this.mysetsService.getActiveTrackChangeEmitter().subscribe(track => (this.track = track));
  }

}
