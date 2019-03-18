/*
 *  Product Thumbnail
 *    Contains scripts for colleciton-template product thumbnails
 */


import $ from 'jquery';
import {
  Dropdown, SELECTOR_DROPDOWN, SELECTOR_DROPDOWN_SELECT, InitialzeInactiveDropdowns
} from './../dropdown/Dropdown';
import { QuantitySelector } from './../quantity/QuantitySelector';
import {
  changeCart, addToCart, CART_PENDING, getCountOfVariantInCart
} from '@process-creative/pc-slate-tools';

//Attribs
export const ATTR_INITIALIZED = 'data-initialized';
export const ATTR_VARIANT_ID = 'data-variant-id';

//Selectors
export const SELECTOR_THUMBNAIL = '[data-product-thumbnail]';
export const SELECTOR_ADD = '[data-add-selected]';
export const SELECTOR_QUANTITY = '[data-product-thumbnail-quantity]';

export const ACTIVE_THUMBNAILS = [];

export class ProductThumbnail extends QuantitySelector {
  constructor(container) {
    super(container);

    //Widgets
    this.dropdownElement = container.find(SELECTOR_DROPDOWN);
    this.quantityElement = container.find(SELECTOR_QUANTITY);
    if(this.dropdownElement.length) {
      this.dropdown = new Dropdown(this.dropdownElement);
    }
  }

  attachEvents() {
    super.attachEvents();

    if(this.dropdown) {
      this.dropdown.detachEvents();
      this.dropdown.attachEvents();
    }

    this.addClickEvent = e => this.onAddClick(e);
    this.container.on('click', SELECTOR_ADD, this.addClickEvent);

    if(ACTIVE_THUMBNAILS.indexOf(this) === -1) ACTIVE_THUMBNAILS.push(this);
    this.container.attr(ATTR_INITIALIZED, 'true');
  }

  detachEvents() {
    super.detachEvents();

    if(this.dropdown) this.dropdown.detachEvents();
    this.container.off('click', SELECTOR_ADD, this.addClickEvent);

    let i = ACTIVE_THUMBNAILS.indexOf(this);
    if(i !== -1) ACTIVE_THUMBNAILS.splice(i, 1);
    this.container.removeAttr(ATTR_INITIALIZED, 'true');
  }

  destroy() {
    this.detachEvents();
    Object.keys(this).forEach(e => delete this[e]);
  }

  getId() {
    let id = this.container.attr(ATTR_VARIANT_ID);
    if(this.dropdown) id = this.dropdown.getValue();
    return id;
  }

  async onQuantityChanged(qty) {
    //Get the amount of this item in the cart
    try {
      this.container.addClass('is-cart-pending');
      await changeCart({ variant: this.getId(), quantity: qty});
    } catch(e) {
      console.error(e);
      if(e && e.description) alert(e.description);
    }
  }

  async onAddClick(e) {
    try {
      this.container.addClass('is-cart-pending');
      await addToCart(this.getId());
    } catch(e) {
      console.error(e);
      if(e && e.description) alert(e.description);
    }
  }

  onCartFinished(cart) {
    super.onCartFinished();
    this.container.removeClass('is-cart-pending');

    let count = getCountOfVariantInCart(this.getId());
    if(count > 0) {
      this.container.addClass('is-in-cart');
      this.quantityElement.addClass('is-visible');
    } else {
      this.container.removeClass('is-in-cart');
      this.quantityElement.removeClass('is-visible');
    }
    this.quantityElement.text(count);
  }
}


//Initializer.....
export const InitializeInactiveThumbnails = () => {
  ACTIVE_THUMBNAILS.forEach(e => {
    e.destroy();
  });

  $(SELECTOR_THUMBNAIL).each((i,e) => {
    let self = $(e);
    let thumb = new ProductThumbnail(self);
  });

  InitialzeInactiveDropdowns();
};


//On ready...
$(document).ready(() => InitializeInactiveThumbnails());
