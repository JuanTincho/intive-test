import { actionTypes, API_URL } from '../constants';

const { FETCH_DATA_SUCCESS, FETCH_DATA_FAIL, IS_LOADING } = actionTypes;

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

    fetch(API_URL)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then(response => response.json())
      .then(data => dispatch(fetchDataSuccess(data)))
      .catch(error => dispatch(fetchDataFail(error)))
      .finally(() => dispatch(isLoading(false)));
  };
}
