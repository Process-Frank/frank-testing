import $ from 'jquery';
import { getCustomerVendors, getVendorData, getVendorTypes, saveVendors } from './VendorData';
import { escapeString, generateIcon, generatePicture, getCustomer } from '@process-creative/pc-slate-tools';
import { InitialzeSVGImages } from './../../objects/icon/Icon';

export const ATTR_VENDORS = 'data-vendor-selector-vendors';
export const ATTR_VENDOR = 'data-vendor-selector-vendor';
export const ATTR_VENDOR_TITLE = 'data-vendor-title';
export const ATTR_VENDOR_MORE = 'data-vendor-selector-load-more';
export const ATTR_VENDOR_SKIP = 'data-vendor-skip';
export const ATTR_VENDOR_BACK = 'data-vendor-back';
export const ATTR_VENDOR_NEXT = 'data-vendor-next';

export const SELECTOR_VENDORS = `[${ATTR_VENDORS}]`;
export const SELECTOR_VENDOR = `[${ATTR_VENDOR}]`;
export const SELECTOR_VENDOR_MORE = `[${ATTR_VENDOR_MORE}]`;
export const SELECTOR_VENDOR_NEXT = `[${ATTR_VENDOR_NEXT}]`;
export const SELECTOR_VENDOR_BACK = `[${ATTR_VENDOR_BACK}]`;
export const SELECTOR_VENDOR_SKIP = `[${ATTR_VENDOR_SKIP}]`;

const DRAW_COUNT_EACH = 4 * 4;

export class VendorSelector {
  constructor(container, listener) {
    //Setup container
    this.container = container;
    this.listener = listener;

    //Now determine settings, start with the users saved preferences.
    this.settings = getCustomerVendors();//Where key = type and value = vendor

    //Now we will generate the steps based on the data
    this.currentStep = 0;
    this.drawCount = DRAW_COUNT_EACH;

    //Events
    this.container.on('click', SELECTOR_VENDOR, e => this.onVendorSelect(e));
    this.container.on('click', SELECTOR_VENDOR_MORE, e => this.onVendorMore(e));
    this.container.on('click', SELECTOR_VENDOR_NEXT, e => this.onNext(e));
    this.container.on('click', SELECTOR_VENDOR_SKIP, e => this.onSkip(e));
    this.container.on('click', SELECTOR_VENDOR_BACK, e => this.onBack(e));

    //Draw.
    this.draw();
  }

  getCurrentVendorType() {
    return getVendorTypes()[this.currentStep];
  }

  next() {
    let steps = getVendorTypes().length;
    this.drawCount = DRAW_COUNT_EACH;
    this.currentStep++;
    if(this.currentStep >= steps) {
      this.currentStep = steps-1;
      return this.onFinished();
    }
    $('html,body').stop().animate({ scrollTop: this.container.offset().top }, '200');
    this.draw();
  }

  back() {
    this.drawCount = DRAW_COUNT_EACH;
    this.currentStep--;
    if(this.currentStep <= -1) {
      this.currentStep = 0;
      return this.onCancel();
    }
    $('html,body').stop().animate({ scrollTop: this.container.offset().top }, '200');
    this.draw();
  }

