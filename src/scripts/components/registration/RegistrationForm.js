import $ from 'jquery';
import 'slick-carousel';
import Cookies from 'js-cookie';

import { setCooldownVendors } from './../vendor/VendorData';
import { VendorSelector } from './../vendor/VendorSelector';
import { createCustomer, escapeString } from '@process-creative/pc-slate-tools';
import { generateLoader } from './../../objects/loader/Loader';

export const ATTR_REGISTRATION_BODY = 'data-registration-template-body';
export const ATTR_REGISTRATION_VENDORS = 'data-registration-template-vendors';
export const ATTR_REGISTRATION_STEP = 'data-step';
export const ATTR_REGISTRATION_POSTCODES = 'data-registration-postcodes';

export const SELECTOR_REGISTRATION_BODY = `[${ATTR_REGISTRATION_BODY}]`;
export const SELECTOR_REGSITRATION_VENDORS = `[${ATTR_REGISTRATION_VENDORS}]`;
export const SELECTOR_REGISTRATION_STEP = `[${ATTR_REGISTRATION_STEP}]`;

export const SELECTOR_REGISTRATION_POSTCODE = '[data-registration-postcode]';
export const SELECTOR_REGISTRATION_ERROR = '[data-registration-postcode-error]';
export const SELECTOR_REGISTRATION_POSTCODE_CONTINUE = '[data-registration-postcode-continue]';
export const SELECTOR_REGISTRATION_NEWSLETTER = '[data-registration-postcode-error] span';


export const SELECTOR_REGISTRATION_FORM = 'form';
export const SELECTOR_REGISTRATION_FIRST_NAME = '[name="customer[first_name]"]';
export const SELECTOR_REGISTRATION_LAST_NAME = '[name="customer[last_name]"]';
export const SELECTOR_REGISTRATION_EMAIL = '[name="customer[email]"]';
export const SELECTOR_REGISTRATION_PASSWORD = '[name="customer[password]"]';
export const SELECTOR_REGISTRATION_CONFIRM = '[name="customer[confirm_password]"]';
export const SELECTOR_REGISTRATION_PASSWORD_BACK = '[data-registration-password-back]';
export const SELECTOR_REGISTRATION_PASSWORD_CONTINUE = '[data-registration-password-continue]';
export const SELECTOR_REGISTRATION_ERRORS = '[data-regsistration-template-errors]';

export const SELECTOR_REGISTRATION_BAR = '[data-registration-template-bar]';
export const SELECTOR_REGISTRATION_STEP_COUNTER = '[data-registration-template-step-counter]';

export class RegistrationForm {
  constructor(container) {
    window.test = this;

    //Elements
    this.container = container;
    this.body = container.find(SELECTOR_REGISTRATION_BODY);
    this.steps = container.find(SELECTOR_REGISTRATION_STEP);
    this.stepCounter = container.find(SELECTOR_REGISTRATION_STEP_COUNTER);
    this.progressBar = container.find(SELECTOR_REGISTRATION_BAR);

    //Postcode
    this.postcodes = container.attr(ATTR_REGISTRATION_POSTCODES).split(',').map( e => e.replace(/\s/gi, '') );
    this.postcodeContinue = container.find(SELECTOR_REGISTRATION_POSTCODE_CONTINUE);
    this.postcodeError = container.find(SELECTOR_REGISTRATION_ERROR);
    this.postcodeInput = container.find(SELECTOR_REGISTRATION_POSTCODE);

    //Registration
    this.formElement = container.find(SELECTOR_REGISTRATION_FORM);
    this.firstNameElement = container.find(SELECTOR_REGISTRATION_FIRST_NAME);
    this.lastNameElement = container.find(SELECTOR_REGISTRATION_LAST_NAME);
    this.emailElement = container.find(SELECTOR_REGISTRATION_EMAIL);
    this.passwordElement = container.find(SELECTOR_REGISTRATION_PASSWORD);
    this.confirmPasswordElement = container.find(SELECTOR_REGISTRATION_CONFIRM);
    this.passwordContinue = container.find(SELECTOR_REGISTRATION_PASSWORD_CONTINUE);
    this.passwordBack = container.find(SELECTOR_REGISTRATION_PASSWORD_BACK);
    this.errors = container.find(SELECTOR_REGISTRATION_ERRORS);

    //Vendors
    this.vendorsElement = container.find(SELECTOR_REGSITRATION_VENDORS);
    this.vendorSelector = new VendorSelector(this.vendorsElement, this);

    //Slick Init.
    this.body.slick({
      infinite: false,
      slidesToScroll: 1,
      slidesToShow: 1,
      dots: false,
      arrows: false,
      adaptiveHeight: true,
      draggable: false,
      touchMove: false
    });

    //Go to step
    this.goToStep(0);

    //Events
    $(window).on('resize', (e) => this.onResize(e));

    this.container.on('change keyup keydown cut paste copy', SELECTOR_REGISTRATION_POSTCODE, e => this.onPostcodeChange(e));
    this.container.on('keyup keydown cut paste copy change', e => this.confirmPasswordFormHuman());
    this.container.on('click', SELECTOR_REGISTRATION_POSTCODE_CONTINUE, e => this.onPostcodeContinue(e));
    this.container.on('click', SELECTOR_REGISTRATION_PASSWORD_BACK, e => this.onPasswordBack(e));
    this.container.on('click', SELECTOR_REGISTRATION_PASSWORD_CONTINUE, e => this.onPasswordContinue(e));
    this.container.on('click', SELECTOR_REGISTRATION_NEWSLETTER, e => {
      let inp = $('#contact_form').find('input[type="email"]');
      $('html,body').stop().animate({ scrollTop: inp.offset().top - 250 });
      inp.focus()
    });

    //Blur && focusout events weren't delegating properly..
    this.allInputs = [
      this.firstNameElement, this.lastNameElement, this.emailElement,
      this.passwordElement, this.confirmPasswordElement
    ];

    this.allInputs.forEach( l => l.on('focusout blur',e=>this.onPasswordFormBlur(e)) );

    //Submit element isn't really delegated properly either
    this.formElement.on('submit', e => this.onPasswordContinue(e));
  }

