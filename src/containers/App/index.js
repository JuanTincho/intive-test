import React, { Component } from 'react';
import Header from '../Header';
import Table from '../Table';
import { Typography } from '@material-ui/core';

class App extends Component {
  render() {
    return (
      <>
        <Typography> Football Player Finder</Typography>
        <Header />
        <Table />
      </>
    );
  }
}

export default App;
