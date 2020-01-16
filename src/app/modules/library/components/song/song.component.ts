import {Component, OnInit} from '@angular/core';
import {MysetsService} from '../../../../core/services/mysets.service';
import {Track} from '../../../../shared/interfaces';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.scss']
})
export class SongComponent implements OnInit {
  track: Track;
  subscription: any;

  constructor(private readonly mysetsService: MysetsService, private route: ActivatedRoute) {
  }


  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        let activeSet = this.mysetsService.mysetlist.find((element) => {
          return element.name === params['set'];
        });
        this.track = activeSet.tracklist.find((element) => {
          return element.title === params['song'];
        })
      }
    );
  }

}
