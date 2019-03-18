/*
 *  Drawer
 *    Contains scripts and actions for drawers, such as cart and hamburger menu
 *
 *  Version:
 *    1.0.0 - 2018/09/24
 */
import $ from 'jquery';

export const TOGGLE_SELECTOR = '[data-drawer-toggle]';
export const CLOSE_SELECTOR = '[data-drawer-close]';
export const DRAWER_DRAWER_SELECTOR = '[data-drawer-drawer]';

export class Drawer {
  constructor(container, speed) {
    if(!speed) speed = 200;//Time in MS to open/close

    this.container = container;
    this.speed = speed;

    this.openTimeout = null;
    this.closeTimeout = null;

    this.drawer = this.container.find(DRAWER_DRAWER_SELECTOR);

    this.container.on('click touchstart', TOGGLE_SELECTOR, e => this.onToggleClick(e));
    this.container.on('click touchstart', CLOSE_SELECTOR, e => this.onCloseClick(e));
  }

  isOpen() {
    return this.drawer.hasClass('is-state-open');
  }

  onOpenClick(e) {
    e.preventDefault();
    e.stopPropagation();
    if(this.isOpen()) return;
    this.open();
  }

  onCloseClick(e) {
    e.preventDefault();
    e.stopPropagation();
    if(this.isOpen()) this.close();
  }

  onToggleClick(e) {
    e.preventDefault();
    e.stopPropagation();
    this.toggle();
  }

  toggle() {
    //For supers
    if(this.isOpen()) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    $('html,body').addClass('is-drawer-open');
    [ this.container, this.drawer ].forEach(e => {
      e.addClass('is-state-open');
      e.addClass('is-opening');
    });

    if(this.closeTimeout) clearTimeout(this.closeTimeout);
    this.openTimeout = setTimeout(this.onOpenTimeout.bind(this), this.speed);

    if(this.onOpen) this.onOpen();
  }

  close() {
    $('html,body').removeClass('is-drawer-open');
    [ this.container, this.drawer ].forEach(e => {
      e.removeClass('is-open');
      e.removeClass('is-state-open');
      e.addClass('is-closing');
    });

    if(this.openTimeout) clearTimeout(this.openTimeout);
    this.closeTimeout = setTimeout(this.onCloseTimeout.bind(this), this.speed);

    if(this.onClose) this.onClose();
  }

  onOpenTimeout() {
    [ this.container, this.drawer ].forEach(e => {
      e.removeClass('is-opening');
      e.addClass('is-open');
    });

    this.openTimeout = null;
  }

  onCloseTimeout() {
    [ this.container, this.drawer ].forEach(e => e.removeClass('is-closing'));

    this.closeTimeout = null;
  }
}
