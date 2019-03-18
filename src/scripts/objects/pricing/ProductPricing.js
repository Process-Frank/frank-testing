import { printMoney } from '@process-creative/pc-slate-tools';

export const generatePricing = (price, compare_price, clazz) => {
  clazz = clazz || "";

  let x = `<div class="o-product-pricing ${clazz}">`;
  if(price == 0) {
    x += `
      <span
        class="o-product-pricing__money o-product-pricing__price ${clazz}-money ${clazz}-price"
        data-currency data-product-money
      >
        FREE
      </span>
    `;
  } else {
    x += `
      <span
        class="o-product-pricing__money o-product-pricing__price ${clazz}-money ${clazz}-price"
        data-currency data-money="${price}" data-product-money
      >
        ${printMoney(price)}
      </span>
    `;
  }


  let hasCompare = typeof compare_price !== typeof undefined && compare_price > price;

  x += `<span class="o-product-pricing__money o-product-pricing__compare ${clazz}-money ${clazz}-compare" data-currency `;
  if(hasCompare) x += `data-money="${compare_price}"`;
  x += '>';
  if(hasCompare) x += printMoney(compare_price);
  x += '</span>';

  x += '</div>';
  return x;
}
