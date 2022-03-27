import { Link } from 'react-router-dom';
import handleImageError from '../../utils/handleImageError';
import './ListSpread.css';
import { mapObjectIDs } from '../../utils';
import { useSelector } from 'react-redux';

const ListSpread = ({ gap, listID, size = 'medium' }) => {
  const albums = useSelector((state) => {
    const albumIDs = mapObjectIDs(state.lists.items[listID]?.albums) || [];
    return albumIDs.map((id) => state.albums.items[id]);
  });

  const items = [...albums.slice(0, 5)];

  while (items.length < 5) {
    items.push(<div></div>);
  }

  return (
    <Link to={`/lists/${listID}`} className={`list-spread list-spread-${size}`}>
      <span className="overlay"></span>
      {items?.length &&
        items.slice(0, 5).map((item, i) => (
          <div
            className={`album-art-container album-art-container-${size} list-art`}
            key={`album-art-${i}`}
            id={`album-${i}`}
          >
            {item.artworkURL ? (
              <img
                className={`list-spread-${size}`}
                src={item.artworkURL}
                alt={item.title}
                onError={handleImageError}
              />
            ) : null}
          </div>
        ))}
    </Link>
  );
};

export default ListSpread;
