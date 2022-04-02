import { useCallback } from 'react';
import DraggableListItem from './DraggableListItem';
import './DraggableList.css';

const DraggableList = ({ albums, updateAlbums, isRanked = false }) => {
  const onSwapItems = useCallback(
    (fromIndex, toIndex) => {
      const updated = [...albums];
      [updated[fromIndex], updated[toIndex]] = [
        updated[toIndex],
        updated[fromIndex],
      ];

      updateAlbums(updated);
    },
    [albums, updateAlbums]
  );

  const onRemoveItem = useCallback(
    (fromIndex) => {
      const updated = [
        ...albums.slice(0, fromIndex),
        ...albums.slice(fromIndex + 1),
      ];

      updateAlbums(updated);
    },
    [albums, updateAlbums]
  );

  return (
    <>
      {!albums ||
        (albums.length === 0 && (
          <div className="draggable-list-empty">
            <div>
              <p className="serif-heading">Your list is empty.</p>
              <p>Add albums using the field above.</p>
            </div>
          </div>
        ))}
      <ul className="draggable-list">
        {albums?.length > 0 &&
          albums.map((album, i) => (
            <DraggableListItem
              key={`list-item-${i}`}
              title={album.title}
              year={album.releaseYear}
              artworkURL={album.artworkURL}
              index={i}
              length={albums.length}
              isRanked={isRanked}
              onRemoveItem={onRemoveItem}
              onSwapItems={onSwapItems}
              // TODO: figure out a way to find rating
            />
          ))}
      </ul>
    </>
  );
};

export default DraggableList;
