import { Component, OnInit, AfterContentInit, AfterContentChecked } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: [
    './css/mdb.min.css',
    './css/style.min.css',
    './checkout.component.css'
  ]
})
export class CheckoutComponent implements OnInit, AfterContentInit, AfterContentChecked {

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentChecked() {
    this.initCart();
  }

  ngAfterContentInit() {
    setInterval(() => {}, 30000);
  }

  private initCart() { }
}
