import $ from 'jquery';
import { VariantSelector, ON_VARIANT_CHANGE } from './../variant/VariantSelector';

export { ON_VARIANT_CHANGE } from './../variant/VariantSelector';

//Selectors
export const SWATCH_CONTAINER_SELECTOR = '[data-swatches]';
export const SWATCH_OBJECT_SELECTOR = '[data-swatch-object]';
export const SWATCH_SELECTOR_SELECTOR = '[data-swatch-selector]';

//Errors
export const ERROR_SWATCH_POSITION = 'Target Swatch is missing the position attribute! [data-swatch-position]';
export const ERROR_CURRENT_VARIANT = 'Failed to get currently selected variant!';
export const ERROR_NO_OPTION = 'Failed to find a variant selector option to match current swatch selection!';

//Class
export class Swatch extends VariantSelector {
  constructor(container) {
    super(container);

    this.container.on('click', SWATCH_OBJECT_SELECTOR, e => this.onSwatchClicked(e));
    this.container.on('change', SWATCH_SELECTOR_SELECTOR, e => this.onSwatchSelected(e));

    $(document).on(ON_VARIANT_CHANGE, (e,variant,variantId) => this.onSwatchVariantChanged(e, variant, variantId));

    //Trigger an update on page load.
    this.updateAvailableSwatches();
  }

  //Swatch Button
  onSwatchClicked(e) {
    let self = $(e.currentTarget);
    this.setVariantFromSwatch(self, self.attr('data-value'));
  }

  //Swatch dropdown
  onSwatchSelected(e) {
    let self = $(e.currentTarget);
    this.setVariantFromSwatch(self, self.val());
  }

  onSwatchVariantChanged(e, variant, variantId) {
    //All swatch objects lose focus
    this.container.find(SWATCH_OBJECT_SELECTOR).removeClass('is-selected');

    //Trigger an update (this will hide/show appropriate swatches)
    this.updateAvailableSwatches();

    //Now iterate over the options...
    for(let i = 1; i <= this.data.options.length; i++) {
      //Get value at this option
      let value = variant.options[i-1];
      let ps = `[data-swatch-position="${i}"]`;//Position Selector
      let vs = `[data-value="${value}"]`;//Value Selector

      //Now we can add the class to the selected object
      this.container.find(SWATCH_OBJECT_SELECTOR+ps+vs).addClass('is-selected');

      //Change the value of the selectors
      this.container.find(SWATCH_SELECTOR_SELECTOR+ps).val(value);
    }
  }

  //Simple handler
  setVariantFromSwatch(el, value) {
    //Triggers a standard variant change based on a swatch

    //Get the current swatch index and position
    let [ index, position ] = ['data-index', 'data-swatch-position'].map(e => el.attr(e));
    if(!position) throw new Error(ERROR_SWATCH_POSITION);

    //Get the current variant data.
    let currentVariant = this.getVariantData();
    if(!currentVariant) throw new Error(ERROR_CURRENT_VARIANT);

    //Ok so I was running into a problem regarding multiple levels of variants
    //And this is caused by non standard variants
    //e.g. if a product has the variants:
    // Material Cloth, Color Red
    // Material Cloth, Color Blue
    // Material Silk, Color Red
    // Material Silk, Color Green
    //It will show the color green even if the material is currently cloth, and
    //Will fail to select the variant if there's.. yada yada etc etc basically
    //we need to only show variant subs for variants of top level-ness

    //This is the <option> from within the standard variant selector we're trying
    //to fetch and read the variant id from!
    let selector = '[data-variant-option]';
    let target;

    //Now, for each option (1..2..3)
    for(let i = 1; i <= this.data.options.length; i++) {
      let selectorValue;//We will store the value for this option index, e.g. "Red" for Option1 and "Silk" for Option2...

      //Get the current value at this option
      selectorValue = currentVariant.options[i-1];

      //However, if this index is the position of the swatch that was triggering this update, then use ITS value (thus updating
      if(i == position) selectorValue = value;

      //Store Current jQuery selector
      let selectorTemp = `${selector}`;

      //Append to the new selector..
      selector += `[data-option${i}="${selectorValue}"]`;

      //Now we need to check if the variant we're after even exists.
      target = this.container.find(selector);

      //If it DOESN'T, then the current option index doesn't exist (e.g. Option1 is Silk Okay, But Option2 is Blue, not okay)
      if(target.length) continue;

      //Okay so the selector we're targetting isn't valid for the new selection
      //So that means that we have to just find the first of its kind
      selector = `${selectorTemp}[data-option${i}]:first`;
      target = this.container.find(selector);
    }

    //Now we should have a selector for a variant that actually exists, let's get it
    if(!target.length) throw new Error(ERROR_NO_OPTION);

    //Find the variant ID based from the selection, and set it.
    this.setVariant(target.val());
  }

  updateAvailableSwatches() {
    let current = this.getVariantData();

    //Set Swatch Objects to hidden & sold out
    let objects = this.container.find(SWATCH_OBJECT_SELECTOR);
    ['is-hidden','is-sold-out'].forEach(e => objects.addClass(e));

    //Hide swatch selector options
    this.container.find(`${SWATCH_SELECTOR_SELECTOR} option`).attr('disabled', 'disabled');

    //Top level are always visibile, if there's sub levels
    let tls = `[data-swatch-position="1"]`
    this.container.find(SWATCH_OBJECT_SELECTOR+tls).removeClass('is-hidden');
    this.container.find(`${SWATCH_SELECTOR_SELECTOR+tls} option`).removeAttr('disabled');

    //Now go over reach option to determine visible swatches
    for(let i = 2; i <= this.data.options.length; i++) {
      //Given the selected previous level, what options for *this* level are available?
      let pi = `option${i-1}`;
      let prevOption = current[pi];

      let allowedOptionsForThisLevel = [];
      this.data.variants.forEach(v => {
        let n = v["option"+i];

        //If current iterated variant has the same previous option AND is not already in the list of allowed values...
        if(allowedOptionsForThisLevel.indexOf(n) === -1 && v[pi] == prevOption){
          allowedOptionsForThisLevel.push(n);//Add to list.
        }
      });

      allowedOptionsForThisLevel.forEach(ao => {
        let aos = `[data-swatch-position="${i}"]`;
        this.container.find(SWATCH_OBJECT_SELECTOR+aos+`[data-value="${ao}"]`).removeClass('is-hidden');
        this.container.find(SWATCH_SELECTOR_SELECTOR+aos+` [value="'+ao+'"]`).removeAttr('disabled');
      });
    }

    //Now determine what's sold out for each given level
    for(let i = 1; i <= this.data.options.length; i++) {
      let avail = {};//Stores availability of option[i]'s value.

      //Find if there are any variants for this option with stock available
      this.data.variants.forEach(v => {
        //Check previous options match, since we don't want to check stock of
        //other levels
        let canUse = true;
        for(var y = 1; y < i; y++) {
          let oy = `option${y}`;
          if(v[oy] == current[oy]) continue;
          canUse = false;
          break;
        }
        if(!canUse) return;

        var n = v["option"+i];
        if(typeof avail[n] === typeof undefined) avail[n] = v.available;
        avail[n] = avail[n] || v.available;
      });

      //Now remove these as sold out.
      let keys = Object.entries(avail).forEach(e => {
        let [ key, value] = e;
        if(!value) return;
        this.container.find(`${SWATCH_OBJECT_SELECTOR}[data-swatch-position="${i}"][data-value="${key}"]`).removeClass('is-sold-out');
      });
    }

  }
}
