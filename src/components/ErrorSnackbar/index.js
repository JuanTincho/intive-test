import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import {
  Snackbar, Button, IconButton, withStyles,
} from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';

import { fetchData as fetchDataAction } from '../../actions';
import { errorSelector } from '../../selectors';

const styles = {};

export const ErrorSnackbar = ({ error, fetchData }) => {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    setOpen(error);
  }, [error]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const fetchPlayers = () => {
    fetchData();
  };

  return (
    <Snackbar
      open={open}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      onClose={handleClose}
      ContentProps={{
        'aria-describedby': 'error-message',
      }}
      message={<span id="error-message">Error fetching players from server</span>}
      action={[
        <Button id="button-retry" key="retry" color="secondary" size="small" onClick={fetchPlayers}>
          RETRY
        </Button>,
        <IconButton
          id="button-close"
          key="close"
          aria-label="Close"
          color="inherit"
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>,
      ]}
    />
  );
};

ErrorSnackbar.propTypes = {
  error: PropTypes.bool.isRequired,
  fetchData: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  error: errorSelector(state),
});

const mapDispatchToProps = dispatch => ({
  fetchData: bindActionCreators(fetchDataAction, dispatch),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withStyles(styles),
)(ErrorSnackbar);
