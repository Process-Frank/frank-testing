/*
 *  Header Section
 *    Provides scripts for elements within the header section.
 *
 *  Version:
 *    1.0.0 - 2018/01/08
 */
import $ from 'jquery';
import { register, ShopifySection } from './../ShopifySection';
import { HamburgerMenu, HAMBURGER_MENU_SELECTOR } from './../../objects/menu/HamburgerMenu';
import { getCurrentCart, ON_CART_FINISHED } from '@process-creative/pc-slate-tools';

export const CONTAINER_SELECTOR = '[data-header]';
export const SELECTOR_CART_COUNT = '[data-header-cart-count]';

export class HeaderSection extends ShopifySection {
  constructor(container) {
    super(container);

    this.hamburgerMenu = new HamburgerMenu(container.find(HAMBURGER_MENU_SELECTOR));
    this.cartQuantity = container.find(SELECTOR_CART_COUNT);

    $(document).on(ON_CART_FINISHED, c => this.onQuantityChanged(c));
    window.test1 = getCurrentCart;
  }

  onQuantityChanged(c, i) {
    let { item_count } = getCurrentCart();
    console.log(i);
    this.cartQuantity.text(item_count);

    //Hide if cart qty < 1
    if(item_count > 0) {
      this.cartQuantity.removeClass('is-hidden');
    } else {
      this.cartQuantity.addClass('is-hidden');
    }

    //Show animation
    this.cartQuantity.addClass('is-animated');
    //Animation timeout
    setTimeout(() => this.cartQuantity.removeClass('is-animated'), 400);
  }
}

register(CONTAINER_SELECTOR, HeaderSection);
