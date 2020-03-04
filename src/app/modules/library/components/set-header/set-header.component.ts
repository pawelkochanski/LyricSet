import { ErrorService } from './../../../../core/services/error.service';
import { MysetsService } from 'app/core/services/mysets.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { LyricSet } from './../../../../shared/interfaces/lyric-set';
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-set-header',
  templateUrl: './set-header.component.html',
  styleUrls: ['./set-header.component.scss']
})
export class SetHeaderComponent implements OnInit {

  @ViewChild('title', {static: false}) titleinput: ElementRef;
  @ViewChild('description', {static: false}) descinput: ElementRef;

  set: LyricSet;
  activesetSub: Subscription;

  constructor(private readonly mySetsService: MysetsService,
              private router: Router,
              private readonly errorService: ErrorService) {
  }

  ngOnInit() {
    this.activesetSub = this.mySetsService.activeSet.subscribe(set => {this.set = set; });
  }

  changeMode() {
    if (this.mySetsService.isEditMode) {
      const name = this.titleinput.nativeElement.value;
      const desc = this.descinput.nativeElement.value;
      let changedFlag = false;

      if (name) {
        this.set.name = name;
        changedFlag = true;
      }
      if (desc) {
        changedFlag = true;
        this.set.description = desc;
      }

    }
    this.mySetsService.changeMode();
  }

  onRemoveSet() {
    this.mySetsService.removeSet(this.set.id).subscribe(
      response => {
        this.mySetsService.getMySetList().subscribe(
          response => {
            this.mySetsService.setMySetList(response);
          },
          error => {this.errorService.handleError(error); }
        );
        this.router.navigate(['/library']); },
      error => {this.errorService.handleError(error); }
    );
  }
}
