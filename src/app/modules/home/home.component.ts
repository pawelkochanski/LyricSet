import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  content: string[] = [];
  isLoading: boolean;
  swipe = false;

  constructor() {
  }

  ngOnInit() {
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async changeLoading() {
    this.isLoading = true;
    await this.delay(300);
    this.isLoading = false;
    this.content = ['Lorem Ipsum', 'Lorem Ipsum', 'Lorem ipsum', 'Lorem Ipsum',
      'Lorem Ipsum', 'Lorem ipsum', 'Lorem Ipsum', 'Lorem Ipsum', 'Lorem ipsum'];

  }

}
