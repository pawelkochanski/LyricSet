import { MysetsService } from './../../../../core/services/mysets.service';
import { ErrorService } from './../../../../core/services/error.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { LyricSet } from './../../../../shared/interfaces/lyric-set';
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-set-header',
  templateUrl: './set-header.component.html',
  styleUrls: ['./set-header.component.scss']
})
export class SetHeaderComponent implements OnInit {

  @ViewChild('title', {static: false}) titleinput: ElementRef;
  @ViewChild('description', {static: false}) descinput: ElementRef;

  constructor(private readonly mySetsService: MysetsService,
              private router: Router,
              private readonly errorService: ErrorService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
  }

  changeMode() {
    if (this.mySetsService.isEditMode) {
      const name = this.titleinput.nativeElement.value;
      const desc = this.descinput.nativeElement.value;
      let changedFlag = false;
      if (name && this.mySetsService.activeSet.name !== name) {
        changedFlag = true;
      }
      if (desc && this.mySetsService.activeSet.description !== desc) {
        changedFlag = true;
      }
      if(changedFlag){
        this.mySetsService.updateActiveSet(name, desc);
      }

    }
    this.mySetsService.changeMode();
  }

  onRemoveSet() {
    this.mySetsService.removeSet(this.mySetsService.activeSet.id).subscribe(
      response => {
        this.mySetsService.refreshSetlist();
        this.mySetsService.activeSet = null;
       },
      error => {this.errorService.handleError(error); }
    );
  }
}
