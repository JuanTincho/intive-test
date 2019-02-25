import * as matchers from 'jest-immutable-matchers';
import { fromJS } from 'immutable';
import { playersDatainitialState, playersDataReducer } from './index';
import {
  setError, fetchDataSuccess, isPlayersLoading, setFilteredPlayers,
} from '../actions';

describe('Players reducer', () => {
  beforeEach(() => {
    jest.addMatchers(matchers);
  });

  it('should return the initial state', () => {
    expect(playersDataReducer(undefined, {})).toEqualImmutable(playersDatainitialState);
  });

  describe('isPlayersLoading action', () => {
    it('should change the isLoading value with the action value', () => {
      const isLoading = true;
      const expectedResult = fromJS({
        error: false,
        filteredPlayers: [],
        isLoading,
        players: [],
      });

      expect(
        playersDataReducer(playersDatainitialState, isPlayersLoading(isLoading)),
      ).toEqualImmutable(expectedResult);
    });
  });

  describe('fetchDataSuccess action', () => {
    it('should change the players with the action value', () => {
      const players = [{ player: 'mock1' }, { player: 'mock2' }];
      const expectedResult = fromJS({
        error: false,
        filteredPlayers: [],
        isLoading: false,
        players,
      });

      expect(
        playersDataReducer(playersDatainitialState, fetchDataSuccess(players)),
      ).toEqualImmutable(expectedResult);
    });
  });

  describe('setError action', () => {
    it('should change the error with the action value', () => {
      const error = true;
      const expectedResult = fromJS({
        error,
        filteredPlayers: [],
        isLoading: false,
        players: [],
      });

      expect(playersDataReducer(playersDatainitialState, setError(error))).toEqualImmutable(
        expectedResult,
      );
    });
  });

  describe('setFilteredPlayers action', () => {
    it('should change the filteredPlayers with the action value', () => {
      const filteredPlayers = [{ player: 'mock1' }, { player: 'mock2' }];
      const expectedResult = fromJS({
        error: false,
        filteredPlayers,
        isLoading: false,
        players: [],
      });

      expect(
        playersDataReducer(playersDatainitialState, setFilteredPlayers(filteredPlayers)),
      ).toEqualImmutable(expectedResult);
    });
  });
});
