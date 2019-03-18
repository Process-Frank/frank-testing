import $ from 'jquery';

export const WRAPPER = '[data-quantity-selector]';
export const FIELD = '[data-quantity-selector-field]';
export const MINUS_BUTTON = '[data-quantity-selector-minus]';
export const PLUS_BUTTON = '[data-quantity-selector-plus]';

import { ON_CART_PENDING, ON_CART_FINISHED, generateIcon } from '@process-creative/pc-slate-tools';

export const ACTIVE_SELECTORS = [];

export class QuantitySelector {
  constructor(container) {
    this.container = container;

    this.wrapper = container.find(WRAPPER);
    if(!this.wrapper.length) this.wrapper = this.container;

    //Elements
    this.minus = this.container.find(MINUS_BUTTON);
    this.input = this.container.find(FIELD);
    this.plus = this.container.find(PLUS_BUTTON);

    //Values
    this.min = this.wrapper.attr('data-min') || 0;
    this.max = this.wrapper.attr('data-max') || null;
    this.value = this.getSelectorValue();

    if(this.min == "null") this.min = null;
    if(this.max == "null") this.max = null;

    //Events
    this.attachEvents();
  }

  attachEvents() {
    this.minusHandler = e => this.onMinusClick(e);
    this.plusHandler = e => this.onPlusClick(e);
    this.changeHandler = e => this.onFieldChange(e);

    this.cartPendingHandler = () => this.onCartPending();
    this.cartFinishedHandler = () => this.onCartFinished();

    this.container.on('click', MINUS_BUTTON, this.minusHandler);
    this.container.on('click', PLUS_BUTTON, this.plusHandler);
    this.container.on('change', FIELD, this.changeHandler)

    $(document).on(ON_CART_PENDING, this.cartPendingHandler);
    $(document).on(ON_CART_FINISHED, this.cartFinishedHandler);

    if(ACTIVE_SELECTORS.indexOf(this) === -1) ACTIVE_SELECTORS.push(this);
  }

  detachEvents() {
    this.container.off('click', MINUS_BUTTON, this.minusHandler);
    this.container.off('click', PLUS_BUTTON, this.plusHandler);
    this.container.off('change', FIELD, this.changeHandler)

    $(document).off(ON_CART_PENDING, this.cartPendingHandler);
    $(document).off(ON_CART_FINISHED, this.cartFinishedHandler);

    let i = ACTIVE_SELECTORS.indexOf(this);
    if(i !== -1) ACTIVE_SELECTORS.splice(i, 1);
  }

  getValue() { return this.value; }

  getSelectorValue() {
    let val = parseInt(this.input.val());
    if(isNaN(val) || !isFinite(val)) val = 1;
    return val;
  }

  setMin(min) {
    this.min = min;
    this.setValue(this.getValue());
  }

  setMax(max) {
    this.max = max;
    this.setValue(this.getValue());
  }

  setValue(value) {
    //String checking
    value = `${value}`;
    if(!value.replace(/\s/gi).length) value = this.getValue();
    if(!value.replace(/\s/gi).length) value = 1;

    value = parseInt(value);
    if(isNaN(value) || !isFinite(value)) value = 1;

    //Clamping
    if(this.max != null && value > this.max) value = this.max;
    if(this.min != null && value < this.min) value = this.min;


    //No need to update if current
    let current = this.getValue();

    this.value = value;

    //Due to an issue with jQuery we have to wait a frame before we can update
    //the input field to reflect the changes.
    if(this.getSelectorValue() != value) this.input.val(`${value}`);

    this.updateClasses();
    if(current != value) this.onQuantityChanged(value, current);
  }

  //Rendering
  updateClasses() {
    if(this.max != null && this.min != null && this.min >= this.max) {
      this.input.addClass('is-disabled');
      this.input.attr('disabled', 'disabled');
    } else {
      this.input.removeClass('is-disabled');
      this.input.removeAttr('disabled');
    }

    //Update Minus Button
    if(this.min != null && this.getValue() <= this.min) {
      this.minus.addClass('is-disabled');
      this.minus.attr('disabled', 'disabled');
    } else {
      this.minus.removeClass('is-disabled');
      this.minus.removeAttr('disabled');
    }

    //Update Plus Button
    if(this.max != null && this.getValue() >= this.max) {
      this.plus.addClass('is-disabled');
      this.plus.attr('disabled', 'disabled');
    } else {
      this.plus.removeClass('is-disabled');
      this.plus.removeAttr('disabled');
    }
  }

  destroy() {
    this.detachEvents();
  }

  //Events
  onQuantityChanged(newQuantity, oldQuantity) {}
  onQuantityPlus() {}
  onQuantiyMinus() {}

  onFieldChange(e) {
    setTimeout(() => {
      //We have to use current target to avoid the jQuery cutoff
      this.setValue(this.input.val());
    },0);
  }

  onMinusClick(e) {
    e.preventDefault();
    e.stopPropagation();

    this.setValue(this.getValue() - 1);
    this.onQuantiyMinus();
  }

  onPlusClick(e) {
    e.preventDefault();
    e.stopPropagation();

    this.setValue(this.getValue() + 1);
    this.onQuantityPlus();
  }

  onCartPending() {
    this.plus.addClass('is-disabled');
    this.plus.attr('disabled', 'disabled');

    this.minus.addClass('is-disabled');
    this.minus.attr('disabled', 'disabled');

    this.input.addClass('is-disabled');
    this.input.attr('disabled', 'disabled');
  }

  onCartFinished() {
    this.updateClasses();
  }
}

export const generateQuantitySelector = (options) => {
  options = options || {};
  let {
    clazz, name, quantity, min, max, isSmall, styleMinus, stylePlus
  } = options;

  clazz = clazz || "";
  name = name || "quantity";
  styleMinus = styleMinus || 'tertiary';
  stylePlus = stylePlus || 'tertiary';
  if(typeof quantity === typeof undefined) quantity = 1;
  if(typeof min === typeof undefined) min = null;
  if(typeof max === typeof undefined) max = null;
  if(typeof isSmall === typeof undefined) isSmall = false;

  let minusDisabled = false;
  let plusDisabled = false;
  let inputDisabled = false;
  if(min != null && quantity <= min) minusDisabled = true;
  if(max != null && quantity >= max) plusDisabled = true;
  if(max != null && min >= max) inputDisabled = true;

  return `
    <div class="o-quantity-selector ${clazz} ${isSmall?'is-small':''}">
      <button
        type="button" class="
          o-btn is-${styleMinus} is-square o-quantity-selector__button is-minus
          ${isSmall?'':'is-large'}
          ${minusDisabled?'is-disabled':''}
        " ${minusDisabled?'disabled':''} data-quantity-selector-minus
      >
        ${ generateIcon('minus', 'o-btn__icon') }
      </button>

      ${(isSmall ? `
        <input
          type="hidden" value=${quantity}" data-quantity-selector-field name="${name}"
        />
      `:`
        <div class="o-quantity-selector__input">
          <input
            type="text" class="o-quantity-selector__input-field ${inputDisabled?'disabled':''}"
            ${inputDisabled?'disabled':''} value="${quantity}" name="${name}" data-quantity-selector-field
          />
        </div>
      `)}

      <button
        type="button" class="
          o-btn is-${stylePlus} is-square o-quantity-selector__button is-plus
          ${isSmall?'':'is-large'}
          ${plusDisabled?'is-disabled':''}
        " ${plusDisabled?'disabled':''} data-quantity-selector-plus
      >
        ${ generateIcon('plus', 'o-btn__icon') }
      </button>
    </div>
  `;
};
