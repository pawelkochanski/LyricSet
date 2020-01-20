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
      if (name === '' || desc === '') {
        this.mySetsService.changeMode();
        return;
      }
      this.mySetsService.activeSet.name = this.titleinput.nativeElement.value;
      this.mySetsService.activeSet.description = this.descinput.nativeElement.value;
    }
    this.mySetsService.changeMode();
  }
}
