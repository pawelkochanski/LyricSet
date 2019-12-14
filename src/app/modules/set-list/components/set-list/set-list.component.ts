import {Component, OnInit} from '@angular/core';
import {LyricSet} from '../../../../shared/models/LyricSet.model';
import {MysetsService} from '../../../../core/services/mysets.service';

@Component({
  selector: 'app-set-list',
  templateUrl: './set-list.component.html',
  styleUrls: ['./set-list.component.scss']
})
export class SetListComponent implements OnInit {
  mySetList: LyricSet[];

  constructor(private mysetsService: MysetsService) {
  }


  ngOnInit() {
    this.mySetList = this.mysetsService.mySetList;
  }

}
