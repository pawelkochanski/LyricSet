import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {BandService} from '../../../../core/services/band.service';

@Component({
  selector: 'app-bad-tracklist',
  templateUrl: './bad-tracklist.component.html',
  styleUrls: ['./bad-tracklist.component.scss']
})
export class BadTracklistComponent implements OnInit {

  constructor(private bandService: BandService) { }

  ngOnInit() {
  }


  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.bandService.activeBand.tracklist, event.previousIndex, event.currentIndex);
  }

}
