import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BandService} from '../../../../core/services/band.service';
import {ErrorService} from '../../../../core/services/error.service';
import {MysetsService} from '../../../../core/services/mysets.service';
import {MatDialog} from '@angular/material';
import {CropperComponent} from '../../../../shared/components/cropper/cropper.component';

@Component({
  selector: 'app-band-view',
  templateUrl: './band-view.component.html',
  styleUrls: ['./band-view.component.scss']
})
export class BandViewComponent implements OnInit, OnDestroy {

  isLoading: boolean;


  constructor(private route: ActivatedRoute,
              private readonly bandService: BandService,
              private readonly errorService: ErrorService,
              private readonly setService: MysetsService,
              public dialog: MatDialog) {
  }

  onEditImage(): void {
    const dialogRef = this.dialog.open(CropperComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.bandService.uploadImageBand(result, this.bandService.activeBand.id).subscribe(response => {
          console.log(response);
          this.bandService.activeBand.imageId = response.imageId;
        });
      }
      console.log('The dialog was closed');
    });
  }

  onRemoveImage() {
    this.bandService.removeImageBand(this.bandService.activeBand.imageId, this.bandService.activeBand.id).subscribe(() => {
        this.bandService.activeBand.imageId = undefined;
      },
      error => {
        this.errorService.handleError(error);
      });
  }

  onEditClick() {
    this.bandService.isEditMode = true;
  }

  onFinishEditClick() {
    this.bandService.isEditMode = false;
    this.bandService.updateBand(this.bandService.activeBand).subscribe(
      response => {
        console.log(response);
      }
    );
  }

  ngOnInit() {
    this.isLoading = true;
    this.route.params.subscribe(
      params => {
        this.handleBandId(params.bandid);
      }
    );
  }


  handleBandId(bandid: string) {
    this.bandService.getBand(bandid).subscribe(
      band => {
        this.bandService.activeBand = band;
        this.bandService.getUsers();
        this.isLoading = false;
      },
      error => {
        this.isLoading = false;
        this.errorService.handleError(error);
      }
    );
  }

  ngOnDestroy(): void {
    this.bandService.activeBand = null;
    this.bandService.isEditMode = false;
    this.bandService.members = [];
  }


  onRemoveBandClick() {
    if (confirm('Are you sure?')) {
      this.bandService.deleteAvtiveBand();
    }
  }

  onLeaveBandClick() {
    this.bandService.leaveBand();
    console.log(this.bandService.getRoleToString(this.bandService.user.id));
  }
}
