import React from 'react';
import { shallow } from 'enzyme';
import { createMount } from '@material-ui/core/test-utils';
import { Table } from './index';

describe('Table', () => {
  let tableWrapper;
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('when there are no players', () => {
    beforeEach(() => {
      const noPlayers = [];

      const mockProps = { classes: {}, players: noPlayers };
      tableWrapper = shallow(<Table {...mockProps} />);
    });

    it('should show a message', () => {
      expect(tableWrapper.find('#message-no-players').prop('children')).toEqual('No players found');
    });
  });

  describe('when there are players', () => {
    let mount;
    let players;

    beforeEach(() => {
      mount = createMount();

      players = [
        { age: 20, name: 'Mock Name', position: 'MockPosition' },
        { age: 25, name: 'Mock Name2', position: 'MockPosition2' },
      ];

      const mockProps = { classes: {}, players };
      tableWrapper = mount(<Table {...mockProps} />);
    });

    afterEach(() => {
      mount.cleanUp();
    });

    it('should render a table with the players', () => {
      expect(tableWrapper.find('tbody tr')).toHaveLength(players.length);
    });
  });
});
