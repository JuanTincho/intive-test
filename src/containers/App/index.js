import React, { Component } from 'react';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { MuiThemeProvider, Typography, withStyles } from '@material-ui/core';

import { fetchData as fetchDataAction } from '../../actions';
import Header from '../Header';
import Table from '../Table';
import theme from '../../utils/theme';

const styles = {
  root: {
    margin: 'auto',
    padding: '2em',
    textAlign: 'center',
    width: '50%'
  },
  header: {
    margin: '1em 0'
  }
};

class App extends Component {
  componentDidMount() {
    const { fetchData } = this.props;
    fetchData();
  }
  render() {
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
          <Typography variant="h4" align="center">
            Football Player Finder
          </Typography>
          <Header />
          <Table />
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  fetchData: bindActionCreators(fetchDataAction, dispatch)
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  withStyles(styles)
)(App);
