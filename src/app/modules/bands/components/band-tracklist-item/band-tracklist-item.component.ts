import {Component, Input, OnInit} from '@angular/core';
import {BandService} from '../../../../core/services/band.service';
import {Track} from '../../../../shared/interfaces/track';

@Component({
  selector: 'app-band-tracklist-item',
  templateUrl: './band-tracklist-item.component.html',
  styleUrls: ['./band-tracklist-item.component.scss']
})
export class BandTracklistItemComponent implements OnInit {
  @Input() track: Track;

  constructor(private readonly bandSerivce: BandService) {
  }

  ngOnInit() {
  }

  OnRemoveClick() {
    this.bandSerivce.removeTrack(this.track);
  }

}
