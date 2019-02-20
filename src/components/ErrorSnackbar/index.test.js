import React from 'react';
import { shallow } from 'enzyme';
import { Button, Snackbar } from '@material-ui/core';
import { ErrorSnackbar } from './index';

describe('ErrorSnacknar', () => {
  let errorSnackbarWrapper;
  let fetchData;

  const snackbarRoot = global.document.createElement('div');
  snackbarRoot.setAttribute('id', 'snackbar-root');
  const body = global.document.querySelector('body');
  body.appendChild(snackbarRoot);

  beforeEach(() => {
    fetchData = jest.fn();
    errorSnackbarWrapper = shallow(<ErrorSnackbar fetchData={fetchData} error />);
  });

  it('should open when there is an error', () => {
    expect(errorSnackbarWrapper.find(Snackbar).prop('open')).toBeTruthy();
  });

  it('should fetch the players data when Retry is clicked', () => {
    errorSnackbarWrapper
      .dive()
      .shallow()
      .find(Button)
      .simulate('click');
    // expect(button).toEqual({ hola: '2' });
    expect(fetchData).toHaveBeenCalledTimes(1);
  });
});