  isValidPostcode(postcode) {
    return this.postcodes.some(e => e.length && postcode == ''+e);
  }

  goToStep(step) {
    if(step == this.currentStep) return;
    this.currentStep = step
    //Change the step counter
    this.stepCounter.text(step+1);
    //Resize the progress bar
    this.progressBar.css('width', ((100 / this.steps.length)*(step+1)) + '%');
    $('html,body').stop().animate({ scrollTop: 0 }, '200');//Animate scroll to top
    this.animateToStep(step);
  }

  animateToStep(step) {
    //Animate to a particular step, also useful to fix flow issues
    this.body.slick('slickGoTo', step);
  }

  next() {
    //Go to next step, if no next step it will not do anything
    let nextStep = this.currentStep + 1;
    if(nextStep >= this.steps.length) {
      return;
    }
    this.goToStep(nextStep);
  }

  back() {
    //Go to previous step.
    let prevStep = this.currentStep - 1;
    if(prevStep < 0) return;
    this.goToStep(prevStep);
  }


  disableButton(e) {
    e.addClass('is-disabled');
    e.attr('disabled', 'disabled');
  }

  enableButton(e) {
    e.removeClass('is-disabled');
    e.removeAttr('disabled');
  }

  disableInput(e) {
    e.addClass('is-disabled');
    e.attr('disabled', 'disabled');
  }

  enableInput(e) {
    e.removeClass('is-disabled');
    e.removeAttr('disabled');
  }

  showPostcodeError() {
    if(this.postcodeError.html().replace(/\s/gi).length) return;
    this.postcodeError.html(window.Language.strings['customer.register.postcode.error_html']);
  }

  hidePostcodeError() {
    if(!this.postcodeError.html().replace(/\s/gi).length) return;
    this.postcodeError.html('');
  }

  enablePostcodeContinue() {
    //Called when a postcode becomes valid.
    this.enableButton(this.postcodeContinue);
  }

  disablePostcodeContinue() {
    //Called when a postcode is invalid
    this.disableButton(this.postcodeContinue);
    this.animateToStep(this.currentStep);//Fixes flow
  }

  confirmPasswordForm() {
    //Confirms the entire password form.
    let x = [
      this.firstNameElement, this.lastNameElement, this.emailElement,
      this.passwordElement, this.confirmPasswordElement
    ].every(e => {
      //Check each element..
      let o = this.confirmPasswordFormElement(e);// 0 = bad, 1 = good, 2 = bad confirm password
      if(o == 1) return true;
      if(o == 2) this.setFormError(window.Language.strings['customer.register.password_no_match']);
      return false;
    });

    if(x) {
      this.setFormError('');
      this.enableButton(this.passwordContinue);
    }
    return x;
  }

  confirmPasswordFormElement(e) {
    //Checks a password form element is valid, for confirm_password it will compare
    let v = e.val();
    let o = v.replace(/\s/g).length > 0 ? 1 : 0;
    if(o == 1 && e.attr('name') == 'customer[confirm_password]') {
      o = (v == this.passwordElement.val()) ? 1 : 2;
    }

    if(o == 1) {
      e.removeClass('has-error');
      return true;
    }
    e.addClass('has-error');
    this.disableButton(this.passwordContinue);
    return o;
  }

  setFormError(errors) {
    if(!Array.isArray(errors)) errors = [ errors ];
    let e = this.errors.html();
    let x = errors.reduce((x,error) => {
      return error && error.length ? `<li>${escapeString(error)}</li>` : ''
    },'');
    x = x.length ? `<ul>${x}</ul>` : '';
    this.errors.html(x);
    if(e != x) setTimeout(() => this.animateToStep(this.currentStep), 1);
  }

