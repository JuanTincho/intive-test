import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import {
  Table as TableMui,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  withStyles
} from '@material-ui/core';
import { playersSelector } from '../../selectors';

const styles = theme => ({
  bodyRow: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.grey[300]
    }
  },
  headRow: {
    backgroundColor: theme.palette.grey[600],
    color: '#ffffff'
  }
});

const calculateAge = date => {
  const today = new Date();
  const birthDate = new Date(date);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age -= 1;
  }
  return age;
};

const Table = ({ classes, players }) => {
  return (
    <Paper>
      <TableMui>
        <TableHead>
          <TableRow className={classes.headRow}>
            <TableCell>Name</TableCell>
            <TableCell>Position</TableCell>
            <TableCell align="right">Age</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* todo: Add LOADER */}
          {players.map(player => (
            <TableRow key={player.name} className={classes.bodyRow}>
              <TableCell>{player.name}</TableCell>
              <TableCell>{player.position}</TableCell>
              <TableCell align="right">
                {calculateAge(player.dateOfBirth)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TableMui>
    </Paper>
  );
};

Table.propTypes = {
  players: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      position: PropTypes.string,
      dateOfBirth: PropTypes.string
    })
  )
};

const mapStateToProps = state => ({
  // todo: Fetch filteredPlayers
  players: playersSelector(state)
});

const withConnect = connect(mapStateToProps);

export default compose(
  withConnect,
  withStyles(styles)
)(Table);
