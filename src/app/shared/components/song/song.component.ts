import {Component, OnDestroy, OnInit} from '@angular/core';
import {MysetsService} from '../../../core/services/mysets.service';
import {ActivatedRoute, Params} from '@angular/router';
import {ErrorService} from '../../../core/services/error.service';
import {Track} from '../../interfaces/track';
import {Lyrics} from '../../interfaces/lyrics';
import {AuthService} from '../../../core/authentication/auth.service';
import {User} from '../../interfaces/user';
import {Subscription} from 'rxjs';
import {MatDialog} from '@angular/material';
import {AddSongDialogComponent} from '../add-song-dialog/add-song-dialog.component';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.scss']
})
export class SongComponent implements OnInit, OnDestroy {
  track: Track;
  lyrics: Lyrics;
  playMode: boolean;
  trackLoading: boolean;
  lyricsLoading: boolean;
  userSub: Subscription;
  user: User;

  constructor(private readonly mysetsService: MysetsService,
              private route: ActivatedRoute,
              private readonly errorService: ErrorService,
              private readonly authService: AuthService,
              private dialog: MatDialog) {
  }


  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      this.user = user;
    });
    this.trackLoading = true;
    this.lyricsLoading = true;
    this.route.params.subscribe(
      (params: Params) => {
        this.getTrack(params.songid);
      }
    );
    this.route.queryParams.subscribe((params: Params) => {
      this.playMode = params.playMode === '1';
      console.log(this.playMode);
    });
  }

  getTrack(songId: string): void {
    this.mysetsService.getTrack(songId).subscribe(
      response => {
        console.log(response);
        this.track = response.track;
        console.log(this.track);
        this.trackLoading = false;
        this.getLyrics(songId);
      },
      error => this.errorService.handleError(error)
    );
  }

  getLyrics(songId: string): void {
    this.mysetsService.getTrackLyrics(songId).subscribe(
      response => {
        this.lyrics = response.lyrics;
        this.lyricsLoading = false;
      },
      error => {
        this.errorService.handleError(error);
      }
    );
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  onAddSongClick() {
    const dialogRef = this.dialog.open(AddSongDialogComponent, {
      width: '350px',
      data: this.track
    });
  }

  checkIfTrackIsLast() {
    // return this.mysetsService.getTrackIndex(this.track) === this.mysetsService.activeSet.tracklist.length - 1;
  }

  checkIfTrackIsFirst() {
    // return this.mysetsService.getTrackIndex(this.track) === 0;
  }

  getNextSongIndex() {
    // return this.mysetsService.getTrackIndex(this.track) + 1;
  }

  getPreviousSongIndex() {
    // return this.mysetsService.getTrackIndex(this.track) - 1;
  }

}
