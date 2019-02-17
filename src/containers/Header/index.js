import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Grid, MenuItem, withStyles } from '@material-ui/core';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';

import TextField from '../../components/TextField';
import { setFilters as setFiltersActions } from '../../actions';
import { POSITION_OPTIONS } from '../../constants';

const styles = {
  header: {
    margin: '4em 0',
    minHeight: 125
  }
};

class Header extends Component {
  state = {
    age: '',
    name: '',
    position: '',
    error: false
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState(
      {
        [name]: value
      },
      () => this.setState({ error: this.validateName() || this.validateAge() })
    );
  };

  handleKeyPress = e => {
    if (e.which === 13) {
      this.searchPlayers();
    }
  };

  searchPlayers = () => {
    const { age, name, position } = this.state;
    const { setFilters } = this.props;
    if (this.validateName() || this.validateAge()) {
    } else {
      setFilters(age, name.trim(''), position);
    }
  };

  validateAge = () => {
    const { age } = this.state;
    return age !== '' && (+age < 18 || +age > 40);
  };

  validateName = () => {
    const { name } = this.state;
    return !name.trim('').match(/^[a-zA-Z\- ÅåÄäÖöØøÆæÉéÈèÜüÊêÛûÎîÑñ]*$/);
  };

  render() {
    const { age, name, position } = this.state;
    const { classes } = this.props;

    const events = {
      onChange: this.handleChange,
      onKeyPress: this.handleKeyPress
    };

    return (
      <Grid
        container
        className={classes.header}
        alignItems="baseline"
        spacing={24}
      >
        <TextField
          label="Player Name"
          value={name}
          name="name"
          error={this.validateName()}
          {...events}
        />
        <TextField
          select
          value={position}
          label="Position"
          name="position"
          {...events}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {POSITION_OPTIONS.map(position => (
            <MenuItem key={position} value={position}>
              {position}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Age"
          type="number"
          name="age"
          value={age}
          InputProps={{ inputProps: { min: 18, max: 40, step: 1 } }}
          helperText={this.validateAge() ? 'Number between 18 and 40' : ''}
          error={this.validateAge()}
          {...events}
        />
        <Grid item xs={3}>
          <Button
            color="primary"
            variant="contained"
            onClick={this.searchPlayers}
            disabled={this.state.error}
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
