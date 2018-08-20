import { combineReducers } from 'redux';

/*** Import your sub-reducers here. ***/
import LanguageReducer from './LanguageReducer';

//Shopify Reducers
import SectionReducer from './shopify/SectionReducer';
import CustomerReducer from './shopify/CustomerReducer';
import ThemeReducer from './shopify/ThemeReducer';


/** Create the Root Reducer, Try to keep the order here the same as above. **/
const RootReducer = combineReducers({
  language: LanguageReducer,


  customer: CustomerReducer,
  sections: SectionReducer,
  theme: ThemeReducer
});

export default RootReducer;
