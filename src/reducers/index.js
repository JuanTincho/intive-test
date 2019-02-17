import { fromJS } from 'immutable';
import { actionTypes } from '../constants';

const {
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAIL,
  IS_LOADING,
  SET_FILTERED_PLAYERS
} = actionTypes;

export const playersDatainitialState = fromJS({
  error: null,
  filteredPlayers: [],
  isLoading: false,
  players: []
});

export const playersDataReducer = (state = playersDatainitialState, action) => {
  switch (action.type) {
    case IS_LOADING:
      return state.merge({ isLoading: action.isLoading });
    case FETCH_DATA_SUCCESS:
      return state.merge({ players: fromJS(action.data) });
    case FETCH_DATA_FAIL:
      return state.merge({ error: action.error });
    case SET_FILTERED_PLAYERS:
      return state.merge({ filteredPlayers: fromJS(action.players) });
    default:
      return state;
  }
};
