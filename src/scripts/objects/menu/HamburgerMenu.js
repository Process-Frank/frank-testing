/*
 *  HamburgerMenu
 *    Scripts for the hamburger menu.
 *
 *  Version:
 *    1.0.0 - 2018/11/02
 */
import $ from 'jquery';

export const HAMBURGER_MENU_SELECTOR = '[data-hamburger-menu]';
export const HAMBURGER_MENU_LINK = '[data-hamburger-menu-link]';
export const HAMBURGER_MENU_TOGGLE = '[data-hamburger-menu-toggle]';
export const HAMBURGER_MENU_EXPAND = '[data-hamburger-menu-expand]';

export class HamburgerMenu {
  constructor(container) {
    this.container = container;

    this.container.on('click touchend', HAMBURGER_MENU_TOGGLE, e => this.onMenuToggle(e) );
    this.container.on('click touchend', HAMBURGER_MENU_EXPAND, e => this.onLinkClick(e) );
  }

  onMenuToggle(e) {
    e.preventDefault();
    e.stopPropagation();
    this.container.toggleClass('is-active');
  }

  onLinkClick(e) {
    let { currentTarget } = e;
    let target = $(currentTarget);
    let container = target.closest(HAMBURGER_MENU_LINK);

    e.preventDefault();
    e.stopPropagation();

    container.toggleClass('is-expanded');
  }
}
