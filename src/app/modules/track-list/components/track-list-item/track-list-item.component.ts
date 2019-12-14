import {Component, Input, OnInit} from '@angular/core';
import {Track} from '../../../../shared/models/Track.model';

@Component({
  selector: 'app-track-list-item',
  templateUrl: './track-list-item.component.html',
  styleUrls: ['./track-list-item.component.scss']
})
export class TrackListItemComponent implements OnInit {
  @Input() track: Track;
  constructor() { }

  ngOnInit() {
  }

}
