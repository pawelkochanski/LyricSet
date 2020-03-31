import {Component, Input, OnInit} from '@angular/core';
import {MysetsService} from '../../../core/services/mysets.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-track-list',
  templateUrl: './track-list.component.html',
  styleUrls: ['./track-list.component.scss']
})
export class TrackListComponent implements OnInit {

  constructor(private readonly mysetsService: MysetsService,
              private route: ActivatedRoute,
              private readonly router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        console.log(this.route);
        this.mysetsService.handleParamSetId(params.setid);
        this.mysetsService.getSet(params.setid);
      }
    );
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.mysetsService.activeSet.tracklist, event.previousIndex, event.currentIndex);
    console.log(this.mysetsService.activeSet.tracklist);
  }
}
