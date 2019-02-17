const actionTypes = {
  FETCH_DATA_SUCCESS: 'FETCH_DATA_SUCCESS',
  FETCH_DATA_FAIL: 'FETCH_DATA_FAIL',
  IS_LOADING: 'IS_LOADING',
  SET_FILTERED_PLAYERS: 'SET_FILTERED_PLAYERS'
};

const API_URL = 'https://football-players-b31f2.firebaseio.com/players.json';

export { actionTypes, API_URL };
