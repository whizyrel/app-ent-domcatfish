import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material';

@Component({
  selector: 'app-snackbarmsg',
  templateUrl: './snackbarmsg.component.html',
  styleUrls: ['./snackbarmsg.component.css']
})
export class SnackbarmsgComponent implements OnInit {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: string) { }

  ngOnInit() {
  }

}
