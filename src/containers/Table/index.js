import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  Paper,
  Table as TableMui,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  withStyles,
  Typography,
} from '@material-ui/core';
import { filteredPlayersSelector } from '../../selectors';

const styles = theme => ({
  bodyRow: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.grey[300],
    },
  },
  headRow: {
    backgroundColor: theme.palette.grey[600],
    color: '#ffffff',
  },
});

const Table = ({ classes, players }) => (
  <Paper>
    {!players.length ? (
      <Typography variant="headline"> No players found</Typography>
    ) : (
      <TableMui>
        <TableHead>
          <TableRow className={classes.headRow}>
            <TableCell>Name</TableCell>
            <TableCell>Position</TableCell>
            <TableCell align="right">Age</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {players.map(({ age, name, position }) => (
            <TableRow key={name} className={classes.bodyRow}>
              <TableCell>{name}</TableCell>
              <TableCell>{position}</TableCell>
              <TableCell align="right">{age}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TableMui>
    )}
  </Paper>
);

Table.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
  players: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      position: PropTypes.string,
      age: PropTypes.number,
    }),
  ).isRequired,
};

const mapStateToProps = state => ({
  players: filteredPlayersSelector(state),
});

const withConnect = connect(mapStateToProps);

export default compose(
  withConnect,
  withStyles(styles),
)(Table);
