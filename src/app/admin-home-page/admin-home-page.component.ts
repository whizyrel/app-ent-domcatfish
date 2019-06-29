import { Component, OnInit } from '@angular/core';

import { LinksService } from '../services/links.service';

import { LinkProps } from '../interfaces/link-props';
import { AllLinksProps } from '../interfaces/all-links-props';

@Component({
  selector: 'app-admin-home-page',
  templateUrl: './admin-home-page.component.html',
  styleUrls: [
    './admin-home-page.component.css',
    './css/style.min.css',
    './css/mdb.min.css',
  ],
})
export class AdminHomePageComponent implements OnInit {
  public soc_link: AllLinksProps;
  public title: string;
  public links: LinkProps[];

  constructor(private _linksService: LinksService) {}

  ngOnInit() {
    this.title = `DEBIM`;
    this.soc_link = this._linksService.getSocialLinks();
    this.links = this._linksService.getHomeNavbarLinks();
  }
}
