import $ from 'jquery';

export const SELECTOR_COUNTRY = '[data-address-form-country]';
export const SELECTOR_PROVINCE = '[data-address-form-province]';

import { CountryProvinceSelector } from './../../objects/address/CountryProvinceSelector';

export class AddressesForm {
  constructor(container) {
    this.container = container;

    //Elements
    this.countrySelector = container.find(SELECTOR_COUNTRY);
    this.provinceSelector = container.find(SELECTOR_PROVINCE);

    this.countryProvinceSelector = new CountryProvinceSelector(this.countrySelector, this.provinceSelector);
  }
}
