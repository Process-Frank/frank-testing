//Imports...
import ShopifySection from './../../shopify/ShopifySection';
import * as SectionActions from './../../actions/shopify/SectionActions';

//Setup the initial state...
const initialState = {};
/*
  State Shape:
  {
    "group": {
      pending: false
      error: undefined,
      sections: [ ... ]
    }
  }
*/

//Now we're going to load in the sections out of the pages' cache
if(typeof window.Sections !== typeof undefined) {
  let keys = Object.keys(window.Sections);
  for(let i = 0; i < keys.length; i++) {
    let k = keys[i];//Group
    initialState[k] = initialState[k] || {sections: []};//Create array for this group
    let o = window.Sections[k];//The data for this group
    for(let y = 0; y < o.length; y++) {
      let s = o[y];//Section data
      let section = ShopifySection.fromJSON(s);
      initialState[k].sections.push(section);//Add Section
    }
  }
}

//Finally we can actually make the reducer
const section = function(state, action) {
  if(typeof state === typeof undefined) state = initialState;
  let { type, meta, payload, error } = action;
  meta = meta && meta.group ? meta.group : meta;

  if(type == String(SectionActions.fetchSections.pending)) {
    state[meta] = {
      ...state[meta],
      pending: true,
      error: undefined
    };
  } else if(type == String(SectionActions.fetchSections.fulfilled)) {
    state[meta] = {
      sections: payload.map((s) => {
        return ShopifySection.fromJSON(s);
      }),
      pending: false,
      error: undefined
    };
  } else if(type == String(SectionActions.fetchSections.rejected)) {
    state[meta] = {
      pending: false,
      error: error
    }
  }

  return state;
}

export default section;
