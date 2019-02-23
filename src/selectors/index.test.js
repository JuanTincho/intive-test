import { fromJS } from 'immutable';
import {
  playersDataSelector,
  playersSelector,
  filteredPlayersSelector,
  isLoadingSelector,
  errorSelector,
} from './index';

describe('playersDataSelector', () => {
  it('selects the playersData state', () => {
    const globalState = fromJS({});
    const mockedState = fromJS({ playersData: globalState });
    expect(playersDataSelector(mockedState)).toEqual(globalState);
  });
});

describe('playersSelector', () => {
  it('selects the players subState', () => {
    const playersDataState = { players: [{ player: 'mock1' }, { player: 'mock2' }] };
    const mockedState = fromJS({ playersData: playersDataState });
    expect(playersSelector(mockedState)).toEqual(playersDataState.players);
  });
  it('returns an empty array if players is null', () => {
    const playersDataState = { players: null };
    const mockedState = fromJS({ playersData: playersDataState });
    expect(playersSelector(mockedState)).toEqual([]);
  });
});

describe('filteredPlayersSelector', () => {
  it('selects the filteredPlayers subState', () => {
    const playersDataState = { filteredPlayers: [{ player: 'mock1' }, { player: 'mock2' }] };
    const mockedState = fromJS({ playersData: playersDataState });
    expect(filteredPlayersSelector(mockedState)).toEqual(playersDataState.filteredPlayers);
  });
  it('returns an empty array if playersList is null', () => {
    const playersDataState = { filteredPlayers: null };
    const mockedState = fromJS({ playersData: playersDataState });
    expect(filteredPlayersSelector(mockedState)).toEqual([]);
  });
});

describe('errorSelector', () => {
  it('selects the error subState', () => {
    const errorState = { error: false };
    const mockedState = fromJS({ playersData: errorState });
    expect(errorSelector(mockedState)).toEqual(errorState.error);
  });
});

describe('isLoadingSelector', () => {
  it('selects the isLoading subState', () => {
    const isLoadingState = { isLoading: true };
    const mockedState = fromJS({ playersData: isLoadingState });
    expect(isLoadingSelector(mockedState)).toEqual(isLoadingState.isLoading);
  });
});
