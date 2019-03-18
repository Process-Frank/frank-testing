/*
 *  Login Template
 *
 *  Version:
 *    2.0.0 - 2019/02/05
 */

import $ from 'jquery';

//TODO: We can use the tools from  pc-slate-tools to handle this all via ajax...

//export const SELECTOR_LOGIN_TEMPLATE = '[data-login-template]';
export const SELECTOR_LOGIN_FORGOT_PASSWORD = '[data-login-forgot-password]';
export const SELECTOR_LOGIN_FORM = '[data-login-form]';
export const SELECTOR_FORGOT_FORM = '[data-forgot-form]';
export const SELECTOR_FORGOT_CANCEL = '[data-forgot-cancel]';

$(document).on('click', SELECTOR_LOGIN_FORGOT_PASSWORD, e => {
  e.preventDefault();
  e.stopPropagation();

  //Swap the form over to the forgot form
  $(SELECTOR_LOGIN_FORM).addClass('is-hidden');
  $(SELECTOR_FORGOT_FORM).removeClass('is-hidden');
});


$(document).on('click', SELECTOR_FORGOT_CANCEL, e => {
  e.preventDefault();
  e.stopPropagation();

  $(SELECTOR_LOGIN_FORM).removeClass('is-hidden');
  $(SELECTOR_FORGOT_FORM).addClass('is-hidden');
});
