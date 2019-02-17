import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  overrides: {
    MuiGrid: {
      item: {
        display: 'flex',
        justifyContent: 'center'
      }
    },
    MuiTableCell: {
      head: {
        color: 'inherit',
        fontSize: '1.25em'
      },
      root: {
        paddingRight: 4,
        paddingLeft: 5
      }
    }
  }
});

export default theme;
