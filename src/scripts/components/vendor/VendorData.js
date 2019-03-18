import Cookies from 'js-cookie';
import $ from 'jquery';
import { getCustomer } from '@process-creative/pc-slate-tools';

export const getVendorData = () => window.Vendors.vendors;
export const getVendorTypes = () => Object.keys(getVendorData());
export const getCustomerVendors = () => {
  let customer = getCustomer();
  if(!customer) return {};
  return customer.vendors || {};
}

//Saving related
export const saveVendors = async (vendors,customer) => {
  customer = customer || getCustomer();
  await jQuery.post('/a/custmeta', {
    customer,
    metafield: { 'bundlfresh.vendors': JSON.stringify(vendors) }
  });
};

//Cooldown related
export const COOKIE_VENDOR_COOLDOWN = 'VENDOR_COOLDOWN';
export const setCooldownVendors = vendors => Cookies.set(COOKIE_VENDOR_COOLDOWN, vendors);
export const getCooldownVendors = () => Cookies.getJSON(COOKIE_VENDOR_COOLDOWN);

export const checkCooldownVendors = async () => {
  let customer = getCustomer();
  if(!customer) return;

  if(Object.keys(getCustomerVendors()).length) return;

  let cooldownVendors = getCooldownVendors();
  if(!cooldownVendors || !Object.keys(cooldownVendors).length) return;
  await saveVendors(cooldownVendors);
  window.location.reload();
};
