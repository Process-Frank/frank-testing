/*
 *  Collection Template
 *    Contains all the scripts used for the collection template.
 *
 *  Version:
 *    1.0.0 - 2019/01/09
 */
/*** Template ***/
import $ from 'jquery';
import { InitialzeSVGImages } from './../objects/icon/Icon';
import { InitializeInactiveThumbnails } from './../objects/product/ProductThumbnail';
import { generateLoader } from './../objects/loader/Loader';
import { getCustomerVendors } from './../components/vendor/VendorData';
import { generateQuantitySelector } from './../objects/quantity/QuantitySelector';

import {
  AjaxCollectionTemplate, SelectSorter, VendorFilter, TypeFilter, TagFilter,
  OPERATION_OR,
  LoadMore, TagCheckboxFacet, SELECTOR
} from '@process-creative/ajax-collection-v3';
import {
  TypeListFacet, TagPillFacet, DropdownMenuFacet, TypePillFacet
} from './../components/facets/';
import {
  printMoney, addToCart, ON_CART_PENDING, ON_CART_FINISHED, getCountOfVariantInCart, generateIcon
} from '@process-creative/pc-slate-tools';


//Define Selectors
export const LOAD_MORE_BUTTON_SELECTOR = '[data-collection-template-load-more]';
export const SORT_SELECT_SELECTOR = '[data-collection-template-sort]';

export const FACETED_NAV_TYPES_SELECTOR = '[data-faceted-nav-types]';
export const FACETED_NAV_TYPE_PILLS_SELECTOR = '[data-faceted-nav-type-pills]';

export const FACETED_NAV_TAG_PILLS_SELECTOR = '[data-faceted-nav-tag-pills]';
export const FACETED_NAV_DROPDOWN_FACET_SELECTOR = '[data-faceted-nav-more-dropdown]';

export const FACETED_NAV_FILTERS_TAGS_SELECTOR = '[data-faceted-nav-filters-tags]';

export const FACETED_NAV_MORE_BUTTON_SELECTOR = '[data-faceted-nav-more-button]';
export const FACETED_NAV_MORE_CONTAIER_SELECTOR = '[data-faceted-nav-more]';
export const FACETED_NAV_FILTERS_TOGGLE_SELECTOR = '[data-faceted-nav-filters-toggle]';
export const FACETED_NAV_FILTERS_CONTAINER_SELECTOR = '[data-faceted-nav-filters]';

export const VIEW_BUNDLE_BUTTON_SELECTOR = '[data-view-bundle]';
export const BUNDLE_POPUP_SELECTOR = '[data-view-bundle-popup]';



//Create AjaxCollection wrapper
class CollectionTemplate extends AjaxCollectionTemplate {
  constructor(container) {
    super(container);

    //High priority click event listener
    $(document).on('click', e => this.onClickOutside(e));

    //Store customer vendors...
    this.customerVendors = getCustomerVendors();
    this.selectedCustomerVendors = Object.keys(this.customerVendors).map(e => this.customerVendors[e]);

    //Setup Pagination
    this.pagination.setPaginator(new LoadMore(this, container.find(LOAD_MORE_BUTTON_SELECTOR)));

    //Setup sort
    this.sort.addSorter(new SelectSorter(this, container.find(SORT_SELECT_SELECTOR)));

    //Setup Facets and Filters
    this.vendorFilter = new VendorFilter(this, 'vendor', this.selectedCustomerVendors);
    this.typesFilter = new TypeFilter(this, 'type');
    this.tagsFilter = new TagFilter(this, 'tag', OPERATION_OR);

    this.typesFacet = new TypeListFacet(this, this.typesFilter, FACETED_NAV_TYPES_SELECTOR, 'Types');
    this.typesPillFacet = new TypePillFacet(this, this.typesFilter, FACETED_NAV_TYPE_PILLS_SELECTOR, 'Types');
    this.tagsFacet = new TagPillFacet(this, this.tagsFilter, FACETED_NAV_TAG_PILLS_SELECTOR, 'Pills');
    this.filterTagsFacet = new TagCheckboxFacet(this, this.tagsFilter, FACETED_NAV_FILTERS_TAGS_SELECTOR, 'Checkboxes');
    this.dropdownFacet = new DropdownMenuFacet(this, this.tagsFilter, FACETED_NAV_DROPDOWN_FACET_SELECTOR, 'Dropdown');

    //Add Filters and facets.
    [
      this.vendorFilter, this.typesFilter, this.tagsFilter
    ].forEach(filter => this.filters.addFilter(filter));

    [
      this.typesFacet, this.typesPillFacet, this.tagsFacet, this.filterTagsFacet,
      this.dropdownFacet
    ].forEach(facet => this.filters.addFacet(facet));

    /*** Custom (Specific to Bundlfresh) ***/
    this.container.on('click', FACETED_NAV_MORE_BUTTON_SELECTOR, e => this.onFacetedMoreToggle(e));
    this.container.on('click', FACETED_NAV_FILTERS_TOGGLE_SELECTOR, e => this.onFacetedFiltersToggle(e));
    this.container.on('click', VIEW_BUNDLE_BUTTON_SELECTOR, () => container.find(BUNDLE_POPUP_SELECTOR).toggleClass('is-visible'));
    $(document).on(ON_CART_PENDING, e => this.onCartPending());
    $(document).on(ON_CART_FINISHED, e => this.onCartFinished());
  }

