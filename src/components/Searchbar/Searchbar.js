import React, { Component } from 'react';
import s from './Searchbar.module.css';

export default class Searchbar extends Component {
  state = {
    input: '',
  };

  searchInput = e => {
    this.setState({ input: e.target.value.toLowerCase() });
  };

  searchButton = event => {
    event.preventDefault();
    if (this.state.input.trim() === '') {
      alert('Enter your search term');
      return;
    }
    this.props.inputValue(this.state.input);
    this.setState({ input: '' });
  };

  render() {
    return (
      <header className={s.searchbar}>
        <form className="form" onSubmit={this.searchButton}>
          <button type="submit" className="button">
            Поиск
          </button>

          <input
            className="input"
            type="text"
            autocomplete="off"
            autofocus
            placeholder="Search images and photos"
            value={this.state.input}
            onInput={this.searchInput}
          />
        </form>
      </header>
    );
  }
}
