/*
 *  Cart Template
 *    Scripts for Cart template
 *
 *  Version:
 *    2.0.0 - 2019/01/24
 */

/*** Sections ***/
import './../sections/cart/CartFeaturedCarousel';


/*** Template ***/
import $ from 'jquery';
import { CartQuantitySelector } from './../objects/cart/CartQuantitySelector';
import { generateQuantitySelector } from './../objects/quantity/QuantitySelector';
import { generateLoader } from './../objects/loader/Loader';
import { generatePricing } from './../objects/pricing/ProductPricing';
import { InitialzeSVGImages } from './../objects/icon/Icon';
import {
  ON_CART_PENDING, ON_CART_FINISHED, removeFromCart, getCurrentCart,
  generatePicture, escapeString, printMoney
} from '@process-creative/pc-slate-tools';


export const CART_TEMPLATE_SELECTOR = '[data-cart-template]';
export const CART_TEMPLATE_PRODUCTS = '[data-cart-template-products]';
export const CART_TEMPLATE_CHECKOUT = '[data-cart-template-checkout]';
export const CART_TEMPLATE_PRODUCT = '[data-cart-template-product]';
export const CART_TEMPLATE_REMOVE = '[data-cart-template-remove]';
export const CART_TEMPLATE_SUBTOTAL = '[data-cart-template-subtotal]';


class CartTemplate {
  constructor(container) {
    this.container = container;
    this.quantitySelectors = [];

    //Elements
    this.products = container.find(CART_TEMPLATE_PRODUCTS);
    this.checkout = container.find(CART_TEMPLATE_CHECKOUT);
    this.subtotal = container.find(CART_TEMPLATE_SUBTOTAL);

    //Events
    this.setupQuantitySelectors();

    $(document).on('click', CART_TEMPLATE_REMOVE, e => this.onRemoveClick(e));
    $(document).on(ON_CART_PENDING, () => this.onCartPending());
    $(document).on(ON_CART_FINISHED, () => this.onCartFinished());

    window.test = this;
  }

  redrawCart() {
    //Get the current cart object...
    let cart = getCurrentCart();

    //If cart is empty, reload the page!
    if(cart.items.length == 0) return window.location.reload();

    //Prepare contents HTML
    let body = `<tbody>`;
    cart.items.forEach((item, i) => {
      let itemIndex = i + 1;
      body += `
        <tr
          data-cart-template-product data-index="${itemIndex}" data-item="${item.id}"
          class="c-cart-template__product"
        >
          <td class="c-cart-template__product-picture">
            <a href="${item.url}" class="c-cart-template__product-picture-container">
              ${generatePicture(
                item.image, 400, [100,200], 'c-cart-template__product-picture-image'
              )}
            </a>
          </td>

          <td class="c-cart-template__product-details">
            <a href="${item.url}">
              <h2 class="c-cart-template__product-title">
                ${escapeString(item.product_title)}
              </h2>
            </a>

            ${item.vendor.length ? `
              <span class="c-cart-template__product-vendor">
                ${ escapeString(item.vendor) }
              </span>
            ` : ''}

            ${item.variant_title ? `
              <p class="o-heading is-size-2 c-cart-template__product-variant">
                ${ escapeString(item.variant_title) }
              </p>
            ` : ''}
          </td>

          <td class="c-cart-template__product-cart">
            ${generateQuantitySelector({
              clazz: 'c-cart-template__product-cart-selector',
              name: 'updates[]',
              quantity: item.quantity,
              min: 1
            })}
          </td>

          <td class="c-cart-template__product-remove">
            <a
              href="/cart/remove?line=${itemIndex}&amp;quantity=0"
              data-cart-template-remove
            >
              ${Language.strings['cart.general.remove']}
            </a>
          </td>

          <td class="c-cart-template__product-pricing o-heading is-size-2">
            ${generatePricing(item.line_price, item.original_line_price, 'c-cart-template__product-pricing-price')}
          </td>
        </tr>
      `;
    });
    body += '</tbody>';
    this.products.html(body);

    //Update the subtotal
    this.subtotal.attr('data-money', cart.total_price);
    this.subtotal.html(printMoney(cart.total_price));

    //Re-attach Quantity Selectors with their logic.
    this.setupQuantitySelectors();
    InitialzeSVGImages();
  }

  setupQuantitySelectors() {
    //Destroy
    this.quantitySelectors.forEach(e => e.destroy());

    //Now recreate
    this.quantitySelectors = [];

    let products = $(CART_TEMPLATE_PRODUCT);
    products.each((e, i) => {
      let self = $(i);
      let index = self.attr('data-index');
      this.quantitySelectors.push(new CartQuantitySelector(this, index, self));
    });
  }

  onCartPending() {
    //Disable checkout button
    this.checkout.attr('disabled', 'disabled');
    this.checkout.addClass('is-disabled');
    this.checkout.html(generateLoader(null, null, null, 20));
  }

  onCartFinished() {
    //Enable Checkout button
    this.checkout.removeAttr('disabled');
    this.checkout.removeClass('is-disabled');
    this.checkout.text(Language.strings['cart.general.checkout']);

    //Redraw the cart contents
    this.redrawCart();
  }

  async onRemoveClick(e) {
    e.preventDefault();
    e.stopPropagation();

    let self = $(e.currentTarget);
    let product = self.closest(CART_TEMPLATE_PRODUCT);
    let index = product.attr('data-index');

    //Now remove Item
    try {
      await removeFromCart(index);
    } catch(e) {
      console.error(e);
    }
  }
}

//Initialize
$(document).ready($(CART_TEMPLATE_SELECTOR).each((e,i) => new CartTemplate($(i))));
