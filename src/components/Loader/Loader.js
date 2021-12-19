import s from './Loader.module.css';
import React, { Component } from 'react';

export default class Loader extends Component {
  render() {
    return (
      <div className={s.cssloadSquares}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    );
  }
}
