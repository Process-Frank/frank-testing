import { TypeFacet } from './TypeFacet';

export class TypePillFacet extends TypeFacet {
  constructor(template, filter, container, title) {
    super(template, filter, container, title);
    this.container.on('click', '[data-pill]', e => this.onFacetClick(e));
  }

  getPrint() {
    let options = this.getOptions();

    return options.reduce((x,type) => {
      let isAll = this.isAllTypes(type);
      let isActive = this.isActive(type);

      return x += `
        <button
          type="button" class="o-btn is-large ${isActive?'is-primary':'is-quaternary'}"
          data-pill data-option="${type}"
        >
          ${type}
        </button>
      `;
    },'');
  }

  onFilterUpdate() {
    super.onFilterUpdate();

    if(this.filter.getSettings().length === 0) {
      this.container.removeClass('is-filtering');
    } else {
      this.container.addClass('is-filtering');
    }
  }
}
