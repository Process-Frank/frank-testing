/*
 *  Edit Vendors Template
 *    Template used for editing vendors
 *
 *  Version:
 *    1.0.0 - 2019/02/08
 */
import $ from 'jquery';
import { VendorSelector } from './../components/vendor/VendorSelector';

export class EditVendorsTemplate {
  constructor(container) {
    this.container = container;

    this.vendorSelector = new VendorSelector(container, this);
  }

  onVendorLoadMore() {}
  onVendorSelect() {}
  async onVendorsSelected() {
    await this.vendorSelector.save();
    window.location.href = '/account';
  }
  onVendorsCancelled() {
    window.location.href = '/collections/all';
  }
}

$(document).ready(() => {
  $('[data-edit-vendor]').each((i,e) => {
    new EditVendorsTemplate($(e));
  });
});
