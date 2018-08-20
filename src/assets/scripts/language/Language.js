import React from 'react';

import English from './../../languages/en.default.js';

class Language {
  static getLanguages() {
    return LANGUAGES
  };

  static getLanguage(locale) {
    return LANGUAGES[locale];
  }

  constructor(name, locale, data) {
    this.name = name;
    this.locale = locale;
    this.data = data;
  }

  get(key) {
    if(typeof key === typeof undefined)  return "Invalid Language Key \"undefined\".";
    let j = this.getRecursive(key.split("."));
    if(typeof j === typeof undefined || j == null) return "Missing Language Key \"" + key + "\"";
    return j;
  }

  getRecursive(key_array, data_obj) {
    if(typeof data_obj === typeof undefined) data_obj = this.data;
    if(typeof data_obj === typeof undefined) return null;

    let k = key_array[0];
    let o = data_obj[k];
    if(typeof o === typeof undefined) return null;
    if(typeof o === 'function') o = o();

    //Awesome
    if(key_array.length > 1) {
      if(typeof o !== "object") return null;
      key_array.shift();
      return this.getRecursive(key_array, o);
    }
    return o;
  }
}

export default Language;


export const LANGUAGES = {
  "en": new Language("English", "en", English)
};
