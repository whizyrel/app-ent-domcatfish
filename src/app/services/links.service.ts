import { Injectable } from '@angular/core';

import { LinkProps } from '../interfaces/link-props';
import { AllLinksProps } from '../interfaces/all-links-props';

@Injectable({
  providedIn: 'root',
})
export class LinksService {
  constructor() {}

  getLoginBottomLinks(who: string): LinkProps[] {
    return [
      { link: `/${who.toLowerCase()}/signup`, title: 'Create An Account' },
      { link: `/${who.toLowerCase()}/forgot`, title: 'Forgot Password' },
    ];
  }

  getHomeNavbarLinks(): LinkProps[] {
    return [
      {
        link: '',
        title: 'Home',
      },
      {
        link: 'shop',
        title: 'Shop',
      },
      {
        link: '#about-our-products',
        title: 'About Our Products',
      },
      {
        link: '#contact-us',
        title: 'Contact Us',
      },
    ];
  }
  getSocialLinks(): AllLinksProps {
    return {
      whatsapp: `https://whatsapp.com/`,
      twitter: `https://twitter.com/`,
      instagram: `https://instagram.com/`,
      facebook: `https://facebook.com/`,
    };
  }
  getFilesLinks(): AllLinksProps {
    return {
      imgsrc: './assets/images/tmp_bkgd.png',
      card_1: './assets/images/card_1.png',
      card_2: './assets/images/card_2.png',
      card_3: './assets/images/card_3.png',
    };
  }
}
