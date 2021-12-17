import React, { Component } from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import s from './ImageGallery.module.css';

export default class ImageGallery extends Component {
  state = {
    KEY: '24115894-e73b87c75d7b7d0a00bbe3b23',
    images: [],
    loading: false,
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.name !== this.props.name) {
      this.setState({ loading: true });
      fetch(
        `https://pixabay.com/api/?q=${this.props.name}&page=1&key=${this.state.KEY}&image_type=photo&orientation=horizontal&per_page=12`,
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

  render() {
    const { loading, images, error } = this.state;
    const { name } = this.props;
    return (
      <ul className={s.gallery}>
        {error && <h1>{error.message}</h1>}
        {loading && (
          <div className={s.cssloadStLoader}>
            <span className={s.cssloadEqual}></span>
          </div>
        )}
        {!name && <div>Let's find some images</div>}
        {images && <ImageGalleryItem images={images} />}
      </ul>
    );
  }
}
