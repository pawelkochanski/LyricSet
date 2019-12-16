import {Component, Input, OnInit} from '@angular/core';
import {Track} from '../../../../shared/models/Track.model';
import {MysetsService} from '../../../../core/services/mysets.service';

@Component({
  selector: 'app-track-list-item',
  templateUrl: './track-list-item.component.html',
  styleUrls: ['./track-list-item.component.scss']
})
export class TrackListItemComponent implements OnInit {
  @Input() track: Track;
  constructor(private mysetsService: MysetsService) { }

  ngOnInit() {
  }

  onTrackClicked(track: Track) {
    this.mysetsService.emitActiveTrackChange(track);
  }
}