  getShopifyFetch(page) {
    if(this.handle !== 'all') {
      return super.getShopifyFetch(page);
    }

    let vendorSearch = this.selectedCustomerVendors.map(v => `"${v}"`).join(' OR ');
    let x = {
      url: '/search',
      params: {
        page,
        type: 'product',
        q: `(vendor:${ vendorSearch })`,
        view: 'vendor-json'
      }
    };
    return x;
  }

  generatePrint(v,index) {
    let p = v.product;
    let url = this.getVariantUrl(v);

    //Class prefix (for making our class names a bit shorter
    let cp = 'o-product-thumbnail-collection';

    let qty = getCountOfVariantInCart(v.id);

    return `
      <div
        class="${cp} ${qty > 0 ? 'is-in-cart' : '' }"
        ${this.generateThumbnailAttributes(v)}
        data-product-thumbnail-collection
      >
        <div class="${cp}__container">
          ${this.generateThumbnailMeta(v)}
          ${generateLoader(true, `${cp}__loader`)}

          <a href="${url}" class="${cp}__picture">
            ${this.generateThumbnailPicture(v, `${cp}__picture-image`)}
            <div
              class="o-product-thumbnail-collection__picture-quantity ${qty>0?'is-visible':''}"
              data-product-thumbnail-quantity
              title="You have ${qty} in your cart"
            >
              ${qty}
            </div>
          </a>

          <div class="${cp}__details">
            <h3 itemprop="name" class="${cp}__title">
              <a href="${url}">${this.escape(p.title)}</a>
            </h3>

            `+(p.vendor && p.vendor.length ? `
              <span temprop="brand" class="${cp}__vendor">
                ${this.escape(p.vendor)}
              </span>
            ` : '')+`
          </div>

          <div class="o-product-thumbnail-collection__quantity">
            `+(p.variants.length == 1 ? `
              <span class="o-product-thumbnail-collection__quantity-title">
                ${this.escape(
                  v.title != 'Default Title' && v.title != null ?
                    v.title
                  : '1'
                )} /
                <span data-currency data-money="${v.price}">
                  ${printMoney(v.price)}
                </span>
              </span>

              <div class="o-product-thumbnail__quantity-selector">
                ${generateQuantitySelector({
                  quantity: qty,
                  min: 0,
                  isSmall: true,
                  stylePlus: 'secondary'
                })}
              </div>
            ` : `
              <div class="${cp}__selector">
                <div class="${cp}__selector-select o-dropdown is-upward" data-dropdown>
                  <select data-dropdown-select>
                    ${p.variants.reduce((x,variant) => {
                      return x += `<option value="${variant.id}" ${variant.id === v.id?'selected':''}>
                        ${this.escape(variant.title)} / ${printMoney(variant.price)}
                      </option>
                      `
                    }, '')}
                  </select>
                </div>

                <button type="button" class="o-btn is-secondary is-square" data-add-selected>
                  ${ generateIcon('plus', 'o-btn__icon') }
                </button>
              </div>`
            )+`
          </div>
        </div>
      </div>
    `;
  }

  //Faceted Navigation "More" Toggle
  onCartPending() {
  }

  onCartFinished() {
    $('[data-product-thumbnail]').removeClass('is-cart-pending');
  }

  onClickOutside(e) {
    let moreContainer = this.container.find(FACETED_NAV_MORE_CONTAIER_SELECTOR);
    if(!moreContainer.hasClass('is-visible')) return;

    let h = moreContainer.find(e.target);
    if(h.length) return;

    e.preventDefault();
    e.stopPropagation();
    moreContainer.removeClass('is-visible');
  }

  onFacetedMoreToggle(e) {
    e.preventDefault();
    e.stopPropagation();
    this.container.find(FACETED_NAV_MORE_CONTAIER_SELECTOR).toggleClass('is-visible');
  }

  //Faceted Navigation "Filters" Toggle (For mobile)
  onFacetedFiltersToggle(e) {
    e.preventDefault();
    e.stopPropagation();
    this.container.find(FACETED_NAV_FILTERS_CONTAINER_SELECTOR).toggleClass('is-expanded');
  }

  onVariantsDrawn() {
    InitializeInactiveThumbnails();
    InitialzeSVGImages();
  }
}


/*** Initialize Collection Template ***/
$(document).ready(() => {
  //Find container
  let container = $('[data-collection-template]');
  if(!container.length) return;
  if(container.attr('data-initialized')) return;

  //Create the template, we use window.collection for TESTING only!!
  let template = window.collection = new CollectionTemplate(container);

  //Now initialize it
  template.init();
});
