import { createSelector } from 'reselect';

const playersDataSelector = state => state.get('playersData');

export const playersSelector = createSelector(
  playersDataSelector,
  playersData =>
    playersData.get('players') ? playersData.get('players').toJS() : []
);

export const filteredPlayersSelector = createSelector(
  playersDataSelector,
  playersData =>
    playersData.get('filteredPlayers') ? playersData.get('filteredPlayers').toJS() : []
);

          // todo: Add isLoading selector
          // todo: Add error selector
