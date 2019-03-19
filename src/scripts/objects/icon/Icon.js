/*
 *  Icon
 *    Scripts for various icon tasks.
 *
 *  Version:
 *    1.0.0 - 2018/11/30
 */
import $ from 'jquery';
import '@iconfu/svg-inject';

export const IMAGE_SELECTOR = "img[src*='.svg']";

export const InitialzeSVGImages = () => {
  $(IMAGE_SELECTOR).each((e,i) => SVGInject(i));
}

$(document).ready(() => InitialzeSVGImages());
$(document).on('load', IMAGE_SELECTOR, () => InitialzeSVGImages());
