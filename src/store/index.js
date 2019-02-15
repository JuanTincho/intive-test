import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { initialState, rootReducer } from '../reducers';
import { fromJS } from 'immutable';

const store = createStore(
  rootReducer,
  fromJS(initialState),
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
