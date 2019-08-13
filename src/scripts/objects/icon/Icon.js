/*
 *  Icon
 *    Scripts for various icon tasks.
 *
 *  Version:
 *    1.0.0 - 2018/11/30
 */
import $ from 'jquery';
import '@iconfu/svg-inject';
​
export const IMAGE_SELECTOR = "img[src*='.svg']";
​
export const InitialzeSVGImages = () => {
  $(IMAGE_SELECTOR).each((e,i) => SVGInject(i));
​
  //Dom's weird fixing the SVGs to have unique classes for their selectors.
  $('svg').each((i,e) => {
    let randomClass = null;
    while(!randomClass) {
      randomClass = `cust-svg-${Math.round(Math.random() * 999999)}`;
      if(!$(`.${randomClass}`).length) break;
      randomClass = null;
    }
​
    let self = $(e);
    self.addClass(randomClass);
​
    //I'm going to find all root selectors and prepend them with our new specific
    //selector. Some SVGs will have more than one <style>, hence the .each()
    let elStyle = self.find('style');
    $(elStyle).each((i,e) => {
      let styleEl = $(e);
      let elStyleRaw = styleEl.html();
      elStyleRaw = elStyleRaw.split('}').map(def => {
        let selectors = def.split('.');
        if(selectors.length < 2) return def;
        selectors[0] = `.${randomClass} `;
        return selectors.join('.');
      }).join('}');
​
      styleEl.html(elStyleRaw);
    });
  });
}
​
$(document).ready(() => InitialzeSVGImages());
$(document).on('load', IMAGE_SELECTOR, () => InitialzeSVGImages());