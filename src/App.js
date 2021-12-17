import './App.css';
import React, { Component } from 'react';

import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';

class App extends Component {
  state = {
    value: '',
  };

  searchValue = value => {
    this.setState({ value });
  };

  render() {
    return (
      <div className="App">
        <Searchbar inputValue={this.searchValue} />
        <ImageGallery name={this.state.value} />
      </div>
    );
  }
}

export default App;
