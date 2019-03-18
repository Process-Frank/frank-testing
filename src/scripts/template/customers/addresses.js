import $ from 'jquery';

import { CreateAddressForm, EditAddressForm } from './../../components/addresses/';

export const ATTR_INDEX = 'data-index';

export const SELECTOR_ADDRESSES_TEMPLATE = '[data-addresses-template]';
export const SELECTOR_CREATE_ADDRESS = '[data-addresses-template-create]';
export const SELECTOR_EDIT_ADDRESS = '[data-address-template-edit]';

export const SELECTOR_TOGGLE_CREATE_FORM = '[data-address-create-toggle]';
export const SELECTOR_HIDE_CREATE_FORM = '[data-address-create-hide]';
export const SELECTOR_DELETE_ADDRESS = '[data-address-delete]';
export const SELECTOR_TOGGLE_EDIT_FORM = '[data-address-edit-toggle]';
export const SELECTOR_HIDE_EDIT_FORM = '[data-address-edit-hide]';

class AddressesTemplate {
  constructor(container) {
    this.container = container;

    //Create address form wrapper
    this.createForms = [];
    this.editForms = [];

    $(SELECTOR_CREATE_ADDRESS).each((i,e) => {
      let self = $(e);
      let form = new CreateAddressForm(self);
      this.createForms.push(form);
    });

    $(SELECTOR_EDIT_ADDRESS).each((i,e) => {
      let self = $(e);
      let form = new EditAddressForm(self);
      this.editForms.push(form);
    });

    this.container.on('click', SELECTOR_TOGGLE_CREATE_FORM, e => this.onToggleCreateForm(e));
    this.container.on('click', SELECTOR_HIDE_CREATE_FORM, e=> this.onHideCreateForm(e));
    this.container.on('click', SELECTOR_DELETE_ADDRESS, e => this.onDeleteAddress(e));
    this.container.on('click', SELECTOR_TOGGLE_EDIT_FORM, e => this.onToggleEditForm(e));
    this.container.on('click', SELECTOR_HIDE_EDIT_FORM, e => this.onHideEditForm(e));
  }

  onToggleCreateForm(e) { this.container.find(SELECTOR_CREATE_ADDRESS).toggleClass('is-visible'); }
  onHideCreateForm(e) { this.container.find(SELECTOR_CREATE_ADDRESS).removeClass('is-visible'); }
  onDeleteAddress(e) {
    let self = $(e.currentTarget);
    let id = self.attr('data-id');
    if(!id) return;

    if( confirm(window.Language.strings['customer.addresses.delete_confirm']) ) {
      Shopify.postLink(`/account/addresses/${id}`, { parameters: {_method: 'delete'}} );
    }
  }

  onToggleEditForm(e) {
    let self = $(e.currentTarget);
    let id = self.attr(ATTR_INDEX);
    let form = this.container.find(`${SELECTOR_EDIT_ADDRESS}[${ATTR_INDEX}="${id}"]`);
    form.toggleClass('is-visible');
  }

  onHideEditForm(e) {
    let self = $(e.currentTarget);
    self.closest(SELECTOR_EDIT_ADDRESS).removeClass('is-visible');
  }
}


$(document).ready(() => {
  $(SELECTOR_ADDRESSES_TEMPLATE).each( (i,e) => {
    new AddressesTemplate($(e));
  });
});
