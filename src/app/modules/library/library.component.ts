import {Component, OnInit} from '@angular/core';
import {MysetsService} from '../../core/services/mysets.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {

  title = 'Library';
  subscriptionSet: any;
  subscriptionTrack: any;
  selectedIndex = 0;
  isTracklistSelected = false;
  isTrackSelected = false;

  constructor(private mysetsService: MysetsService) {
    this.subscriptionSet = this.mysetsService.getActiveSetChangeEmitter().subscribe(() => this.onActiveSetChange());
    this.subscriptionTrack = this.mysetsService.getActiveTrackChangeEmitter().subscribe(() => this.onActiveTrackChange());
  }

  onActiveSetChange() {
    this.selectedIndexChange(1);
    this.isTracklistSelected = true;
    this.isTrackSelected = false;
  }

  onActiveTrackChange() {
    this.selectedIndexChange(2);
    this.isTrackSelected = true;
  }

  selectedIndexChange(val: number) {
    this.selectedIndex = val;
  }

  ngOnInit(): void {
  }


}
