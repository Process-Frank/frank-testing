import $ from 'jquery';
import Cookies from 'js-cookie';

export const TOPBAR_SELECTOR = '[data-topbar]';
export const TOPBAR_DISMISS = '[data-topbar-dismiss]';

export const DISMISSED_CLASS = 'is-dismissed';
export const COOKIE_TOPBAR_DISMISSED = 'topbar-dismissed';

//Close click
$(document).on('click', TOPBAR_DISMISS, e => {
  e.preventDefault();
  e.stopPropagation();
  let self = $(e.currentTarget);
  self.closest(TOPBAR_SELECTOR).addClass(DISMISSED_CLASS);
  Cookies.set(COOKIE_TOPBAR_DISMISSED, true);
});

//Check cookie
$(document).ready(() => {
  let tpd = Cookies.getJSON(COOKIE_TOPBAR_DISMISSED);
  if(!tpd) return;
  let tp = $(TOPBAR_SELECTOR);
  if(!tp.find(TOPBAR_DISMISS).length) return;
  tp.addClass(DISMISSED_CLASS);
});
