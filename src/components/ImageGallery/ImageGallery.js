import React, { Component } from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import s from './ImageGallery.module.css';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import Loader from '../Loader/Loader';
import imageApi from '../../servises/image-api.js';

export default class ImageGallery extends Component {
  state = {
    images: [],
    error: null,
    page: 1,
    showModal: false,
    largeUrl: '',
    status: 'idle',
  };

  componentDidUpdate(prevProps, prevState) {
    const { name } = this.props;
    const { page } = this.state;
    if (prevProps.name !== name) {
      this.setState({ page: 1 });
    }
    if (prevProps.name !== name || prevState.page !== page) {
      this.setState({ status: 'pending' });
      imageApi
        .fetchImage(name, page)
        .then(images =>
          this.setState({ images: images.hits, status: 'resolved' }),
        )
        .catch(error => this.setState({ error, status: 'rejected' }))
        .finally(() => this.setState({ loading: false }));
    }
  }

  toggleModal = e => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  getLargeUrl = url => {
    this.setState(({ largeUrl }) => ({
      largeUrl: url.target.alt,
    }));
  };

  loadMore = () => {
    this.setState({ page: this.state.page + 1 });
  };

  render() {
    const { images, error, showModal, status } = this.state;

    if (status === 'idle') {
      return <h2 className={s.title}>Let's find some images</h2>;
    }
    if (status === 'pending') {
      return <Loader />;
    }
    if (status === 'rejected') {
      return <h2 className={s.title}>{error.message}</h2>;
    }
    if (status === 'resolved') {
      return (
        <>
          {showModal && (
            <Modal onClose={this.toggleModal}>
              <img src={this.state.largeUrl} alt="www" />
            </Modal>
          )}
          <ul className={s.gallery}>
            {images.map(image => (
              <ImageGalleryItem
                key={image.id}
                src={image.webformatURL}
                alt={image.largeImageURL}
                openModal={this.toggleModal}
                largeUrl={this.getLargeUrl}
              />
            ))}
          </ul>

          <Button onClick={this.loadMore} />
        </>
      );
    }
  }
}
