import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux-immutable';

import { composeWithDevTools } from 'redux-devtools-extension';
import { playersDatainitialState, playersDataReducer } from '../reducers';
import { fromJS } from 'immutable';

const store = createStore(
  combineReducers({ playersData: playersDataReducer }),
  fromJS({ playersData: playersDatainitialState }),
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
