/*
 *  FAQ Accordion Section
 *    FAQ Accordion Section, includes accordion.
 *
 *  Version:
 *    1.0.0 - 2019/01/08
 */
import { register, ShopifySection } from './../ShopifySection';
import { Accordion } from './../../objects/accordion/Accordion';

export const CONTAINER_SELECTOR = '[data-faq-accordion]';
export const ACCORDION_SELECTOR = '[data-faq-accordion-accordion]';

export class FAQAccordionSection extends ShopifySection {
  constructor(container) {
    super(container);
    this.accordion = new Accordion(this.container.find(ACCORDION_SELECTOR));
  }
}

register(CONTAINER_SELECTOR, FAQAccordionSection);
