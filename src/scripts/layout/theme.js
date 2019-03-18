/*
 * Process Slate Shopify theme
 * Copyright 2018 Process Creative
 *
 * Version:
 *    1.0.0 - 2018/10/31
 */
'use strict';//Strict Mode enforced

//Import our babel polyfill
import '@babel/polyfill';
import $ from 'jquery';

// Import our stylesheets
import '../../styles/theme.scss';
import '../../styles/theme.scss.liquid';

//Global objects
import './../objects/icon/Icon';
import './../objects/dropdown/Dropdown';
import './../objects/topbar/TopBar';
import './../objects/newsletter/NewsletterSignupForm';

// Global (Theme) Sections
import './../sections/header/HeaderSection';


/*** Templates ***/
import './../template/customers/addresses';
import './../template/customers/login';
import './../template/customers/register';
import './../template/cart';
import './../template/collection';
import './../template/collection.vendor';
import './../template/index';
import './../template/page.edit-vendors';
import './../template/product';



/*
  Bundlfresh specific, check vendor cooldown
    This happens after attempting registration but Shopify returning a
    redirect to the Challenge page
*/
import { checkCooldownVendors } from './../components/vendor/VendorData';

$(document).ready(() => {
  checkCooldownVendors();
});
