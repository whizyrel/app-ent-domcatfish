import { Component, OnInit } from '@angular/core';

import { LinksService } from '../services/links.service';

import { AllLinksProps } from '../interfaces/all-links-props'
import { LinkProps } from '../interfaces/link-props';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [
    './dashboard.component.css',
    './css/mdb.min.css',
    './css/style.min.css',
  ],
})
export class DashboardComponent implements OnInit {
  public title = `Debim`.toUpperCase();

  public sidebarLinks: LinkProps[];
  public soc_link: AllLinksProps;
  public links: LinkProps[];

  public name: string = `Israel O.`;
  public userimg: string;

  constructor(private _linksService: LinksService) {}

  ngOnInit() {
    this.sidebarLinks = this._linksService.getAdminDashboardSidebarLinks;
    this.links = this._linksService.getHomeNavbarLinks();
    this.soc_link = this._linksService.getSocialLinks();
  }
}
