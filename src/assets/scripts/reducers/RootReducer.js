import { combineReducers } from 'redux';

//Import your sub-reducers here.
import SectionReducer from './SectionReducer';
import CustomerReducer from './CustomerReducer';

//Create the Root Reducer
const RootReducer = combineReducers({
  customer: CustomerReducer,
  sections: SectionReducer
});

export default RootReducer;
