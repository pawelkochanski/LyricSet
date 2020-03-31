import {Component, OnDestroy, OnInit} from '@angular/core';
import {ChatService} from '../../core/services/chat.service';
import {BandService} from '../../core/services/band.service';
import {ErrorService} from '../../core/services/error.service';
import {MysetsService} from '../../core/services/mysets.service';
import {Subscription} from 'rxjs';
import {AuthService} from '../../core/authentication/auth.service';
import {User} from '../../shared/interfaces/user';
import {MatDialog} from '@angular/material';
import {RouterOutlet} from '@angular/router';
import {routerTransition} from '../../router.animations';

@Component({
  selector: 'app-bands',
  templateUrl: './bands.component.html',
  animations: [routerTransition],
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
  }

  ngOnDestroy(): void {
    this.bandSerivce.activeBand = null;
  }

  getState(outlet: RouterOutlet) {
    return outlet.activatedRouteData.state;
  }
}
