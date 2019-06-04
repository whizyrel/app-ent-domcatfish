import { Injectable } from '@angular/core';

import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class InitsnackbarService {

  constructor(
    private _snackBar: MatSnackBar,
  ) { }

  showSnackBarFromComponent(component, data: string, duration: number) {
    this._snackBar.openFromComponent(component, {
      data: data,
      panelClass: ['snackPos'],
      duration: duration,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }

  showSnackBarFromMsg(msg: string, duration: number) {
    this._snackBar.open(msg, '', {
      duration: duration,
      panelClass: 'snackPos',
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }
}
