import { actionTypes, API_URL } from '../constants';
import { playersSelector } from '../selectors';
import { calculateAge } from '../utils/helperFunctions';

const {
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAIL,
  IS_LOADING,
  SET_FILTERED_PLAYERS
} = actionTypes;

export function fetchDataSuccess(data) {
  return {
    type: FETCH_DATA_SUCCESS,
    data
  };
}

export function fetchDataFail(error) {
  return {
    type: FETCH_DATA_FAIL,
    error
  };
}

export function isLoading(isLoading) {
  return {
    type: IS_LOADING,
    isLoading
  };
}

export function fetchData() {
  return dispatch => {
    dispatch(isLoading(true));
    dispatch(fetchDataFail(false));
    fetch(API_URL)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then(response => response.json())
      .then(data => {
        dispatch(fetchDataSuccess(data));
      })
      .catch(() => dispatch(fetchDataFail(true)))
      .finally(() => {
        dispatch(isLoading(false));
        dispatch(setFilters());
      });
  };
}

export function setFilteredPlayers(players) {
  return {
    type: SET_FILTERED_PLAYERS,
    players
  };
}

export function setFilters(ageFilter, nameFilter, positionFilter) {
  return (dispatch, getState) => {
    const playersList = playersSelector(getState());

    const filteredPlayers = playersList
      .map(({ dateOfBirth, name, position }) => ({
        name,
        position,
        age: calculateAge(dateOfBirth)
      }))
      .filter(({ age, name, position }) => {
        const filterByAge = ageFilter ? age === +ageFilter : true;
        const filterByName = nameFilter
          ? name.toLowerCase().includes(nameFilter.toLowerCase())
          : true;
        const filterByPosition = positionFilter
          ? position === positionFilter
          : true;

        return filterByAge && filterByName && filterByPosition;
      });

    dispatch(setFilteredPlayers(filteredPlayers));
  };
}
