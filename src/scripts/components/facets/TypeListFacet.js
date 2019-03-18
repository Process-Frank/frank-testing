import { TypeFacet } from './TypeFacet';
import { escapeString } from '@process-creative/pc-slate-tools';
import { getCustomerVendors } from './../vendor/VendorData';

export class TypeListFacet extends TypeFacet {
  constructor(template, filter,container, title) {
    super(template, filter, container, title);

    this.container.on('click', '[data-faceted-nav-type]', e => this.onFacetClick(e));
  }

  getPrint() {
    let y = this.getOptions().reduce((x,type) => {
      let isAll = this.isAllTypes(type);
      let isActive = this.isActive(type);
      return x += `
        <a
          href="${this.getOptionUrl(type)}"
          class="c-collection-faceted-nav__filter ${isActive?'is-active':''}"
          data-faceted-nav-type data-type="${isAll ? 'all' : escapeString(type)}"
        >
          ${escapeString(type)}
        </a>
      `;
    }, '');
    return y;

  }
}
