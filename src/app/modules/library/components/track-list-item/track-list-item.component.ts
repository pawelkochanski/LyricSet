import {Component, Input, OnInit} from '@angular/core';
import {MysetsService} from '../../../../core/services/mysets.service';
import {Track} from '../../../../shared/interfaces/track';

@Component({
  selector: 'app-track-list-item',
  templateUrl: './track-list-item.component.html',
  styleUrls: ['./track-list-item.component.scss']
})
export class TrackListItemComponent implements OnInit {
  @Input() track: Track;

  constructor(private readonly mysetsService: MysetsService) {
  }

  ngOnInit() {
  }

  OnRemoveClick() {
    this.mysetsService.activeSet.tracklist.splice(this.mysetsService.getTrackIndex(this.track), 1);
  }
}
