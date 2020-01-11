import {Component, OnInit} from '@angular/core';
import {MysetsService} from '../../../../core/services/mysets.service';
import {LyricSet} from '../../../../shared/interfaces';

@Component({
  selector: 'app-set-list',
  templateUrl: './set-list.component.html',
  styleUrls: ['./set-list.component.scss']
})
export class SetListComponent implements OnInit {
  mySetList: LyricSet[];

  constructor(private readonly mysetsService: MysetsService) {
  }


  ngOnInit() {
    this.mySetList = this.mysetsService.mysetlist;
  }

}
