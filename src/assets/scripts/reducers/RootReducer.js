import { combineReducers } from 'redux';

/*** Import your sub-reducers here. ***/
import LanguageReducer from './language/LanguageReducer';

//Shopify Reducers
import CollectionReducer from './shopify/CollectionReducer';
import CustomerReducer from './shopify/CustomerReducer';
import SectionReducer from './shopify/SectionReducer';
import ShopReducer from './shopify/ShopReducer';
import ProductReducer from './shopify/ProductReducer';
import ThemeReducer from './shopify/ThemeReducer';


/** Create the Root Reducer, Try to keep the order here the same as above. **/
const RootReducer = combineReducers({
  language: LanguageReducer,

  collection: CollectionReducer,
  customer: CustomerReducer,
  product: ProductReducer,
  sections: SectionReducer,
  theme: ThemeReducer,
  shop: ShopReducer
});

export default RootReducer;
