import { Component, OnInit, Inject } from '@angular/core';
import { ImageCroppedEvent, base64ToFile } from 'ngx-image-cropper';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';


export interface CropperData {
  croppedImage: any;
}

@Component({
  selector: 'app-cropper',
  templateUrl: './cropper.component.html',
  styleUrls: ['./cropper.component.scss']
})
export class CropperComponent implements OnInit {

  imageChangedEvent: any = '';
  croppedImage: any = '';
  filename: string;

    fileChangeEvent(event: any): void {
      console.log(event);
      if (event.target.files[0]) {
        this.filename = event.target.files[0].name;
      }
      this.imageChangedEvent = event;
    }
    imageCropped(event: ImageCroppedEvent) {
        this.croppedImage = new File ([base64ToFile(event.base64)], this.filename);
    }
    imageLoaded() {
    }
    cropperReady() {
    }
    loadImageFailed() {
    }

  constructor(
    public dialogRef: MatDialogRef<CropperComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CropperData) {}

    onNoClick(): void {
      this.dialogRef.close();
    }


  ngOnInit() {
  }

}
