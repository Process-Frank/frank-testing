import qs from 'qs';
import fetch from 'cross-fetch';

export const queryURL = (url, query) => {
  let qstring = qs.stringify(query);
  url = url + (url.indexOf('?') === -1 ? '?' : '&') + qstring;
  return url;
}

export const templateFetch = async (url, params, view) => {
  if(typeof params === typeof undefined) params = {};
  if(typeof view === typeof undefined) view = 'json';
  params = {
    view,
    ...params
  };

  url = queryURL(url, params);
  let x = await fetch(url);
  return await x.json();
};
