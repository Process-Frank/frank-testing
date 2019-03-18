import $ from 'jquery';

import { getCountOfVariantInCart, updateCart } from '@process-creative/pc-slate-tools';
import { QuantitySelector } from './../quantity/QuantitySelector';

export class CartQuantitySelector extends QuantitySelector {
  constructor(cart, index, container) {
    super(container);

    this.template = cart;
    this.index = index;
  }

  onQuantityChanged(quantity) {
    this.updateQuantity(quantity);
  }

  updateQuantity(qty) {
    updateCart(this.index, qty);
  }
}
