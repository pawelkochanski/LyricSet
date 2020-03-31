import {MysetsService} from 'app/core/services/mysets.service';
import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';


@Component({
  selector: 'app-add-set-dialog',
  templateUrl: './add-set-dialog.component.html',
  styleUrls: ['./add-set-dialog.component.scss']
})
export class AddSetDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddSetDialogComponent>,
    private readonly fb: FormBuilder,
    private readonly setService: MysetsService,
    private readonly router: Router) {
  }

  setNameForm: FormGroup;

  ngOnInit() {
    this.setNameForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(15)]],
      isPrivate: ['', []]
  })
    ;
  }

  get formcontrols() {
    return this.setNameForm.controls;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSendClick() {
    const name = this.formcontrols.name.value;
    const value = this.setNameForm.value;
    if (name) {
      this.setService.addSet(value).subscribe(
        response => {
          this.setService.refreshSetlist();
          this.router.navigate(['/library', null]);
        }
      );
    }
    this.dialogRef.close();
  }
}
