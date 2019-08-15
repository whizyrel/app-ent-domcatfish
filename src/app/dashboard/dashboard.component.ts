import { Component, OnInit } from '@angular/core';

import { LinksService } from '../services/links.service';

import { AllLinksProps } from '../interfaces/all-links-props'
import { LinkProps } from '../interfaces/link-props';
import { SessStoreProps } from '../interfaces/sess-store-props';

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
  public userimg: string = `./assets/images/avatar.png`;

  public what: string = `Logout`;

  public encURL: string;
  protected seckey: string = 'app-ent-domcatfish';

  public otherusrimg: string;
  public username: string;

  public active: SessStoreProps;
  public inactive: SessStoreProps[];

  public showActvUser: boolean;
  public showInactvUser: boolean;

  constructor(private _linksService: LinksService) {}

  ngOnInit() {
    this.sidebarLinks = this._linksService.getAdminDashboardSidebarLinks;
    this.links = this._linksService.getHomeNavbarLinks();
    this.soc_link = this._linksService.getSocialLinks();
  }

  public inOutCtrl() {

  }
}
