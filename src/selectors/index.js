import { createSelector } from 'reselect';

const playersDataSelector = state => state.get('playersData');

const playersSelector = createSelector(
  playersDataSelector,
  playersDataState => (playersDataState.get('players') ? playersDataState.get('players').toJS() : []),
);

const filteredPlayersSelector = createSelector(
  playersDataSelector,
  playersDataState => (playersDataState.get('filteredPlayers') ? playersDataState.get('filteredPlayers').toJS() : []),
);

const isLoadingSelector = createSelector(
  playersDataSelector,
  playersDataState => playersDataState.get('isLoading'),
);

const errorSelector = createSelector(
  playersDataSelector,
  playersDataState => playersDataState.get('error'),
);

export {
  playersDataSelector, playersSelector, filteredPlayersSelector, isLoadingSelector, errorSelector,
};
