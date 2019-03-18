/*
 *  Accordion
 *    Styles for controlling accordions.
 *    Will init on all [data-accordion]'s by default, but can be supered as well
 *
 *  Version:
 *    1.0.0 - 2018/12/03
 */
import $ from 'jquery';

export const SLIDE_SELECTOR = '[data-accordion-slide]';
export const TITLE_SELECTOR = '[data-accordion-title]';
export const BODY_SELECTOR = '[data-accordion-body]';

export const EXPANDED_CLASS = 'is-expanded';

export class Accordion {
  constructor(container) {
    this.container = container;

    //Settings
    this.allowMultiple = container.attr('data-multiple') == "true" ? true : false;

    //Setup data attributes
    this.slides = container.find(SLIDE_SELECTOR);
    this.slides.each((e, i) => {
      let self = $(i);
      if(self.attr('data-index')) return;
      //Setup indexes.
      self.attr('data-index', e);
      self.find(`${TITLE_SELECTOR},${BODY_SELECTOR}`).attr('data-index', e);
    });

    //Event listeners
    container.on('click touchend', TITLE_SELECTOR, e => this.onTitleClick(e));
  }

  getSlide(index) {
    //Find slide by index
    return this.container.find(`${SLIDE_SELECTOR}[data-index="${index}"]`);
  }

  useSlide(index) {
    //Get slide
    let slide = this.getSlide(index);

    //If Multiple just toggle
    if(this.allowMultiple) return slide.toggleClass(EXPANDED_CLASS);

    //Not multple, is currently open?
    let close = slide.hasClass(EXPANDED_CLASS);
    this.slides.removeClass(EXPANDED_CLASS);//Close all
    if(close) return;//If was open, leave closed

    //Was not opened before, open now.
    slide.addClass(EXPANDED_CLASS);
  }

  onTitleClick(e) {
    //Get Element
    let self = $(e.currentTarget);
    let index = parseInt(self.attr('data-index'));//Get Index
    if(isNaN(index)) return;//Has index?

    //Cancel click
    e.preventDefault();
    e.stopPropagation();

    //Set Slide
    this.useSlide(index);
  }
}
