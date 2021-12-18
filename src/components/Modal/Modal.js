import React, { Component } from 'react';
import s from './Modal.module.css';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount() {
    console.log('модальное окно рендерится');
  }
  componentWillUnmount() {
    console.log('модальное окно удаляется');
  }

  render() {
    return createPortal(
      <div class={s.overlay}>
        <div class={s.modal}>{this.props.children}</div>
      </div>,
      modalRoot,
    );
  }
}
