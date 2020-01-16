import {Component, OnInit} from '@angular/core';
import {MysetsService} from '../../../../core/services/mysets.service';
import {LyricSet} from '../../../../shared/interfaces';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-track-list',
  templateUrl: './track-list.component.html',
  styleUrls: ['./track-list.component.scss']
})
export class TrackListComponent implements OnInit {
  activeSet: LyricSet;

  constructor(private readonly mysetsService: MysetsService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.activeSet = this.mysetsService.mysetlist.find((element) => {
          return element.name === params['set'];
        });
      }
    );
  }


}
