import { Facet } from '@process-creative/ajax-collection-v3';
import { getCustomerVendors } from './../vendor/VendorData';
import $ from 'jquery';

export class TypeFacet extends Facet {
  constructor(template, filter, container, title) {
    super(template, filter, container, title);
  }

  onFacetClick(e) {
    e.preventDefault();
    e.stopPropagation();

    let self = $(e.currentTarget);
    let value = self.attr('data-type') || self.attr('data-option');
    if(value.toLowerCase() == 'all') return this.filter.setSettings([]);

    let current = this.filter.getSetting(value);
    this.filter.setSettings([value]);
  }

  getOptions() {
    //let allTypes = [...this.template.data.allTypes];
    let allTypes = Object.keys(getCustomerVendors());

    if(allTypes.indexOf("") === -1 && allTypes.indexOf(null) === -1 && allTypes.indexOf("All") === -1) {
      allTypes = ["All",...allTypes];
    }

    return allTypes;
  }

  getOptionUrl(option) {
    let o = {};
    o[this.filter.handle] = [...this.filter.getSettings(), option];
    if(this.isAllTypes(option)) o[this.filter.handle] = null;
    return this.template.settings.getSettingsUrl(o);
  }

  isAllTypes(option) {
    return !option || option == "" || option.toLowerCase() == "all";
  }

  isActive(option) {
    if(this.isAllTypes(option)) return this.filter.getSettings().length === 0;
    return this.filter.getSetting(option);
  }
}
