import $ from 'jquery';

import { QuantitySelector } from './../quantity/QuantitySelector';
import { ON_VARIANT_CHANGE } from './../variant/VariantSelector';
import { getCountOfVariantInCart } from '@process-creative/pc-slate-tools';

export class ProductTemplateQuantitySelector extends QuantitySelector {
  constructor(productTemplate, container) {
    super(container);
    this.template = productTemplate;

    $(document).on(ON_VARIANT_CHANGE, (e,variant) => this.useVariant(variant));
    this.useVariant(this.getVariantData());
  }

  getVariantData() {
    let vs = (this.template.swatches || this.template.variantSelector);
    return vs.getVariantData();
  }

  useVariant(variant) {
    let { inventory_policy, inventory_quantity, inventory_management, id } = variant;

    //Adjust quantiy selector
    let max = null;
    if(inventory_policy == 'continue' || inventory_management == null) {
    } else {
      max = inventory_quantity - getCountOfVariantInCart(id);
    }
    this.setMax(max);
  }

  onCartFinished() {
    this.useVariant(this.getVariantData());
    super.onCartFinished();
  }
}
