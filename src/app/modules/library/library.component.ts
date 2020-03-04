import { ErrorService } from './../../core/services/error.service';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {MysetsService} from '../../core/services/mysets.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit, OnDestroy {
  constructor(private readonly mysetsService: MysetsService,
              private readonly errorService: ErrorService) {
  }

  isLoading = true;

  ngOnInit() {
    this.mysetsService.getMySetList().subscribe(response => {
    this.mysetsService.setMySetList(response);
    this.isLoading = false;
    }, error => {
      this.errorService.handleError(error);
    });
  }

  ngOnDestroy() {
    this.mysetsService.mysetlist = [];
  }
}
