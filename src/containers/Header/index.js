import React from 'react';
import PropTypes from 'prop-types';
import { Button, Grid, withStyles, MenuItem } from '@material-ui/core';
import TextField from '../../components/TextField';

const styles = {
  header: {
    margin: '4em 0'
  }
};

const Header = ({ classes }) => {
  return (
    <Grid container className={classes.header} alignItems="center" spacing={24}>
      <TextField placeholder="Player Name" />
      <TextField placeholder="Position" select value="Position">
        <MenuItem value="Position">Position</MenuItem>
      </TextField>
      <TextField
        placeholder="Age"
        type="number"
        InputProps={{ inputProps: { min: 18, max: 40 } }}
      />
      <Grid item xs={3}>
        <Button color="primary" variant="contained">
          Search
        </Button>
      </Grid>
    </Grid>
  );
};

Header.propTypes = {};

export default withStyles(styles)(Header);
