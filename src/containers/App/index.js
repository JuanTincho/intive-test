import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import {
  CircularProgress, MuiThemeProvider, Typography, withStyles,
} from '@material-ui/core';

import { fetchData as fetchDataAction } from '../../actions';
import Header from '../Header';
import Table from '../Table';
import theme from '../../utils/theme';
import { isLoadingSelector } from '../../selectors';
import ErrorSnackbar from '../../components/ErrorSnackbar';

const styles = {
  root: {
    margin: 'auto',
    padding: '2em',
    textAlign: 'center',
    width: '50%',
  },
};

export class App extends Component {
  componentDidMount() {
    const { fetchData } = this.props;
    fetchData();
  }

  render() {
    const { classes, isLoading } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
          <Typography variant="h4" align="center">
            Football Player Finder
          </Typography>
          <Header />
          {isLoading ? <CircularProgress size={140} /> : <Table />}
        </div>
        <ErrorSnackbar />
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
  fetchData: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isLoading: isLoadingSelector(state),
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
)(App);