  //Various events called by the vendor selector.
  onVendorsSelected(vendors) { this.next(); }
  onVendorsCancelled() { this.back(); }
  onVendorSelect() { this.animateToStep(this.currentStep); }
  onVendorLoadMore() { this.animateToStep(this.currentStep); }

  onResize(e) {
    //Called on window resize.
    this.animateToStep(this.currentStep);
  }

  onPostcodeChange(e) {
    //Called when postcode field "changed"
    let pc = $(e.currentTarget).val();

    this.hidePostcodeError();
    if(this.postcodeTimer) {
      clearTimeout(this.postcodeTimer);
      this.postcodeTimer = null;
    }

    if(!this.isValidPostcode(pc)) {
      //I was getting an annoying flicker when modifying the postcode, so let's add a delay
      this.postcodeTimer = setTimeout(() => {
        if(this.isValidPostcode(this.postcodeInput.val())) {
          this.hidePostcodeError();
          return this.enablePostcodeContinue();
        }

        this.disablePostcodeContinue();
        this.showPostcodeError();
      }, 400);

      return this.disablePostcodeContinue();
    }

    this.enablePostcodeContinue();
  }

  onPostcodeContinue(e) {
    //Called when clicking "continue" on password page
    let postcode = this.postcodeInput.val();
    if(!this.isValidPostcode(postcode)) return this.disablePostcodeContinue(e);
    this.enablePostcodeContinue();
    this.next();
  }

  onPasswordBack(e) { this.back(); }
  async onPasswordContinue(e) {
    //Refer to onCooldown()
    if(this.bypassAjax) return;

    if(e) {
      e.preventDefault();
      e.stopPropagation();
    }

    //Are we already processing? (Don't double up)
    if(this.isRegistering) return;

    //Confirm form data
    if(!this.confirmPasswordForm()) return;

    //Mark pending
    this.isRegistering = true;

    //Set loading state
    this.allInputs.forEach(e => this.disableInput(e));
    this.disableButton(this.passwordBack);
    this.disableButton(this.passwordContinue);
    this.passwordContinue.html(generateLoader(null, null, null, 20));
    this.animateToStep(this.currentStep);

    //Get all the needed values...
    let first_name = this.firstNameElement.val();
    let last_name = this.lastNameElement.val();
    let email = this.emailElement.val();
    let password = this.passwordElement.val();
    let postcode = this.postcodeInput.val();

    //Store the postcode into cookies
    let error = null;
    try {
      //Store the postcode into cookies
      Cookies.set('postcode', postcode);

      //Create a customer
      let customer = await createCustomer({
        email, first_name, last_name, password
      });

      //Add metafields
      await this.vendorSelector.save();
    } catch(e) {
      error = e || 'Unknown error occured';
    }

    //Was there an error?
    if(error) {
      let x = error;
      if(x.message) x = x.message;
      if(x.reason) x = x.reason;

      this.allInputs.forEach(e => this.enableInput(e));
      this.enableButton(this.passwordBack);
      this.enableButton(this.passwordContinue);
      this.passwordContinue.text(window.Language.strings['customer.register.submit']);
      this.animateToStep(this.currentStep);
      this.isRegistering = false;

      //Is this a cooldown error?
      if(/many/gi.test(x)) {
        //Yes...
        return this.onCooldown();
      }

      //General error
      return this.setFormError(x);
    }

    //Take you to the collection page.
    window.location.href = '/collections/all';
  }

  onPasswordFormBlur(e) {
    let target = $(e.currentTarget);
    if(!this.confirmPasswordFormElement(target)) return;
    if(!this.confirmPasswordForm()) return;
  }

  onCooldown() {
    //This function is called when the form submit is attempted, but Shopify
    //returns a 429 error (calmdown). What we have to do in order to get this to
    //work is do a classic (non ajax) submit and store the settings as a cookie,
    //then after the classic submit has fired and the user has logged in we can
    //then do what we gotta do

    //First stop ajax doing it's thing
    console.log('COOLDOWN HIT!');
    this.bypassAjax = true;

    //Now let's store this cookie
    setCooldownVendors(this.vendorSelector.settings);

    //Now submit the form as expected
    this.formElement.submit();
  }

  confirmPasswordFormHuman() {
    //Humanized check password form, allows for a small delay so things don't appear to flicker like crazy
    if(this.confirmPasswordTimer) {
      clearTimeout(this.confirmPasswordTimer);
      this.confirmPasswordTimer = null;
    }

    let x = [
      this.firstNameElement, this.lastNameElement, this.emailElement,
      this.passwordElement, this.confirmPasswordElement
    ].every(e => e && e.val && e.val().length);

    if(x) {
      return this.confirmPasswordTimer = setTimeout(() => this.confirmPasswordForm(), 400);
    }

    this.disableButton(this.passwordContinue);
  }
}
