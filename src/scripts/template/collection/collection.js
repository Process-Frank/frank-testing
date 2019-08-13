/*
 *  Collection Template
 *    Contains all the scripts used for the collection template.
 *
 *  Version:
 *    1.0.0 - 2019/01/09
 */
/*** Template ***/
import $ from 'jquery';
//import 'slick-carousel';
import {
  AjaxCollectionTemplate, SelectSorter,

  TagFilter, TypeFilter, VendorFilter, PriceFilter,
  VendorCheckboxFacet, TypeCheckboxFacet, SmartTagCheckboxFacet,
  SmartTagButtonFacet, PriceRangeFacet,

  OPERATION_OR, SELECTOR, InfiniteScroll, Pagination
} from '@process-creative/ajax-collection-v3';
import {
  printMoney, addToCart, ON_CART_PENDING, ON_CART_FINISHED, getCountOfVariantInCart, generateIcon
} from '@process-creative/pc-slate-tools';

import * as ResponsiveSizes from './../settings/Responsive';

//import { SlickButtonFacet } from './../components/facets/SlickButtonFacet';

import { generateLoader } from './../objects/loader/Loader';
//import { InitializeInactiveThumbnails } from './../objects/product/ProductThumbnail';
//import { ProductThumbnail } from './../objects/product/ProductThumbnail';
import { ProductThumbnailPrint } from './../objects/product/ProductThumbnailPrint';



//Define Selectors
export const SORT_SELECT_SELECTOR = '[data-collection-template-sort]';
export const PER_PAGE_SELECTOR = '[data-collection-template-perpage]';

//Faceted Nav Selectors
export const FACETED_NAV_DESIGNER_SELECTOR = '[data-faceted-nav-designer]';
export const FACETED_NAV_DISCOUNT_SELECTOR = '[data-faceted-nav-discount]';
export const FACETED_NAV_STYLE_SELECTOR = '[data-faceted-nav-style]';

//Buttons and controls
export const FACETED_NAV_MORE_BUTTON_SELECTOR = '[data-faceted-nav-more-button]';
export const FACETED_NAV_MORE_CONTAIER_SELECTOR = '[data-faceted-nav-more]';
export const FACETED_NAV_FILTERS_TOGGLE_SELECTOR = '[data-faceted-nav-filters-toggle]';
export const FACETED_NAV_FILTERS_CONTAINER_SELECTOR = '[data-collection-product-filters]';

//Content Blocks
export const CONTENT_BLOCK_SELECTOR = '[data-content-block]';
export const ATTR_CONTENT_BLOCK_POSITION = 'data-content-block-position';

export const COLLECTION_DESCRIPTION_SELECTOR = '[data-collection-description]';

//Header Container, used for scrolling users to the top.
export const HEADER_CONTAINER = '[data-header-inner]';

//Class
export const CLASS_EXPANDED = 'is-expanded';
export const CLASS_VISIBLE = 'is-visible';
export const CLASS_HIDDEN = 'is-hidden';


export const  PAGINATION_DEFAULT = 60;
export const MOBILE_FILTER_BUTTON = '.c-collection-faceted-nav__title';
export const MOBILE_FILTER_GROUP = '.c-collection-faceted-nav__group';



//Create AjaxCollection wrapper
class CollectionTemplate extends AjaxCollectionTemplate {
  constructor(container) {
    super(container);

    //Setup Pagination
    this.pagination.setPaginator(new InfiniteScroll(this));

    //Setup sort
    this.sort.addSorter(new SelectSorter(this, $(SORT_SELECT_SELECTOR)));

    //Setup Filters
    this.designerTagsFilter = new TagFilter(this, 'tag', OPERATION_OR);
    this.discountTagsFilter = new TagFilter(this, 'tag', OPERATION_OR);
    this.styleTagsFilter = new TagFilter(this, 'tag', OPERATION_OR);

    //Setup Facets
    this.designerTagFacet = new SmartTagCheckboxFacet({
      template: this, filter: this.designerTagsFilter, title: 'Designer',
      container: FACETED_NAV_DESIGNER_SELECTOR, prefixes: [ 'Designer' ]
    });

    this.discountTagFacet = new SmartTagCheckboxFacet({
      template: this, filter: this.discountTagsFilter, title: 'Discount amount',
      container: FACETED_NAV_DISCOUNT_SELECTOR, prefixes: [ 'Discount' ]
    });

    this.styleTagFacet = new SmartTagCheckboxFacet({
      template: this, filter: this.styleTagsFilter, title: 'Style',
      container: FACETED_NAV_STYLE_SELECTOR, prefixes: [ 'Style' ]
    });

    //mobile filtering
    //this.mobileFilterButton = container.find(MOBILE_FILTER_BUTTON);

    //Filter Drawer Container
    this.filtersContainer = container.find(FACETED_NAV_FILTERS_CONTAINER_SELECTOR);

    //Add Filters
    [
      this.designerTagsFilter, this.discountTagsFilter, this.styleTagsFilter
    ].forEach(filter => this.filters.addFilter(filter));


    //Add Facets
    [
      this.designerTagFacet, this.discountTagFacet, this.styleTagFacet
    ].forEach(facet => this.filters.addFacet(facet));


    //Element
    this.filterToggle = $(FACETED_NAV_FILTERS_TOGGLE_SELECTOR);
    this.perPageSelector = $(PER_PAGE_SELECTOR);
    this.collectionDescription = $(COLLECTION_DESCRIPTION_SELECTOR);

    this.mobileFilterGroup = $(MOBILE_FILTER_GROUP);

    //Event Handlers
    $(document).on('change', PER_PAGE_SELECTOR, e => this.onPerPageSelect(e));
    $(document).on('click', FACETED_NAV_FILTERS_TOGGLE_SELECTOR, e => this.onFacetedFiltersToggle(e));
    $(document).on(ON_CART_FINISHED, e => this.onCartFinished());
    $(window).on('resize orientationchange', (e) => this.addDrawerClasses(e));

    $(document).on('click touchend', MOBILE_FILTER_BUTTON, e => this.onToggleMobileFilters(e));

    this.addDrawerClasses();
    this.initPerPageSelect();
    
  }

