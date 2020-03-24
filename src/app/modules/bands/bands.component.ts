import {Component, OnDestroy, OnInit} from '@angular/core';
import {ChatService} from '../../core/services/chat.service';
import {BandService} from '../../core/services/band.service';
import {ErrorService} from '../../core/services/error.service';
import {MysetsService} from '../../core/services/mysets.service';
import {Subscription} from 'rxjs';
import {AuthService} from '../../core/authentication/auth.service';
import {User} from '../../shared/interfaces/user';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-bands',
  templateUrl: './bands.component.html',
  styleUrls: ['./bands.component.scss']
})
export class BandsComponent implements OnInit, OnDestroy {


  public user: User;
  isLoading: boolean;

  constructor(private chatService: ChatService,
              private readonly bandSerivce: BandService,
              public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.bandSerivce.refreshBandlist();
  }

  ngOnDestroy(): void {
    this.bandSerivce.activeBand = null;
  }

}
