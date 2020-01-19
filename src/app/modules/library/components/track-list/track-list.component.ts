import {Component, OnInit} from '@angular/core';
import {MysetsService} from '../../../../core/services/mysets.service';
import {LyricSet} from '../../../../shared/interfaces';
import {ActivatedRoute, Params} from '@angular/router';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-track-list',
  templateUrl: './track-list.component.html',
  styleUrls: ['./track-list.component.scss']
})
export class TrackListComponent implements OnInit {
  activeSet: LyricSet;

  constructor(private readonly mysetsService: MysetsService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.activeSet = this.mysetsService.mysetlist.find((element) => {
          return element.name === params.set;
        });
        this.mysetsService.setActiveSet(this.activeSet);
        this.mysetsService.setEditMode(false);
      }
    );
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.activeSet.tracklist, event.previousIndex, event.currentIndex);
    console.log(this.activeSet.tracklist);
  }
}
