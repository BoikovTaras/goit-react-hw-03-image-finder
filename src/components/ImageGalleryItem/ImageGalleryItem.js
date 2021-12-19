import React, { Component } from 'react';
import s from './ImageGalleryItem.module.css';

export default class ImageGalleryItem extends Component {
  render() {
    return (
      <ul className={s.gallery}>
        {this.props.images.map(image => (
          <li
            key={image.id}
            className={s.galleryItem}
            onClick={this.props.openModal}
          >
            <img
              className={s.galleryItemImage}
              src={image.webformatURL}
              alt={image.largeImageURL}
              value={image.largeImageURL}
              onClick={this.props.largeUrl}
            />
          </li>
        ))}
      </ul>
    );
  }
}