  generatePrint(v,index) {
    let p = v.product;
    let url = this.getVariantUrl(v);

    console.log(p);
    //Class prefix (for making our class names a bit shorter
    let cp = 'o-product-thumbnail';
    let qty = getCountOfVariantInCart(v.id);

    let p2 = {...p};//Duplicate
    p2.variants = p2.variants.map(variant => {
      let v2 = {...variant};//Duplicate
      delete v2.product;//Remove circular reference
      return v2;
    });

    //Check if product has a discounted price.
    let discounted = false;
    let saving = 0;
    let compare = v.compare_at_price;
    if(compare > v.price) {
      discounted = true;
      saving = compare - v.price;
    }

    let available = this.isVariantAvailable(v);


    return ProductThumbnailPrint(p, p2, url, discounted, saving, available, compare, v );

  }

  addDrawerClasses() {
    this.windowWidth = $(window).width();
    if(this.windowWidth < ResponsiveSizes.medium) return;
    this.filtersContainer.addClass(CLASS_EXPANDED);
    this.container.addClass(CLASS_EXPANDED);
    this.filterToggle.addClass(CLASS_EXPANDED);
    this.collectionDescription.addClass(CLASS_EXPANDED);

  }

  onCartFinished() {
    //Remove the loading cart states from product thumbnails.
    $('[data-product-thumbnail]').removeClass('is-cart-pending');
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
    this.container.find(FACETED_NAV_FILTERS_CONTAINER_SELECTOR).toggleClass(CLASS_EXPANDED);
    this.container.toggleClass(CLASS_EXPANDED);
    this.filterToggle.toggleClass(CLASS_EXPANDED);
    this.collectionDescription.toggleClass(CLASS_EXPANDED);

    //Don't redraw if we are less than window width.
    if(this.windowWidth < ResponsiveSizes.medium) return;
    this.content.redraw();
  }

  getContentBlockPosition(cb, thumbnails) {
    if(thumbnails.length <= 0) return -1; //No thumbs? hide

    cb.addClass(CLASS_VISIBLE); //Show the block once we start initialising.

    let pos = cb.attr(ATTR_CONTENT_BLOCK_POSITION);
    if(pos == 0) return 999; //If set to 0, display at the end

    //Don't adjust content position if we are under size medium.
    if(this.windowWidth < ResponsiveSizes.medium) return pos;

    if(!this.container.hasClass(CLASS_EXPANDED) ) {
      pos = parseInt(pos / 3) + parseInt(pos);
      return pos; //Return adjusted position when expanded
    }
    return pos; //Return position when not expanded
  }

  onVariantsDrawn(variants) {
    //InitializeInactiveThumbnails();

    //Remove Loader (wil be added again if needed)
    this.container.find('[data-collection-template-loader]').remove();

    //Did we draw anything? If so don't bother doing anything.
    console.log(`Drawing ${variants.length} variants`);
    if(variants.length) {
      return;
    }

    //Drew nothing, are we fetching? If yes show loader, if not show "no results"
    if(
      !this.fetch.isDataFetched() || this.fetch.isFetchPending ||
      this.fetch.isFetchRunning || typeof this.draw.renderTimeout !== typeof undefined
    ) {
      //Still fetching, show a loader
      this.productsContainer.html(generateLoader(
        true, 'c-collection-template__loading',
        'data-collection-template-loader', 48
      ));
      return;
    }

    this.productsContainer.html('');
  }

  onPageChange() {
    let headerHeight = $(HEADER_CONTAINER).outerHeight();

    $('html,body').animate({
      scrollTop: this.container.offset().top - headerHeight
    },'slow');
  }

  onPerPageSelect() {
    let num = this.perPageSelector.val();
    this.pagination.setPerPage(num);
  }

  initPerPageSelect() {
    //let num = this.pagination.getPerPage();
    this.perPageSelector.val(PAGINATION_DEFAULT);
    this.pagination.setPerPage(PAGINATION_DEFAULT);

  }

  onToggleMobileFilters(e){
    e.preventDefault();
    e.stopPropagation();
    let self = $(e.currentTarget);
    self.parent().toggleClass(CLASS_HIDDEN);
    //self.toggleClass('is-collapsed');
  }

  onFacetTitleClick(e) {
    let self = $(e.currentTarget);
    let slide = self.parent(FACETED_NAV_SLIDE);

    slide.toggleClass(CLASS_EXPANDED);
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