  draw() {
    //Get Current Data
    let currentType = this.getCurrentVendorType();
    let currentData = getVendorData()[currentType];
    let userChoice = this.settings[currentType];
    currentData.sort((l,r) => {
      return l.title.localeCompare(r.title);
    });


    let hasPrevious = this.listener || this.currentStep != 0;
    let hasNext = this.currentStep < (getVendorTypes().length-1);

    //Begin building our buffer
    let x = `
      <div class="c-vendor-selector">
        <div class="c-section__heading">
          <h2 class="o-title c-vendor-selector__title">
            ${Language.strings['customer.register.vendor.title']}
          </h2>

          <p class="c-vendor-selector__subtitle">
            ${Language.strings['customer.register.vendor.subtitle']}
          </p>

          <h3 class="o-heading is-size-1 c-vendor-selector__heading">
            ${escapeString(currentType)}
          </h3>

          <div class="o-btn-group">
            <button
              type="button"
              class="o-btn is-large is-tertiary ${!hasPrevious?'is-disabled':''}"
              ${ATTR_VENDOR_BACK} ${!hasPrevious?'disabled="disabled"':''}
            >
              Back
            </button>

            <button
              type="button"
              class="o-btn is-large is-secondary ${userChoice?'':'is-disabled'}"
             ${userChoice?'':'disabled="disabled"'}
              ${ATTR_VENDOR_NEXT}
            >
              ${hasNext ? 'Continue' : 'Save'}
            </button>
          </div>


          <p class="c-vendor-selector__subtitle">
            <span class="o-link c-vendor-selector__skip" ${ATTR_VENDOR_SKIP}>
              Skip ${escapeString(currentType)}
            </span>
          </p>

        </div>

        <div class="c-vendor-selector__vendors" ${SELECTOR_VENDORS}>
          ${currentData.reduce((y,vendor, i) => {
            if(i >= this.drawCount) return y;

            let isSelected = vendor.title ===  userChoice;
            return `${y}
              <div
                class="c-vendor-selector__vendor ${isSelected?'is-selected':''}"
                ${ATTR_VENDOR} ${ATTR_VENDOR_TITLE}="${escapeString(vendor.title)}"
              >
                <div class="c-vendor-selector__vendor-picture">
                  ${generatePicture(vendor.image, 500, [150,300], 'c-vendor-selector__vendor-picture-image')}
                  <div class="c-vendor-selector__vendor-check">
                    ${ generateIcon('checkmark', 'c-vendor-selector__vendor-check-image') }
                  </div>
                </div>

                <h3 class="c-vendor-selector__vendor-title">
                  ${escapeString(vendor.title)}
                </h3>

                <span class="c-vendor-selector__vendor-location">
                  ${generateIcon('location', 'c-vendor-selector__vendor-location-icon', vendor.title)}
                  <span class="c-vendor-selector__vendor-location-title">
                    ${escapeString(vendor.location)}
                  </span>
                </span>
              </div>
            `;
          }, '')}
        </div>

        <div class="c-section__footer">
          <button
            type="button" ${ATTR_VENDOR_MORE}
            class="o-btn is-tertiary is-large is-wide ${this.drawCount >= currentData.length?'is-hidden':''}"
          >
            Load More
          </button>

          ${/*
          <p class="c-vendor-selector__subtitle">
            <span class="o-link c-vendor-selector__skip" ${ATTR_VENDOR_SKIP}>
              Skip ${escapeString(currentType)}
            </span>
          </p>

          <div class="o-btn-group">
            <button
              type="button"
              class="o-btn is-large is-tertiary ${!hasPrevious?'is-disabled':''}"
              ${ATTR_VENDOR_BACK} ${!hasPrevious?'disabled="disabled"':''}
            >
              Back
            </button>

            <button
              type="button"
              class="o-btn is-large is-secondary ${userChoice?'':'is-disabled'}"
             ${userChoice?'':'disabled="disabled"'}
              ${ATTR_VENDOR_NEXT}
            >
              ${hasNext ? 'Continue' : 'Save'}
            </button>
          </div>
          */''}
        </div>
      </div>
    `;

    this.container.html(x);
    InitialzeSVGImages();
  }

  cancelEvent(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  async save() {
    await saveVendors(this.settings);
  }

  onVendorSelect(e) {
    this.cancelEvent(e);
    let self = $(e.currentTarget);
    let vendor = self.attr(ATTR_VENDOR_TITLE);

    let vt = this.getCurrentVendorType();
    let currentSetting = this.settings[vt];
    if(currentSetting == vendor) {
      delete this.settings[vt];
    } else {
      this.settings[vt] = vendor;
    }
    this.draw();

    if(this.listener) this.listener.onVendorSelect(vendor);
  }

  onVendorMore(e) {
    this.cancelEvent(e);
    this.drawCount += DRAW_COUNT_EACH;
    this.draw();
    if(this.listener) this.listener.onVendorLoadMore();
  }

  onNext(e) {
    this.cancelEvent(e);
    this.next();
  }

  onSkip(e) {
    this.cancelEvent(e);
    let vt = this.getCurrentVendorType();
    this.settings[vt] = getCustomerVendors()[vt];
    this.next();
  }

  onBack(e) {
    this.cancelEvent(e);
    this.back();
  }

  onFinished() {
    //Save vendors

    //Now tell the listener(if any)
    if(this.listener) this.listener.onVendorsSelected(this.settings);
  }

  onCancel() {
    if(this.listener) this.listener.onVendorsCancelled();
  }
}
