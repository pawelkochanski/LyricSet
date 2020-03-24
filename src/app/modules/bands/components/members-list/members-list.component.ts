import { Component, OnInit } from '@angular/core';
import {BandService} from '../../../../core/services/band.service';
import {MysetsService} from '../../../../core/services/mysets.service';

@Component({
  selector: 'app-members-list',
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.scss']
})
export class MembersListComponent implements OnInit {

  constructor(private readonly bandService: BandService,
              private readonly setService: MysetsService) { }

  ngOnInit() {
  }

}
