import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder} from '@angular/forms';
import {MysetsService} from '../../../core/services/mysets.service';
import {Track} from '../../interfaces/track';
import {LyricSet} from '../../interfaces/lyric-set';
import {BandService} from '../../../core/services/band.service';
import {Band} from '../../interfaces/Band';


export class AddSongData {
  track: Track;
  where: string;
}

@Component({
  selector: 'app-add-song-dialog',
  templateUrl: './add-song-dialog.component.html',
  styleUrls: ['./add-song-dialog.component.scss']
})


export class AddSongDialogComponent implements OnInit {

  public selectedOptions: LyricSet[];
  public selectedBand: Band;

  constructor(
    public dialogRef: MatDialogRef<AddSongDialogComponent>,
    private readonly fb: FormBuilder,
    private readonly setService: MysetsService,
    private readonly bandService: BandService,
    @Inject(MAT_DIALOG_DATA) public data: AddSongData) {
  }

  ngOnInit() {
    this.setService.refreshSetlist();
    this.bandService.refreshBandlist();
    console.log();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSendClick(): void {
    if (this.data.where === 'set') {
      this.setService.updateSets(this.selectedOptions, this.data.track);
      this.dialogRef.close();
    } else if (this.data.where === 'band') {
      const succes = this.bandService.addTrack(this.selectedBand, this.data.track);
      if (!succes) {
        return;
      }
      this.bandService.updateBand(this.selectedBand).subscribe(
        response => {
          this.dialogRef.close();
          console.log(response);
        },
        error => {
          console.log(error);
        }
      );
    }

  }
}
