/*
 *  Newsletter Signup Section
 *
 *  Version:
 *    1.0.0 -2019/03/04
 */
import $ from 'jquery';

import { generateLoader } from './../loader/Loader';

export const SELECTOR_NEWSLETTER_SIGNUP = '[data-newsletter-signup]';
export const SELECTOR_NEWSLETTER_SIGNUP_SUBMIT = '[data-newsletter-signup-submit]';

//Will be set to true if we've reached the form submit limit (429 response)
let REQUEST_LIMIT_REACHED = false;

//Called when the newsletter form is submitted.
export const onNewsletterFormSubmit = (e) => {
  let { currentTarget } = e;

  if(REQUEST_LIMIT_REACHED) return;//Don't submit if we've reached the limit

  //Cancel events
  e.preventDefault();
  e.stopPropagation();

  //Get the data from the input fields.
  let self = $(currentTarget);

  let data = self.find(':input').serializeArray();
  let url = self.attr('action').split('#')[0].split('?')[0]+'?view=json';
  let method = self.attr('method');

  //Prepare our Ajax Request
  $.ajax({
    url, method, data,
    //headers: { 'X-Requested-With': 't' }, //We need to set this header since Shopify treats AJAX requests differently.
    success: (d,s,xhr) => onNewsletterFormSuccess(self, d,s,xhr),
    error: (xhr,status,error) => onNewsletterFormError(self, xhr, status, error)
  });

  let submit = $(SELECTOR_NEWSLETTER_SIGNUP_SUBMIT);
  submit.attr('disabled', 'disabled');
  submit.addClass('is-disabled');


  //"Classic" event cancelling
  return false;
};

//Called when a form submit request resolves.
export const onNewsletterFormSuccess = (e, data, textStatus, jqXHR) => {
  //The response always comes in as raw HTML unfortunately, we're going to have to semiparse it.
  let response = $(data);
  response = response.find(SELECTOR_NEWSLETTER_SIGNUP);
  $(SELECTOR_NEWSLETTER_SIGNUP).html(response.html());
}

export const onNewsletterFormError = (e, xhr, textStatus, error) => {
  let { status } = xhr;

  if(status == 429) {
    //Too many requests, let's mark and submit the classic way.
    REQUEST_LIMIT_REACHED = true;
    e.submit();
  }

  //Enable button
  let submit = $(SELECTOR_NEWSLETTER_SIGNUP_SUBMIT);
  submit.removeAttr('disabled');
  submit.removeClass('is-disabled');
  alert(error);
}



//Since submit elements don't propogate properly we're going to have to wait for
//.ready
$(document).ready(() => {
  $(SELECTOR_NEWSLETTER_SIGNUP).on('submit', e => onNewsletterFormSubmit(e));
});
