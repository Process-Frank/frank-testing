import { TagFacet } from './TagFacet';

export class DropdownMenuFacet extends TagFacet {
  constructor(template, filter, container, title) {
    super(template, filter, container, title);

    this.container.on('click', '[data-check]', e => this.onTagClick(e));
  }

  getPrint() {
    let options = this.getOptions();
    return options.reduce((x,o) => {
      let isActive = this.isActive(o);

      return x += `
        <div class="c-collection-top-nav__check" data-check data-option="${o}">
          <input type="checkbox" class="c-collection-top-nav__check-box" ${isActive?'checked':''} />
          <span class="c-collection-top-nav__check-title">
            ${o}
          </span>
        </div>
      `;
    },'');
  }
}
