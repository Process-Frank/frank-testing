import { combineReducers } from 'redux';

//Import your sub-reducers here.
import SectionReducer from './shopify/SectionReducer';
import CustomerReducer from './shopify/CustomerReducer';
import ThemeReducer from './shopify/ThemeReducer';

//Create the Root Reducer
const RootReducer = combineReducers({
  customer: CustomerReducer,
  sections: SectionReducer,
  theme: ThemeReducer
});

export default RootReducer;
