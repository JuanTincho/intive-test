import { createSelector } from 'reselect';

const playersDataSelector = state => state.get('playersData');

export const playersSelector = createSelector(
  playersDataSelector,
  playersData =>
    playersData.get('players') ? playersData.get('players').toJS() : []
);

          // todo: Add isLoading selector
          // todo: Add error selector
