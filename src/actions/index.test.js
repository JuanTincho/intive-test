import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import * as actions from './index';
import { playersSelector } from '../selectors';
import calculateAge from '../utils/helperFunctions';

import { API_URL, actionTypes } from '../constants';

const mockAge = 25;
jest.mock('../utils/helperFunctions', () => jest.fn(() => mockAge));

const mockName = 'mockName';
const mockPosition = 'mockPosition';
jest.mock('../selectors', () => ({
  playersSelector: jest.fn(() => [
    { name: 'mockName', dateOfBirth: 'mockDate', position: 'mockPosition' },
  ]),
}));

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async actions', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('creates FETCH_DATA_SUCCESS when fetching data has been done', () => {
    const mockPlayer = 'mockPlayer';

    fetchMock.getOnce(API_URL, {
      body: [mockPlayer],
      headers: { 'content-type': 'application/json' },
    });

    const expectedActions = [
      { type: actionTypes.IS_LOADING, isLoading: true },
      { type: actionTypes.SET_ERROR, error: false },
      { type: actionTypes.FETCH_DATA_SUCCESS, data: [mockPlayer] },
      {
        type: actionTypes.SET_FILTERED_PLAYERS,
        players: [{ name: mockName, age: mockAge, position: mockPosition }],
      },
      { type: actionTypes.IS_LOADING, isLoading: false },
    ];

    const store = mockStore({
      error: false,
      filteredPlayers: [],
      isLoading: false,
      players: [],
    });

    return store.dispatch(actions.fetchData()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates SET_ERROR when fetching data returns an error', () => {
    fetchMock.getOnce(API_URL, 500);

    const expectedActions = [
      { type: actionTypes.IS_LOADING, isLoading: true },
      { type: actionTypes.SET_ERROR, error: false },
      { type: actionTypes.SET_ERROR, error: true },
      { type: actionTypes.IS_LOADING, isLoading: false },
    ];

    const store = mockStore({
      error: false,
      filteredPlayers: [],
      isLoading: false,
      players: [],
    });

    return store.dispatch(actions.fetchData()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
