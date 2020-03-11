import { Component, OnInit } from '@angular/core';
import {Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  public consoleMessages: string[] = [];
  public userQuestion: string;
  userQuestionUpdate = new Subject<string>();

  constructor() {
    // Debounce search.
    this.userQuestionUpdate.pipe(
      debounceTime(400),
      distinctUntilChanged())
      .subscribe(value => {
        this.consoleMessages.push(value);
      });
  }

  ngOnInit() {
  }

}
