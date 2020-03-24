import {MysetsService} from '../../../core/services/mysets.service';
import {ErrorService} from '../../../core/services/error.service';
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {CropperComponent} from '../cropper/cropper.component';
import {MatDialog} from '@angular/material/dialog';
import {AppSettings} from '../../AppSettings';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-set-header',
  templateUrl: './set-header.component.html',
  styleUrls: ['./set-header.component.scss']
})
export class SetHeaderComponent implements OnInit {

  @ViewChild('title', {static: false}) titleinput: ElementRef;
  @ViewChild('description', {static: false}) descinput: ElementRef;
  imageUrl: string;
  lyricsetForm: FormGroup;

  constructor(private readonly mySetsService: MysetsService,
              private readonly router: Router,
              private readonly errorService: ErrorService,
              public dialog: MatDialog,
              private readonly fb: FormBuilder) {
  }

  ngOnInit() {
    this.imageUrl = AppSettings.apiUrl + this.mySetsService.activeSet.imageId;
    this.lyricsetForm = this.fb.group({
      name: ['', []],
      description: ['', []],
      isPrivate: ['', []]
    });
    console.log(this.mySetsService.activeSet.isPrivate);

  }

  onRemoveSet(): void {
    this.mySetsService.isLoading = true;
    this.mySetsService.removeSet(this.mySetsService.activeSet.id).subscribe(
      () => {
        this.mySetsService.isLoading = false;
        this.mySetsService.refreshSetlist();
        this.mySetsService.activeSet = null;
        this.router.navigate(['library']);
      },
      error => {
        console.log(error);
        this.errorService.handleError(error);
      }
    );
  }

  startEdit(): void {
    this.mySetsService.setEditMode(true);
    this.lyricsetForm.controls.isPrivate.setValue(this.mySetsService.activeSet.isPrivate);
  }

  finishEdit(): void {
    if (this.lyricsetForm.valid) {
      this.mySetsService.updateActiveSet(this.lyricsetForm.value)
        .subscribe(() => {
          },
          error => {
            console.log(error);
            this.errorService.handleError(error);
          });
    }

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
    this.mySetsService.removeImageSet(this.mySetsService.activeSet.imageId, this.mySetsService.activeSet.id).subscribe(() => {
        this.mySetsService.activeSet.imageId = undefined;
      },
      error => {
        this.errorService.handleError(error);
      });
  }
}
