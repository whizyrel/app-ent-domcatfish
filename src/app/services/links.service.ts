import { Injectable } from '@angular/core';

import { LinkProps } from '../interfaces/link-props';
import { AllLinksProps } from '../interfaces/all-links-props';

@Injectable({
  providedIn: 'root',
})
export class LinksService {
  constructor() {}

  getTypes() {
    return ['Mini', 'Midi', 'Maxi', 'Mega', 'Premium'];
  }

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
        title: 'Our Products',
      },
      {
        link: '#contact-us',
        title: 'Contact Us',
      },
    ];
  }

  get getAdminDashboardSidebarLinks(): LinkProps[] {
    return [
      {
        link: '../../admin',
        title: 'Home',
        iconClass: 'fas fa-home mr-3'
      },
      {
        link: '../../shop',
        title: 'Shop',
        iconClass: 'fas fa-map-marker-alt mr-3'
      },
      {
        link: 'profile',
        title: 'Profile',
        iconClass: 'fas fa-user mr-3'
      },
      {
        title: 'Products',
        iconClass: 'fas fa-shopping-cart',
        children: [
            {
            link: 'add-products',
            title: 'add products',
            iconClass: 'fas fa-shopping-cart',
          },
          {
            link: 'list-products',
            title: 'list products',
            iconClass: 'fas fa-shopping-cart',
          }
        ]
      },
      {
        title: 'Feedbacks',
        iconClass: 'fas fa-comments mr-3',
        children: [
          {
            link: 'list-feedbacks',
            title: 'list feedbacks',
            iconClass: 'fas fa-comments',
          }
        ]
      },
      {
        title: 'Orders',
        iconClass: 'fas fa-money-bill-alt mr-3',
        children: [{
          link: 'list-orders',
          title: 'list orders',
          iconClass: 'fas fa-shopping-cart',
        }]
      },
      {
        title: 'Users',
        iconClass: 'fas fa-user mr-3',
        children: [
          {
            link: 'list-users',
            title: 'list users',
            iconClass: 'fas fa-user',
          },
          {
            link: 'edit-users',
            title: 'edit User',
            iconClass: 'fas fa-edit',
          },
          {
            link: 'delete-user',
            title: 'delete user',
            iconClass: 'fas fa-trash',
          }
        ]
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
