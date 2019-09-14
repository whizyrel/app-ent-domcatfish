import { Component, OnInit } from '@angular/core';

import { AllLinksProps } from '../interfaces/all-links-props';
import { LinksService } from '../services/links.service';

@Component({
  selector: 'app-shop-footer',
  templateUrl: './shop-footer.component.html',
  styleUrls: [
    './css/style.min.css',
    './css/mdb.min.css',
    './shop.component.css',
  ],
})
export class ShopFooterComponent implements OnInit {
  public title = `Debim`.toUpperCase();
  public soc_link: AllLinksProps;

  constructor(private _linksService: LinksService) { }

  ngOnInit() {
    this.soc_link = this._linksService.getSocialLinks();
  }

}
