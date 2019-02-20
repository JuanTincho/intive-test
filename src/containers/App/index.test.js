import React from 'react';
import { shallow } from 'enzyme';
import { CircularProgress } from '@material-ui/core';
import Table from '../Table';
import { App } from './index';

describe('App', () => {
  let fetchData;
  let isLoading = false;
  let appWrapper;
  let mockProps;

  beforeEach(() => {
    jest.resetAllMocks();

    fetchData = jest.fn();
    mockProps = { fetchData, classes: {}, isLoading };
  });

  it('should call fetchData', () => {
    appWrapper = shallow(<App {...mockProps} />);
    expect(fetchData).toHaveBeenCalledTimes(1);
  });

  describe('when data isLoading', () => {
    beforeEach(() => {
      isLoading = true;
      appWrapper = shallow(<App {...mockProps} isLoading={isLoading} />);
    });

    it('should render CircularProgress', () => {
      expect(appWrapper.find(CircularProgress)).toHaveLength(1);
    });

    it('should not render Table', () => {
      expect(appWrapper.find(CircularProgress)).toHaveLength(1);
      expect(appWrapper.find(Table)).toHaveLength(0);
    });
  });

  describe('when data is loaded', () => {
    beforeEach(() => {
      isLoading = false;
      appWrapper = shallow(<App {...mockProps} isLoading={isLoading} />);
    });

    it('should  render Table', () => {
      expect(appWrapper.find(Table)).toHaveLength(1);
    });

    it('should not render CircularProgress', () => {
      expect(appWrapper.find(CircularProgress)).toHaveLength(0);
    });
  });
});
