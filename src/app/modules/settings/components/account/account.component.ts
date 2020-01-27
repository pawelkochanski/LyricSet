import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {PasswordDialogComponent} from '../password-dialog/password-dialog.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  constructor(public dialog: MatDialog) {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PasswordDialogComponent, {
      width: '300px',
      data: {name: 'agakta', animal: 'szmatka'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  ngOnInit() {
  }

  onSubmit() {

  }
}
