import {Component, OnInit} from '@angular/core';
import {MysetsService} from '../../../../core/services/mysets.service';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-set-header',
  templateUrl: './set-header.component.html',
  styleUrls: ['./set-header.component.scss']
})
export class SetHeaderComponent implements OnInit {

  constructor(private readonly mySetsService: MysetsService, private route: ActivatedRoute) {
  }

  ngOnInit() {
  }

  changeMode() {
    this.mySetsService.changeMode();
  }
}
