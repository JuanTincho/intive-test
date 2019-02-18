import { createSelector } from 'reselect';

const playersDataSelector = state => state.get('playersData');

export const playersSelector = createSelector(
  playersDataSelector,
  playersDataState => (playersDataState.get('players')
    ? playersDataState.get('players').toJS()
    : []),
);

export const filteredPlayersSelector = createSelector(
  playersDataSelector,
  playersDataState => (playersDataState.get('filteredPlayers')
    ? playersDataState.get('filteredPlayers').toJS()
    : []),
);

export const isLoadingSelector = createSelector(
  playersDataSelector,
  playersDataState => playersDataState.get('isLoading'),
);

export const errorSelector = createSelector(
  playersDataSelector,
  playersDataState => playersDataState.get('error'),
);
