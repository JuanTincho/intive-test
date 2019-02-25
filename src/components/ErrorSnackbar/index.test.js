import React from 'react';
import { Snackbar } from '@material-ui/core';
import { createMount } from '@material-ui/core/test-utils';
import { act } from 'react-dom/test-utils';
import { ErrorSnackbar } from './index';

describe('ErrorSnacknar', () => {
  let errorSnackbarWrapper;
  let fetchData;
  let buttons;
  let snackbarComponent;
  let mount;

  beforeEach(() => {
    mount = createMount();
    fetchData = jest.fn();
    errorSnackbarWrapper = mount(<ErrorSnackbar fetchData={fetchData} error />);

    snackbarComponent = errorSnackbarWrapper.find(Snackbar);
    buttons = snackbarComponent.prop('action');
  });

  afterEach(() => {
    jest.clearAllMocks();
    mount.cleanUp();
  });

  it('should open when there is an error', () => {
    expect(snackbarComponent.prop('open')).toBeTruthy();
  });

  it('should fetch the players data when Retry button is clicked', () => {
    expect(buttons[0].props.id).toEqual('button-retry');
    act(() => {
      buttons[0].props.onClick();
    });
    expect(fetchData).toHaveBeenCalledTimes(1);
  });

  it('should close the Snackbar when Close button is clicked', () => {
    expect(buttons[1].props.id).toEqual('button-close');
    act(() => {
      buttons[1].props.onClick();
    });
    errorSnackbarWrapper.update();
    expect(errorSnackbarWrapper.find(Snackbar).prop('open')).toBeFalsy();
  });

  it('should not close the Snackbar when it\'s clicked away from the snackbar', () => {
    expect(buttons[1].props.id).toEqual('button-close');
    act(() => {
      buttons[1].props.onClick(null, 'clickaway');
    });
    errorSnackbarWrapper.update();
    expect(errorSnackbarWrapper.find(Snackbar).prop('open')).toBeTruthy();
  });
});
