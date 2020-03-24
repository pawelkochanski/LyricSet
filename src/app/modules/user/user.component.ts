import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MysetsService} from '../../core/services/mysets.service';
import {UserResponse} from '../../shared/interfaces/userResponse';
import {ErrorService} from '../../core/services/error.service';
import {BandService} from '../../core/services/band.service';
import {MatDialog} from '@angular/material';
import {AddToBandDialogComponent} from './components/add-to-band-dialog/add-to-band-dialog.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  user: UserResponse;
  isLoading = false;

  constructor(private readonly route: ActivatedRoute,
              private readonly setService: MysetsService,
              private readonly errorService: ErrorService,
              private readonly bandService: BandService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        if (params.id) {
          this.getUser(params.id);
        }
      }
    );
  }


  onInviteClick() {
    const dialogRef = this.dialog.open(AddToBandDialogComponent, {
      width: '350px',
      data: {
        userid: this.user.id
      }
    });
  }

  private getUser(userId: string): void {
    this.isLoading = true;
    this.setService.getUser(userId).subscribe(
      user => {
        this.user = user;
        this.isLoading = false;
        console.log(user);
      },
      error => {
        this.errorService.handleError(error);
      }
    );
  }
}
