import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  overrides: {
    MuiGrid: {
      item: {
        display: 'flex',
        justifyContent: 'center'
      }
    }
  }
});

export default theme;
