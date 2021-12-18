import React, { Component } from 'react';

export default class Button extends Component {
  render() {
    return (
      <div>
        <button type="button" onClick={this.props.onClick}>
          Load more...
        </button>
      </div>
    );
  }
}
