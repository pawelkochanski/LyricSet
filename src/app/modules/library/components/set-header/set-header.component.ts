import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {MysetsService} from '../../../../core/services/mysets.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-set-header',
  templateUrl: './set-header.component.html',
  styleUrls: ['./set-header.component.scss']
})
export class SetHeaderComponent implements OnInit {

  @ViewChild('title', {static: false}) titleinput: ElementRef;
  @ViewChild('description', {static: false}) descinput: ElementRef;

  constructor(private readonly mySetsService: MysetsService) {
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
    this.mySetsService.activeSet = null;
    this.mySetsService.mysetlist.splice(this.mySetsService.getSetIndex(this.mySetsService.activeSet), 1);
  }
}
