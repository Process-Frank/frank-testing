import { Facet } from '@process-creative/ajax-collection-v3';
import $ from 'jquery';

export class TagFacet extends Facet {
  constructor(template, filter, container, title) {
    super(template, filter, container, title);
  }

  getOptions() {
    //Add all tags for all products
    let options = this.template.data.products.reduce((x,product) => {
      return x = [...x, ...product.tags];
    }, []);

    //Remove duplicates
    return Array.from(new Set(options));
  }

  onTagClick(e) {
    e.preventDefault();
    e.stopPropagation();
    let self = $(e.currentTarget);
    let option = self.attr('data-option');
    this.filter.setSetting(option, !this.filter.getSetting(option));
  }

  isActive(option) {
    return this.filter.getSetting(option);
  }
}
