import React from 'react';
import { shallow } from 'enzyme';
import { Header } from './index';

describe('Header', () => {
  let headerWrapper;
  let setFilters;
  let mockProps;

  beforeEach(() => {
    setFilters = jest.fn();
    mockProps = { classes: {}, setFilters };
    headerWrapper = shallow(<Header {...mockProps} />);
  });

  describe('when age, name are position are valid', () => {
    let mockName;
    let mockAge;
    let mockPosition;

    beforeEach(() => {
      mockName = 'mockName';
      mockAge = 25;
      mockPosition = 'mockPosition';

      headerWrapper.find('#name').simulate('change', { target: { name: 'name', value: mockName } });
      headerWrapper.find('#age').simulate('change', { target: { name: 'age', value: mockAge } });
      headerWrapper
        .find('#position')
        .simulate('change', { target: { name: 'position', value: mockPosition } });

      headerWrapper.find('#button').simulate('click');
    });

    it('should search for players with those values', () => {
      expect(setFilters).toHaveBeenCalledWith(mockAge, mockName, mockPosition);
    });
  });

  describe('when age is not valid', () => {
    let mockAge;

    beforeEach(() => {
      mockAge = 17;
      headerWrapper.find('#age').simulate('change', { target: { name: 'age', value: mockAge } });
    });

    it('should show helper Text', () => {
      expect(headerWrapper.find('#age').prop('helperText')).toEqual(
        'Age must be a number between 18 and 40',
      );
    });

    it('should disable button', () => {
      expect(headerWrapper.find('#button').prop('disabled')).toBeTruthy();
    });

    it('should NOT search for players', () => {
      headerWrapper.find('#button').simulate('click');
      expect(setFilters).not.toHaveBeenCalled();
    });
  });

  describe('when name is not valid', () => {
    let mockName;

    beforeEach(() => {
      mockName = 'invalidName456';
      headerWrapper.find('#name').simulate('change', { target: { name: 'name', value: mockName } });
    });

    it('should show helper Text', () => {
      expect(headerWrapper.find('#name').prop('helperText')).toEqual('Please use only letters.');
    });

    it('should disable button', () => {
      expect(headerWrapper.find('#button').prop('disabled')).toBeTruthy();
    });

    it('should NOT search for players', () => {
      headerWrapper.find('#button').simulate('click');
      expect(setFilters).not.toHaveBeenCalled();
    });
  });

  describe('when key is pressed on an input', () => {
    it('should search for players if it is Enter', () => {
      headerWrapper.find('#name').simulate('keyPress', { which: 13 });

      expect(setFilters).toHaveBeenCalledTimes(1);
    });
    it('should not search for players if it is not Enter', () => {
      headerWrapper.find('#name').simulate('keyPress', { which: 1 });
      expect(setFilters).toHaveBeenCalledTimes(0);
    });
  });
});
