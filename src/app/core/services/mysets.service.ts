import {EventEmitter, Injectable} from '@angular/core';
import {testList} from '../../shared/constants';
import {LyricSet, Track} from '../../shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class MysetsService {

  isEditMode = false;
  activeSet: LyricSet;

  mysetlist: LyricSet[] = testList;

  changeMode() {
    this.isEditMode = !this.isEditMode;
  }

  setActiveSet(activeSet: LyricSet) {
    this.activeSet = activeSet;
  }

  setEditMode(mode: boolean) {
    this.isEditMode = mode;
  }
}
