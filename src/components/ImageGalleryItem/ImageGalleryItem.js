import React from 'react';
import s from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({ src, alt, openModal, largeUrl }) {
  return (
    <li className={s.galleryItem} onClick={openModal}>
      <img
        className={s.galleryItemImage}
        src={src}
        alt={alt}
        onClick={largeUrl}
      />
    </li>
  );
}
