import { useEffect, useState } from 'react';
import AlbumArt from '../AlbumArt';
import './AlbumGrid.css';
import React from 'react';

const AlbumGrid = ({ albums, isRanked = false }) => {
  useEffect(() => {
    // TODO: re-order the albums in their correct list when returning
    // from the form. have to define a LIST_UPDATED action in store
    // because it currently isn't ... do i lift this useEffect up to the
    // view?
  }, [albums]);
  return (
    <ul className="album-grid">
      {albums &&
        albums.length > 0 &&
        albums.map((album, i) => (
          <li key={`grid-item-${i}}`} className="grid-item">
            <AlbumArt
              artworkURL={album.artworkURL}
              title={album.title}
              size="grid"
            />
            {isRanked && <span className="position">{i + 1}</span>}
          </li>
        ))}
    </ul>
  );
};

export default AlbumGrid;
