import {Component} from '@angular/core';
import {MysetsService} from './core/services/mysets.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'LyricSett';
  subscription: any;
  selectedIndex = 0;
  isTracklistSelected = false;

  constructor(private mysetsService: MysetsService) {
    this.subscription = this.mysetsService.getActiveSetChangeEmitter().subscribe(() => this.onActiveSetChange());
  }

  onActiveSetChange() {
    this.selectedIndexChange(1);
    this.isTracklistSelected = true;
  }

  selectedIndexChange(val: number) {
    this.selectedIndex = val;
  }
}
