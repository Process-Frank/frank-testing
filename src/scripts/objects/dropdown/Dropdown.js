import $ from 'jquery';

export const SELECTOR_DROPDOWN = '[data-dropdown]';
export const SELECTOR_DROPDOWN_SELECT = '[data-dropdown-select]';
export const SELECTOR_CURRENT = '[data-dropdown-current]';
export const SELECTOR_MENU = '[data-dropdown-menu]';
export const SELECTOR_ITEM = '[data-dropdown-item]';
export const SELECTOR_INITIALIZED = 'data-dropdown-active';

export const ACTIVE_DROPDOWNS = [];

export class Dropdown {
  constructor(container) {
    this.container = container;

    //Hidden (internal) selector.
    this.selector = container.find(SELECTOR_DROPDOWN_SELECT);

    //Find (or create) our current display
    this.current = container.find(SELECTOR_CURRENT);
    if(!this.current.length) {
      this.current = $(`
        <span class="o-dropdown__current" data-dropdown-current>
        </span>
      `).appendTo(container);
    }

    //Find (or create) our dropdown menu
    this.menu = container.find(SELECTOR_MENU);
    if(!this.menu.length) {
      this.menu = $(`
        <ul class="o-dropdown__menu" data-dropdown-menu>
        </ul>
      `).appendTo(container);
    }

    //Now redraw our elements
    this.drawCurrent();
    this.drawMenu();

    this.attachEvents();
  }

  attachEvents() {
    if(this.container.attr(SELECTOR_INITIALIZED)) return;

    this.clickOutsideHandler = e => this.onClickOutside(e)
    this.clickOpenHandler = e => this.onToggleOpen(e);
    this.clickItemHandler = e => this.onItemClick(e);

    $(document).on('click', this.clickOutsideHandler);
    this.container.on('click', SELECTOR_CURRENT, this.clickOpenHandler);
    this.container.on('click', SELECTOR_ITEM, this.clickItemHandler);

    this.container.attr(SELECTOR_INITIALIZED, 'true');
    ACTIVE_DROPDOWNS.push(this);
  }

  detachEvents() {
    if(!this.container.attr(SELECTOR_INITIALIZED)) return;

    $(document).off('click', this.clickOutsideHandler);
    this.container.off('click', SELECTOR_CURRENT, this.clickOpenHandler);
    this.container.off('click', SELECTOR_ITEM, this.clickItemHandler);

    this.container.removeAttr(SELECTOR_INITIALIZED);

    let i = ACTIVE_DROPDOWNS.indexOf(this);
    ACTIVE_DROPDOWNS.splice(i, 1);
  }

  getSelectedOption() {
    let option = this.selector.find(':selected');
    if(!option.length) option = this.selector.find('option').first();
    return option;
  }

  getValue() {
    return this.selector.val();
  }

  drawCurrent() {
    let selected = this.getSelectedOption();
    this.current.html(selected.html());
  }

  drawMenu() {
    let x = '';

    let options = this.selector.find('option');
    options.each((e,i) => {
      let o = $(i);
      x += `
        <li class="o-dropdown__menu-item" data-dropdown-item data-value="${o.attr('value')}">
          ${o.html()}
        </li>
      `;
    });

    this.menu.html(x);
  }

  onClickOutside(e) {
    if(!this.container.hasClass('is-active')) return;
    let check = this.container.find(e.target);
    if(check.length) return;

    e.preventDefault();
    e.stopPropagation();
    this.container.removeClass('is-active');
  }

  onToggleOpen(e) {
    e.preventDefault();
    e.stopPropagation();
    this.container.toggleClass('is-active');
  }

  onItemClick(e) {
    e.preventDefault();
    e.stopPropagation();
    let self = $(e.currentTarget);
    this.selector.val(self.attr('data-value'));
    this.container.removeClass('is-active');
    this.drawCurrent();
    this.drawMenu();
  }
}

export const InitialzeInactiveDropdowns = () => {
  ACTIVE_DROPDOWNS.forEach(e => {
    e.detachEvents();
    e.attachEvents();
  });

  $(SELECTOR_DROPDOWN).each((i,e) => {
    let self = $(e);
    if(self.attr(SELECTOR_INITIALIZED)) return;
    let dropdown = new Dropdown(self);
  });
};

//$(document).ready(e => InitialzeInactiveDropdowns());
