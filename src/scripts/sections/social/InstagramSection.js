/*
 *  InstagramSection
 *    Contains the controls for the Instagram section.
 *
 *  Version:
 *    2.0.0 - 2019/01/08
 */

import { register, ShopifySection } from './../ShopifySection';
import Instafeed from 'instafeed.js';

export const INSTAGRAM_SELECTOR = '[data-instagram]';

//Templates
const IMAGE_TEMPLATE = `
  <div class="c-instagram__photo">
    <a href="{{link}}" target="_blank" class="c-instagram__photo-container">
      <img src="{{image}}" class="c-instagram__photo-image" />
    </a>
  </div>
`;
const OTHER_TEMPLATE = IMAGE_TEMPLATE.replace('{{image}}', '{{previewImage}}');


export class InstagramSection extends ShopifySection {
  constructor(container) {
    super(container);

    let accessToken = this.container.attr('data-token');
    if(!accessToken || !accessToken.length) accessToken = '4254515489.1677ed0.f2693b7b568c48b98b49f090a1e34a9a';
    let tokenSplit = accessToken.split('.');
    if(!tokenSplit.length) return;

    let userId = tokenSplit[0];
    let limit = parseInt(this.container.attr('data-limit')) || 5;
    let target = this.container.attr('id');
    if(!target) this.container.attr('id', target = `instafeed-${Math.random()*1000}`);

    this.feed = new Instafeed({
      get: 'user',
      template: IMAGE_TEMPLATE,
      imageTemplate: IMAGE_TEMPLATE,
      videoTemplate: OTHER_TEMPLATE,
      carouselFrameTemplate: OTHER_TEMPLATE,
      carouselImageTemplate: OTHER_TEMPLATE,
      imageResolution: 'standard-resolution',
      resolution: 'standard_resolution',
      accessToken, target, limit, userId
    });
    this.feed.run();
  }
}

register(INSTAGRAM_SELECTOR, InstagramSection);
