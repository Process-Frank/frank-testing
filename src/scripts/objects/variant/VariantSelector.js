import $ from 'jquery';
import { jsonFromjQuery, setQueryParams } from '@process-creative/pc-slate-tools';

//Selectors
export const VARIANT_SELECTOR_SELECTOR = '[data-variant-selector]';
export const PRODUCT_JSON_SELECTOR = '[data-product-json]';

//Events
export const ON_VARIANT_CHANGE = 'onVariantChange';

//Errors
export const ERROR_MISSING_SELECTOR = `Could find the variant selector element!`;
export const ERROR_NO_JSON = `Attempted to load the variant selector, however there is no ${PRODUCT_JSON_SELECTOR} found on the page`;
export const ERROR_MULTIPLE_JSON = `Variant Selector found multiple ${PRODUCT_JSON_SELECTOR} elements, this could affect it's functionality.`;
export const ERROR_INVALID_JSON = `Variant Selector failed to load Product JSON!`;
export const ERROR_SELECTED_INVALID_VARIANT = `Cannot set this variant, the ID was not found in the product data!`;

//Class
export class VariantSelector {
  constructor(container, data) {
    this.container = container;

    this.selector = this.container.find(VARIANT_SELECTOR_SELECTOR);
    if(!this.selector || !this.selector.length) throw new Error(ERROR_MISSING_SELECTOR);

    this.currentId = this.selector.val();

    if(!data) {
      //Try and find the product json...
      let jsonElement = [
        () => container.find(PRODUCT_JSON_SELECTOR),
        () => container.closest(PRODUCT_JSON_SELECTOR),
        () => $(PRODUCT_JSON_SELECTOR)
      ].find(e => {
        let x = e();
        return x && x.length;
      });
      if(!jsonElement) throw new Error(ERROR_NO_JSON);
      jsonElement = jsonElement();
      if(!jsonElement || !jsonElement.length) throw new Error(ERROR_NO_JSON);
      if(jsonElement.length > 1) console.error(ERROR_MULTIPLE_JSON);

      try {
        data = jsonFromjQuery(jsonElement);
      } catch(e) {
        console.error(ERROR_INVALID_JSON);
        throw e;
      }
    }
    this.data = data;

    this.container.on('change', VARIANT_SELECTOR_SELECTOR, e => this.onVariantSelected(e));
    $(document).on(ON_VARIANT_CHANGE, (e,variant,variantId) => this.onVariantChange(e, variant, variantId));
  }

  getProductData() { return this.data; }
  getSelectedVariantId() { return this.currentId; }

  getVariantData(variant) {
    if(!variant) variant = this.getSelectedVariantId();
    return this.data.variants.find(v => v.id == variant);
  }

  setVariant(variantId) {
    //Find the variant that matches this ID
    let variant = this.getVariantData(variantId);
    if(!variant) throw new Error(ERROR_SELECTED_INVALID_VARIANT);

    //Update selector
    let selected = this.getSelectedVariantId();
    if(selected !== null && selected != variantId) this.selector.val(variant.id);

    //Update internal variable
    this.currentId = variant.id;

    //Fire event
    $(document).trigger(ON_VARIANT_CHANGE, [variant,variant.id]);

    //Update the url
    let url = setQueryParams({ variant: variant.id });
    history.replaceState({ variant, variantId }, document.title, url);
  }

  onVariantSelected(e) {
    this.setVariant($(e.currentTarget).val());
  }

  onVariantChange(e, variant, variantId) {
    if(variantId == this.getSelectedVariantId()) return;
    this.setVariant(variantId);
  }
}
