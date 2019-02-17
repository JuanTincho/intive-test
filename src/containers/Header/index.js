import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Grid, MenuItem, withStyles } from '@material-ui/core';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';

import TextField from '../../components/TextField';
import { setFilters as setFiltersActions } from '../../actions';

const styles = {
  header: {
    margin: '4em 0'
  }
};

class Header extends Component {
  state = {
    age: null,
    name: '',
    position: ''
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  searchPlayers = () => {
    const { age, name, position } = this.state;
    const { setFilters } = this.props;
    setFilters(age, name, position);
    // todo: Add action to save filters in Redux Store
  };

  render() {
    const { age, name, position } = this.state;
    const { classes } = this.props;
    return (
      <Grid
        container
        className={classes.header}
        alignItems="center"
        spacing={24}
      >
        <TextField
          placeholder="Player Name"
          value={name}
          name="name"
          onChange={this.handleChange}
        />
        <TextField
          placeholder="Position"
          select
          value={position}
          name="position"
          onChange={this.handleChange}
        >
          <MenuItem value="Position">Position</MenuItem>
        </TextField>
        <TextField
          placeholder="Age"
          type="number"
          name="age"
          value={age}
          onChange={this.handleChange}
          InputProps={{ inputProps: { min: 18, max: 40 } }}
        />
        <Grid item xs={3}>
          <Button
            color="primary"
            variant="contained"
            onClick={this.searchPlayers}
          >
            Search
          </Button>
        </Grid>
      </Grid>
    );
  }
}

Header.propTypes = {};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  setFilters: bindActionCreators(setFiltersActions, dispatch)
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  withStyles(styles)
)(Header);
