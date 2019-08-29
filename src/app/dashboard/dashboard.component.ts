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

  public toggleSidebar () {
    const sidebarField = document.querySelector('._sidebar');
    const queryProfileDiv = document.querySelector('#query-profile');
    const userPanel = document.querySelector('.user-btn');
    const searchBar = document.querySelector('#search-bar');
    const searchBtn = document.querySelector('#search-btn');
    const navbar = document.querySelector('.navbar');
    const browserWidth = window.innerWidth;

    const footer = document.querySelector('footer');
    const main = document.querySelector('main');

    // sm devices up
    if (browserWidth >= 768) {
      // toggle menu
      sidebarField.classList.toggle('invisible');
      // attend to navbar padding-left
      navbar.classList.toggle('p-l-270p');

      // toggle main and footer padding-left
      footer.classList.toggle('p-l-270p');
      main.classList.toggle('p-l-270p');
    } else if (browserWidth < 768) {
      // xs devices down
      /*
      - toggle the appearance of search and profile
      - toggle toggle button
      - toggle display on small devices
      */

      // navbar
      navbar.classList.toggle('_sm-navbar');
      // search bar and user profile button
      queryProfileDiv.classList.toggle('d-none');
      // user profile/panel
      userPanel.classList.toggle('d-none');

      // specific search bar
      searchBar.classList.toggle('d-none');
      // specific search button
      searchBtn.classList.toggle('d-none');
      // medium devices display none
      sidebarField.classList.toggle('d-md-block');
      // sidebar display none
      sidebarField.classList.toggle('d-none');

      // toggle main and footer padding-left

    }
  }
}
