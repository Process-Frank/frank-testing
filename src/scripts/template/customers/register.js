import $ from 'jquery';
import { RegistrationForm } from './../../components/registration/RegistrationForm';

export const SELECTOR_TEMPLATE = '[data-registration-template]';

//Doc Ready
$(document).ready(() => {
  $(SELECTOR_TEMPLATE).each( (i,e)=>new RegistrationForm($(e)) );
});
