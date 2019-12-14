import {Component, OnInit, OnDestroy} from '@angular/core';
import {MysetsService} from '../../../../core/services/mysets.service';
import {LyricSet} from '../../../../shared/models/LyricSet.model';

@Component({
  selector: 'app-track-list',
  templateUrl: './track-list.component.html',
  styleUrls: ['./track-list.component.scss']
})
export class TrackListComponent implements OnInit, OnDestroy {
  activeSet: LyricSet;
  subscription: any;

  constructor(private mysetsService: MysetsService) {
  }

  ngOnInit() {
    this.subscription = this.mysetsService.getActiveSetChangeEmitter().subscribe(set => (this.activeSet = set));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
