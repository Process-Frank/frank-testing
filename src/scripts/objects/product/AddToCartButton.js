/*
 *  Add To Cart Button
 *    Contains scrits for add to cart button for product templates
 *
 *  Version:
 *    1.0.0 - 2019/01/24
 */
import $ from 'jquery';
import { addToCart, ON_CART_PENDING, ON_CART_FINISHED, getCountOfVariantInCart } from '@process-creative/pc-slate-tools';
import { ON_VARIANT_CHANGE } from './../variant/VariantSelector';
import { generateLoader } from './../loader/Loader';

export const ADD_BUTTON = '[data-add-to-cart-button]';
export const ADD_NOTIFICATION = '[data-add-to-cart-notification]';

export class AddToCartButton {
  constructor(template, container) {
    this.template = template;
    this.container = container;
    this.cartPending = false;

    //Elements
    this.button = container.find(ADD_BUTTON);
    this.notification = container.find(ADD_NOTIFICATION);

    $(document).on(ON_VARIANT_CHANGE, (e,variant) => this.useVariant(variant));
    $(document).on(ON_CART_PENDING, () => this.onCartPending());
    $(document).on(ON_CART_FINISHED, () => this.onCartFinished());
    container.on('click', ADD_BUTTON, (e) => this.onAddClick(e));

    this.useVariant(this.getVariantData());
  }

  getVariantData() {
    let vs = (this.template.swatches || this.template.variantSelector);
    return vs.getVariantData();
  }

  useVariant(variant) {
    if(this.cartPending) return;//Don't update the button if the cart is pending
    let { available, inventory_policy, inventory_quantity, inventory_management, id } = variant;

    let text = Language.strings['products.product.sold_out'];
    let inCart = getCountOfVariantInCart(id);

    if(this.addCartButtonTimer) {
      clearTimeout(this.addCartButtonTimer);
      this.addCartButtonTimer = undefined;
    }

    if(available) {
      if(inventory_policy != 'continue' && inventory_management != null && (inventory_quantity - inCart) <= 0) {
        available = false;
        text = Language.strings['products.product.all_in_cart'];
      } else {
        text = Language.strings['products.product.add_to_cart'];
      }
    }

    if(inCart > 0) {
      this.notification.addClass('is-visible');
    }

    if(available) {
      this.button.removeClass('is-disabled');
      this.button.removeAttr('disabled');
      this.button.text(text);
    } else {
      this.button.addClass('is-disabled');
      this.button.attr('disabled', 'disabled');
      this.button.text(text);
    }
  }

  onCartPending() {
    this.cartPending = true;

    this.button.addClass('is-disabled');
    this.button.attr('disabled', 'disabled');
    this.button.html(generateLoader(null, null, null, 20));
  }

  onCartFinished() {
    this.cartPending = false;
    this.useVariant(this.getVariantData());

    //2019/03/06 - After clicking add to cart we are going to change it's text.
    //Was this item added, or did something else trigger a cart update?
    if(!this.wasAdded) return;
    this.button.text(Language.strings['products.product.in_cart']);
    this.button.addClass('is-disabled');
    this.button.attr('disabled', 'disabled');
    this.wasAdded = false;
    this.addCartButtonTimer = setTimeout(() => this.useVariant(this.getVariantData()), 1500);
  }

  async onAddClick(e) {
    e.preventDefault();
    e.stopPropagation();
    if(this.button.hasClass('is-disabled')) return;

    try {
      await addToCart(this.getVariantData().id, this.template.quantitySelector.getValue());
      this.wasAdded = true;//This will tell our button to temporarily display the "Was added" text
    } catch(e) {
      console.error(e);
      if(e.description) alert(e.description);
      return;
    }
  }
}
