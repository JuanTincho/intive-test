import { actionTypes, API_URL } from '../constants';
import { playersSelector } from '../selectors';
import calculateAge from '../utils/helperFunctions';

const {
  FETCH_DATA_SUCCESS, SET_ERROR, IS_LOADING, SET_FILTERED_PLAYERS,
} = actionTypes;

export function fetchDataSuccess(data) {
  return {
    type: FETCH_DATA_SUCCESS,
    data,
  };
}

export function setError(error) {
  return {
    type: SET_ERROR,
    error,
  };
}

export function isPlayersLoading(isLoading) {
  return {
    type: IS_LOADING,
    isLoading,
  };
}

export function setFilteredPlayers(players) {
  return {
    type: SET_FILTERED_PLAYERS,
    players,
  };
}

export function setFilters(ageFilter, nameFilter, positionFilter) {
  return (dispatch, getState) => {
    const playersList = playersSelector(getState());

    const filteredPlayers = playersList
      .map(({ dateOfBirth, name, position }) => ({
        name,
        position,
        age: calculateAge(dateOfBirth),
      }))
      .filter(({ age, name, position }) => {
        const filterByAge = ageFilter ? age === +ageFilter : true;
        const filterByName = nameFilter
          ? name.toLowerCase().includes(nameFilter.toLowerCase())
          : true;
        const filterByPosition = positionFilter ? position === positionFilter : true;

        return filterByAge && filterByName && filterByPosition;
      });

    return dispatch(setFilteredPlayers(filteredPlayers));
  };
}

export function fetchData() {
  return (dispatch) => {
    dispatch(isPlayersLoading(true));
    dispatch(setError(false));
    return fetch(API_URL)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then(response => response.json())
      .then(data => dispatch(fetchDataSuccess(data)))
      .then(() => dispatch(setFilters()))
      .catch(() => dispatch(setError(true)))
      .finally(() => {
        dispatch(isPlayersLoading(false));
      });
  };
}
