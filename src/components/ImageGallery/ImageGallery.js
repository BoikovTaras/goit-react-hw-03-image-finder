import React, { Component } from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import s from './ImageGallery.module.css';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import Loader from '../Loader/Loader';

export default class ImageGallery extends Component {
  state = {
    KEY: '24115894-e73b87c75d7b7d0a00bbe3b23',
    images: [],
    error: null,
    page: 1,
    showModal: false,
    largeUrl: '',
    status: 'idle',
  };

  componentDidUpdate(prevProps, prevState) {
    const { name } = this.props;
    const { page, KEY } = this.state;
    if (prevProps.name !== name) {
      this.setState({ page: 1 });
    }
    if (prevProps.name !== name || prevState.page !== page) {
      this.setState({ status: 'pending' });
      fetch(
        `https://pixabay.com/api/?q=${name}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`,
      )
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(new Error(`Image with name ${name} not found`));
        })
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
    console.log(url.target.largeImage);
    // this.setState(({ largeUrl }) => ({
    //   largeUrl: url.target.largeImage
    // }))
  };

  loadMore = event => {
    event.preventDefault();
    this.setState({ page: this.state.page + 1 });
  };

  render() {
    const { images, error, showModal, status } = this.state;

    if (status === 'idle') {
      return <div>Let's find some images</div>;
    }
    if (status === 'pending') {
      return <Loader />;
    }
    if (status === 'rejected') {
      return <h1>{error.message}</h1>;
    }
    if (status === 'resolved') {
      return (
        <>
          {showModal && (
            <Modal onClose={this.toggleModal}>
              <img src={this.state.largeUrl} alt="www" />
            </Modal>
          )}
          <ImageGalleryItem
            images={images}
            openModal={this.toggleModal}
            largeUrl={this.getLargeUrl}
          />
          <Button onClick={this.loadMore} />
        </>
      );
    }
  }
}
