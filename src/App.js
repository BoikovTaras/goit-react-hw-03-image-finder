import './App.css';
import React, { Component } from 'react';

import Searchbar from './components/Searchbar/Searchbar';

class App extends Component {
  state = {
    searchValue: '',
  };

  searchValue = searchValue => {
    this.setState({ searchValue });
  };

  render() {
    return (
      <div className="App">
        <Searchbar inputValue={this.searchValue} />
      </div>
    );
  }
}

export default App;
