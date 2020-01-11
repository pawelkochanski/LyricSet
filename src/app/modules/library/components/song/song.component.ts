import {Component, OnInit} from '@angular/core';
import {MysetsService} from '../../../../core/services/mysets.service';
import {Track} from '../../../../shared/interfaces';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.scss']
})
export class SongComponent implements OnInit {
  track: Track;
  subscription: any;

  constructor(private readonly mysetsService: MysetsService) {
  }

  ngOnInit() {
    this.subscription = this.mysetsService.getActiveTrackChangeEmitter().subscribe(track => (this.track = track));
  }

}
