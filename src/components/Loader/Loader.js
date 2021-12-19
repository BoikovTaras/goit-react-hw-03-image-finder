import s from './Loader.module.css';
import React, { Component } from 'react';

export default class Loader extends Component {
  render() {
    return (
      <div id="ballsWaveG">
        <div id="ballsWaveG_1" className={s.ballsWaveG}></div>
        <div id="ballsWaveG_2" className={s.ballsWaveG}></div>
        <div id="ballsWaveG_3" className={s.ballsWaveG}></div>
        <div id="ballsWaveG_4" className={s.ballsWaveG}></div>
        <div id="ballsWaveG_5" className={s.ballsWaveG}></div>
        <div id="ballsWaveG_6" className={s.ballsWaveG}></div>
        <div id="ballsWaveG_7" className={s.ballsWaveG}></div>
        <div id="ballsWaveG_8" className={s.ballsWaveG}></div>
      </div>
    );
  }
}
