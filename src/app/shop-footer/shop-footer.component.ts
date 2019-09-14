import { Component, OnInit } from '@angular/core';

import { AllLinksProps } from '../interfaces/all-links-props';
import { LinkProps } from '../interfaces/link-props';

import { LinksService } from '../services/links.service';

@Component({
  selector: 'app-shop-footer',
  templateUrl: './shop-footer.component.html',
  styleUrls: [
    './shop-footer.component.css',
    './css/style.min.css',
    './css/mdb.min.css',
  ],
})
export class ShopFooterComponent implements OnInit {
  public title = `Debim`.toUpperCase();
  public soc_link: AllLinksProps;
  public links: LinkProps[];

  constructor(
    private _linksService: LinksService,
) { }

  ngOnInit() {
    this.soc_link = this._linksService.getSocialLinks();
    this.links = this._linksService.getHomeNavbarLinks();
  }
}
