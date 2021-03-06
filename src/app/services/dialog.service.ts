import { Injectable } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { DialogComponent } from '../dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private dialogRef;
  constructor(
    public dialog: MatDialog
  ) { }

  public showDialog(
    info,
    w: string = "250px",
    dgComp = DialogComponent
  ) {
    const dialogRef = this.dialog.open(dgComp, {
      width: w,
      data: info
    });
  }
}
