//Imports...
import ShopifySection from './../shopify/ShopifySection';

//Setup the initial state...
const initialState = {};

//Now we're going to load in the sections out of the pages' cache
if(typeof window.Sections !== typeof undefined) {
  let keys = Object.keys(window.Sections);
  for(let i = 0; i < keys.length; i++) {
    let k = keys[i];//Group
    initialState[k] = initialState[k] || [];//Create array for this group
    let o = window.Sections[k];//The data for this group
    for(let y = 0; y < o.length; y++) {
      let s = o[y];//Section data
      let section = ShopifySection.fromJSON(s);
      initialState[k].push(section);//Add Section
    }
  }
}

//Finally we can actually make the reducer
const section = function(state, action) {
  if(typeof state === typeof undefined) state = initialState;

  switch(action.type) {
    default: {
      return state;
    }
  }
}

export default section;
