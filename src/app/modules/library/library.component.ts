import {Component, OnDestroy, OnInit} from '@angular/core';
import {MysetsService} from '../../core/services/mysets.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit, OnDestroy {
  constructor(private readonly mysetsService: MysetsService) {
  }


  ngOnInit() {
    this.mysetsService.refreshSetlist();
    this.mysetsService.isGuestMode = false;
  }

  ngOnDestroy() {
    this.mysetsService.mysetlist = [];
    this.mysetsService.activeSet = null;
  }
}
