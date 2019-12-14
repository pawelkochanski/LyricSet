import {Component, Input, OnInit,} from '@angular/core';
import {LyricSet} from '../../../../shared/models/LyricSet.model';
import {MysetsService} from '../../../../core/services/mysets.service';

@Component({
  selector: 'app-set-list-item',
  templateUrl: './set-list-item.component.html',
  styleUrls: ['./set-list-item.component.scss']
})
export class SetListItemComponent implements OnInit {
  @Input() set: LyricSet;

  constructor(private mysetsService: MysetsService) {
  }

  ngOnInit() {
  }

  onItemClicked() {
    this.mysetsService.emitActiveSetChange(this.set);
  }
}
