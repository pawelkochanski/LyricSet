import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder} from '@angular/forms';
import {MysetsService} from '../../../core/services/mysets.service';
import {Track} from '../../interfaces/track';
import {LyricSet} from '../../interfaces/lyric-set';

@Component({
  selector: 'app-add-song-dialog',
  templateUrl: './add-song-dialog.component.html',
  styleUrls: ['./add-song-dialog.component.scss']
})
export class AddSongDialogComponent implements OnInit {

  public selectedOptions: LyricSet[];

  constructor(
    public dialogRef: MatDialogRef<AddSongDialogComponent>,
    private readonly fb: FormBuilder,
    private readonly setService: MysetsService,
    @Inject(MAT_DIALOG_DATA) public track: Track) {
  }

  ngOnInit() {
    this.setService.refreshSetlist();
    console.log();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSendClick(): void {
    this.setService.updateSets(this.selectedOptions, this.track);
    this.dialogRef.close();
  }
}
