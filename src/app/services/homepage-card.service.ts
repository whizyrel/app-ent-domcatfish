import { Injectable } from '@angular/core';

import { LinksService } from '../services/links.service';

import { LinkProps } from '../interfaces/link-props';

@Injectable({
  providedIn: 'root',
})
export class HomepageCardService {
  constructor(private _linksService: LinksService) {}
  getCardProp(): LinkProps[] {
    const cardlinks = this._linksService.getFilesLinks();
    return [
      {
        title: 'Mini Pack',
        body: 'Mini Pack',
        addition: 'additional Content',
        srclink: cardlinks['card_1'],
      },
      {
        title: 'Midi Pack',
        body: 'Midi Pack',
        addition: 'additional Content',
        srclink: cardlinks['card_2'],
      },
      {
        title: 'Maxi Pack',
        body: 'Maxi Pack',
        addition: 'additional Content',
        srclink: cardlinks['card_3'],
      },
    ];
  }
}
