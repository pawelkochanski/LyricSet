import {MysetsService} from '../../../../core/services/mysets.service';
import {ErrorService} from '../../../../core/services/error.service';
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {environment} from '../../../../../environments/environment';
import {CropperComponent} from '../../../../shared/components/cropper/cropper.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-set-header',
  templateUrl: './set-header.component.html',
  styleUrls: ['./set-header.component.scss']
})
export class SetHeaderComponent implements OnInit {

  @ViewChild('title', {static: false}) titleinput: ElementRef;
  @ViewChild('description', {static: false}) descinput: ElementRef;
  imageUrl: string;

  constructor(private readonly mySetsService: MysetsService,
              private readonly router: Router,
              private readonly errorService: ErrorService,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.imageUrl = environment.apiUrl + this.mySetsService.activeSet.imageId;
  }

  onRemoveSet(): void {
    this.mySetsService.isLoading = true;
    this.mySetsService.removeSet(this.mySetsService.activeSet.id).subscribe(
      response => {
        this.mySetsService.isLoading = false;
        this.mySetsService.refreshSetlist();
        this.mySetsService.activeSet = null;
        this.router.navigate(['library']);
      },
      error => {
        this.errorService.handleError(error);
      }
    );
  }

  startEdit(): void {
    this.mySetsService.setEditMode(true);
  }

  finishEdit(): void {
    let name = this.mySetsService.activeSet.name;
    let desc = this.mySetsService.activeSet.description;
    const tracklist = this.mySetsService.activeSet.tracklist;
    const nameInput = this.titleinput.nativeElement.value;
    const descInput = this.descinput.nativeElement.value;
    if (nameInput !== '' && nameInput !== name) {
      name = nameInput;
    }
    if (descInput !== '' && descInput !== desc) {
      desc = descInput;
    }
    this.mySetsService.updateActiveSet(name, desc, tracklist)
      .subscribe(response => {
        },
        error => {
          this.errorService.handleError(error);
        });
    this.mySetsService.setEditMode(false);
  }

  onEditImage(): void {
    const dialogRef = this.dialog.open(CropperComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.mySetsService.uploadImageSet(result, this.mySetsService.activeSet.id).subscribe(response => {
          console.log(response);
          this.mySetsService.activeSet.imageId = response.imageId;
        });
      }
      console.log('The dialog was closed');
    });
  }

  onRemoveImage() {
    this.mySetsService.removeImageSet(this.mySetsService.activeSet.imageId, this.mySetsService.activeSet.id).subscribe(response => {
        this.mySetsService.activeSet.imageId = undefined;
      },
      error => {
        this.errorService.handleError(error);
      });
  }
}
