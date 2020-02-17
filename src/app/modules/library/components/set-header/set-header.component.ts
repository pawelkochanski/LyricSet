import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MysetsService} from '../../../../core/services/mysets.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-set-header',
  templateUrl: './set-header.component.html',
  styleUrls: ['./set-header.component.scss']
})
export class SetHeaderComponent implements OnInit {

  @ViewChild('title', {static: false}) titleinput: ElementRef;
  @ViewChild('description', {static: false}) descinput: ElementRef;

  constructor(private readonly mySetsService: MysetsService, private router: Router) {
  }

  ngOnInit() {
  }

  changeMode() {
    if (this.mySetsService.isEditMode) {
      const name = this.titleinput.nativeElement.value;
      const desc = this.descinput.nativeElement.value;

      if (name) {
        this.mySetsService.activeSet.name = name;
      }
      if (desc) {
        this.mySetsService.activeSet.description = desc;
      }

    }
    this.mySetsService.changeMode();
  }

  onRemoveSet() {
    this.mySetsService.mysetlist.splice(this.mySetsService.getSetIndex(this.mySetsService.activeSet), 1);
    this.mySetsService.activeSet = null;
    this.router.navigate(['/library']);
  }
}
