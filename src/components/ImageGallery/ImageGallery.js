import React, { Component } from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import s from './ImageGallery.module.css';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';

export default class ImageGallery extends Component {
  state = {
    KEY: '24115894-e73b87c75d7b7d0a00bbe3b23',
    images: [],
    loading: false,
    error: null,
    page: 1,
    showModal: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.name !== this.props.name) {
      this.setState({ page: 1 });
    }
    if (
      prevProps.name !== this.props.name ||
      prevState.page !== this.state.page
    ) {
      this.setState({ loading: true });
      fetch(
        `https://pixabay.com/api/?q=${this.props.name}&page=${this.state.page}&key=${this.state.KEY}&image_type=photo&orientation=horizontal&per_page=12`,
      )
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(
            new Error(`Image with name ${this.props.name} not found`),
          );
        })
        .then(images => this.setState({ images: images.hits }))
        .catch(error => this.setState({ error }))
        .finally(() => this.setState({ loading: false }));
    }
  }

  toggleModal = e => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
    this.setState();
    console.log(e.target.alt);
  };

  loadMore = () => {
    this.setState({ page: this.state.page + 1 });
  };

  render() {
    const { loading, images, error, showModal } = this.state;
    const { name } = this.props;
    return (
      <div className={s.gallery}>
        {showModal && (
          <Modal>
            <img
              src="https://pixabay.com/get/gc8290d0c02c1f0673d8c50b36500a54f497b0fdee9f8c9fdb1c8ab51966239a24dbd1161940838f4259f06ce52a6af2c2a7add5f6e2385b4df4a5d7291ae2d93_1280.jpg"
              alt="www"
            />
          </Modal>
        )}
        {error && <h1>{error.message}</h1>}
        {loading && (
          <div className={s.cssloadStLoader}>
            <span className={s.cssloadEqual}></span>
          </div>
        )}
        {!name && <div>Let's find some images</div>}
        {images && (
          <ImageGalleryItem images={images} openModal={this.toggleModal} />
        )}
        <Button onClick={this.loadMore} />
      </div>
    );
  }
}
