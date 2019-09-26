import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { InitSnackbarService } from '../services/init-snackbar.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private _snackBar: InitSnackbarService
  ) {}

  ngOnInit() { }

  onAction() {
    this.data.action();
    this.dialogRef.close();
  }

  onExit() {
    console.log({i: this.data.exitInfo});
    if (this.data.exitInfo) {
      this._snackBar.showSnackBarFromMsg(this.data.exitInfo, 1000);
    }
    // this.dialogRef.close();
  }
}
