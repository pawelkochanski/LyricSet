import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {User} from '../../../../shared/interfaces/user';
import {ChatService} from '../../../../core/services/chat.service';
import {BandService} from '../../../../core/services/band.service';
import {ErrorService} from '../../../../core/services/error.service';
import {MysetsService} from '../../../../core/services/mysets.service';
import {AuthService} from '../../../../core/authentication/auth.service';
import {MatDialog} from '@angular/material';
import {MemberRoles} from '../../../../shared/interfaces/Band';
import {CreateBandDialogComponent} from '../create-band-dialog/create-band-dialog.component';

@Component({
  selector: 'app-band-list',
  templateUrl: './band-list.component.html',
  styleUrls: ['./band-list.component.scss']
})
export class BandListComponent implements OnInit {


  private userSub: Subscription;
  public user: User;
  isLoading: boolean;

  constructor(private chatService: ChatService,
              private readonly bandSerivce: BandService,
              private readonly errorService: ErrorService,
              private readonly setService: MysetsService,
              private readonly authService: AuthService,
              public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.bandSerivce.refreshBandlist();
    this.userSub = this.authService.user.subscribe(
      user => {
        this.user = user;
      }
    );
  }
  amILeader(band): boolean {
    const member = band.members.find(element => element.userId === this.user.id);
    if (!member) {
      return false;
    }
    return member.role === MemberRoles.Leader;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateBandDialogComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.bandSerivce.refreshBandlist();
    });
  }

}
