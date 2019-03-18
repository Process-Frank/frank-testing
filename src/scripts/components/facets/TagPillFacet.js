import { TagFacet } from './TagFacet';

export class TagPillFacet extends TagFacet {
  constructor(template, filter, container, title) {
    super(template, filter, container, title);

    this.container.on('click', '[data-pill]', e => this.onTagClick(e));
  }

  getPrint() {
    let options = this.getOptions();
    options.sort((l,r) => {
      if(this.isActive(l)) return -1;
      if(this.isActive(r)) return 1;
      return 0;
    });

    let x = '';
    for(let i = 0; i < Math.min(options.length, 10); i++) {
      let o = options[i];
      let isActive = this.isActive(o);
      x += `<button
        type="button" class="o-btn is-large is-quaternary ${isActive?'is-active':''}"
        data-pill data-option="${o}"
      >
        ${o}
      </button>`;
    }

    return x;
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
