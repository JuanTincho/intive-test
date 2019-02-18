const actionTypes = {
  FETCH_DATA_SUCCESS: 'FETCH_DATA_SUCCESS',
  FETCH_DATA_FAIL: 'FETCH_DATA_FAIL',
  IS_LOADING: 'IS_LOADING',
  SET_FILTERED_PLAYERS: 'SET_FILTERED_PLAYERS',
};

const API_URL = 'https://football-players-b31f2.firebaseio.com/players.json';

const POSITION_OPTIONS = [
  'Attacking Midfield',
  'Central Midfield',
  'Centre-Back',
  'Centre-Forward',
  'Defensive Midfield',
  'Keeper',
  'Left Midfield',
  'Left Wing',
  'Left-Back',
  'Right-Back',
];

export { actionTypes, API_URL, POSITION_OPTIONS };
