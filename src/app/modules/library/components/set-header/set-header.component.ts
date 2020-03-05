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
      let name = this.mySetsService.activeSet.name;
      let desc = this.mySetsService.activeSet.description;
      const tracklist = this.mySetsService.activeSet.tracklist;
      let changedFlag = false;
      const nameInput = this.titleinput.nativeElement.value;
      const descInput = this.descinput.nativeElement.value;
      // tslint:disable-next-line: no-debugger
      debugger;
      if (nameInput !== '' && nameInput !== name) {
        changedFlag = true;
        name = nameInput;
      }
      if (descInput !== '' && descInput !== desc) {
        changedFlag = true;
        desc = descInput;
      }
      if (changedFlag) {
        this.mySetsService.updateActiveSet(name, desc, tracklist)
        .subscribe(response => { },
          error => {this.errorService.handleError(error); });
      }

    }
    this.mySetsService.changeMode();
  }

  onRemoveSet() {
    this.mySetsService.isLoading = true;
    this.mySetsService.removeSet(this.mySetsService.activeSet.id).subscribe(
      response => {
        this.mySetsService.isLoading = false;
        this.mySetsService.refreshSetlist();
        this.mySetsService.activeSet = null;
        this.router.navigate(['library']);
       },
      error => {this.errorService.handleError(error); }
    );
  }
}
