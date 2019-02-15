import React from 'react';
import PropTypes from 'prop-types';
import { TextField as TextFieldMUI, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  textField: {
    display: 'flex',
    justifyContent: 'center'
  }
});

const TextField = ({
  name,
  value,
  onChange,
  margin,
  variant,
  classes,
  ...other
}) => (
  <Grid item xs={3}>
    <TextFieldMUI
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      variant={variant}
      margin={margin}
      fullWidth
      {...other}
    />
  </Grid>
);

TextField.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  margin: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  variant: PropTypes.string
};

TextField.defaultProps = {
  margin: 'normal',
  onChange: null,
  value: undefined,
  variant: 'outlined'
};

export default withStyles(styles)(TextField);
