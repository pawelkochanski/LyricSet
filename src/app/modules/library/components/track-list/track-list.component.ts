import { LyricSet } from './../../../../shared/interfaces/lyric-set';
import {Component, OnInit} from '@angular/core';
import {MysetsService} from '../../../../core/services/mysets.service';
import {ActivatedRoute, Params} from '@angular/router';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-track-list',
  templateUrl: './track-list.component.html',
  styleUrls: ['./track-list.component.scss']
})
export class TrackListComponent implements OnInit {

  constructor(private readonly mysetsService: MysetsService, private route: ActivatedRoute) {
  }

  activesetSub: Subscription;
  set: LyricSet;
  ngOnInit() {
    this.activesetSub = this.mysetsService.activeSet.subscribe(set => {this.set = set; });
    this.route.params.subscribe(
      (params: Params) => {
        console.log(this.mysetsService.getSet(params.setid));
        this.mysetsService.setActiveSet(this.mysetsService.getSet(params.setid));
        this.mysetsService.setEditMode(false);
      }
    );
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.set.tracklist, event.previousIndex, event.currentIndex);
    console.log(this.set.tracklist);
  }
}
